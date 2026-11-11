import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const appDir = path.join(root, ".next", "server", "app");
const staticDir = path.join(root, ".next", "static");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function compressed(buffer) {
  return {
    gzip: zlib.gzipSync(buffer, { level: 9 }).length,
    brotli: zlib.brotliCompressSync(buffer).length,
  };
}

function staticUrlToFile(url) {
  const clean = url.split("?")[0].split("#")[0];
  if (!clean.startsWith("/_next/")) return null;
  return path.join(root, clean.replace("/_next/", ".next/"));
}

function fileSize(file) {
  try {
    return fs.statSync(file).size;
  } catch {
    return 0;
  }
}

const htmlFiles = walk(appDir).filter(
  (file) => file.endsWith(".html") && !file.includes("_global-error") && !file.includes("_not-found"),
);

const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const buffer = fs.readFileSync(file);
  const relativeHtml = path.relative(appDir, file).replace(/\\/g, "/").replace(/\.html$/, "");
  const route = relativeHtml === "index" ? "/" : `/${relativeHtml}`;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? "";
  const twitterCard = html.match(/<meta name="twitter:card" content="([^"]*)"/)?.[1] ?? "";
  const lang = html.match(/<html[^>]*lang="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1\b/g) ?? []).length;
  const h2 = (html.match(/<h2\b/g) ?? []).length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const imgNoAlt = imgs.filter((tag) => !/\balt\s*=/.test(tag)).length;
  const imgEmptyAlt = imgs.filter((tag) => /\balt\s*=\s*(""|'')/.test(tag)).length;
  const imgWithDimensions = imgs.filter((tag) => /\bwidth\s*=/.test(tag) && /\bheight\s*=/.test(tag)).length;
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+\.js[^"]*)"/g)].map((match) => match[1]);
  const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  const preloads = [...html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      return items.map((item) => item["@type"]).flat();
    } catch {
      return ["invalid"];
    }
  });

  const uniqueScripts = [...new Set(scripts)];
  const scriptBytes = uniqueScripts.reduce((sum, url) => sum + fileSize(staticUrlToFile(url)), 0);
  const scriptCompressed = uniqueScripts.reduce(
    (acc, url) => {
      const file = staticUrlToFile(url);
      try {
        const buffer = fs.readFileSync(file);
        const sizes = compressed(buffer);
        return { gzip: acc.gzip + sizes.gzip, brotli: acc.brotli + sizes.brotli };
      } catch {
        return acc;
      }
    },
    { gzip: 0, brotli: 0 },
  );
  const uniqueStyles = [...new Set(styles)];
  const styleBytes = uniqueStyles.reduce((sum, url) => sum + fileSize(staticUrlToFile(url)), 0);
  const styleCompressed = uniqueStyles.reduce(
    (acc, url) => {
      try {
        const sizes = compressed(fs.readFileSync(staticUrlToFile(url)));
        return { gzip: acc.gzip + sizes.gzip, brotli: acc.brotli + sizes.brotli };
      } catch {
        return acc;
      }
    },
    { gzip: 0, brotli: 0 },
  );
  const inlineScriptBytes = [...html.matchAll(/<script(?:\s[^>]*)?>(.*?)<\/script>/gs)]
    .filter((match) => !/\bsrc=/.test(match[0]))
    .reduce((sum, match) => sum + Buffer.byteLength(match[1]), 0);
  const sizes = compressed(buffer);

  return {
    route,
    file: path.relative(root, file).replace(/\\/g, "/"),
    htmlBytes: buffer.length,
    htmlGzip: sizes.gzip,
    htmlBrotli: sizes.brotli,
    title,
    titleLength: title.length,
    descriptionLength: description.length,
    canonical,
    ogImage,
    twitterCard,
    lang,
    h1,
    h2,
    images: imgs.length,
    imgNoAlt,
    imgEmptyAlt,
    imgWithDimensions,
    scripts: uniqueScripts.length,
    scriptBytes,
    scriptGzip: scriptCompressed.gzip,
    scriptBrotli: scriptCompressed.brotli,
    scriptFiles: uniqueScripts.map((url) => ({
      url,
      bytes: fs.existsSync(staticUrlToFile(url)) ? fs.statSync(staticUrlToFile(url)).size : 0,
    })),
    styles: uniqueStyles.length,
    styleBytes,
    styleGzip: styleCompressed.gzip,
    styleBrotli: styleCompressed.brotli,
    preloads: preloads.length,
    inlineScriptBytes,
    jsonLdTypes: [...new Set(jsonLd.flat())],
  };
});

// Old site: raw HTML and cleaned HTML (remove injected styles/scripts for a fair content comparison).
const oldPath = path.join(root, "old-home.html");
let old = null;
if (fs.existsSync(oldPath)) {
  const raw = fs.readFileSync(oldPath);
  const clean = Buffer.from(
    raw
      .toString("utf8")
      .replace(/<style\b[^>]*>.*?<\/style>/gis, " "),
    "utf8",
  );
  old = {
    rawBytes: raw.length,
    rawGzip: compressed(raw).gzip,
    rawBrotli: compressed(raw).brotli,
    cleanBytes: clean.length,
    cleanGzip: compressed(clean).gzip,
    cleanBrotli: compressed(clean).brotli,
  };
}

const assetFiles = walk(staticDir).filter((file) => fs.statSync(file).isFile());
const byExt = (ext) => assetFiles.filter((file) => file.endsWith(ext));
const js = byExt(".js");
const css = byExt(".css");
const fonts = byExt(".woff2").concat(byExt(".woff"));
const sum = (files) => files.reduce((total, file) => total + fs.statSync(file).size, 0);

const total = {
  pages: pages.length,
  htmlBytes: pages.reduce((sumValue, page) => sumValue + page.htmlBytes, 0),
  htmlGzip: pages.reduce((sumValue, page) => sumValue + page.htmlGzip, 0),
  htmlBrotli: pages.reduce((sumValue, page) => sumValue + page.htmlBrotli, 0),
  jsFiles: js.length,
  jsBytes: sum(js),
  cssFiles: css.length,
  cssBytes: sum(css),
  fontFiles: fonts.length,
  fontBytes: sum(fonts),
};

const output = { generatedAt: new Date().toISOString(), old, total, pages };
fs.writeFileSync(path.join(root, "build-metrics.json"), JSON.stringify(output, null, 2));

const table = pages
  .sort((a, b) => b.htmlGzip - a.htmlGzip)
  .map((page) => ({
    route: page.route,
    "HTML raw KB": (page.htmlBytes / 1024).toFixed(1),
    "gzip KB": (page.htmlGzip / 1024).toFixed(1),
    "brotli KB": (page.htmlBrotli / 1024).toFixed(1),
    "JS raw KB": (page.scriptBytes / 1024).toFixed(1),
    "JS gzip KB": (page.scriptGzip / 1024).toFixed(1),
    "CSS gzip KB": (page.styleGzip / 1024).toFixed(1),
    H1: page.h1,
    H2: page.h2,
    Img: page.images,
    JSONLD: page.jsonLdTypes.length,
  }));
console.table(table);
console.log("TOTAL", total);
console.log("OLD", old);
