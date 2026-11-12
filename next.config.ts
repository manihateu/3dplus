import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Минимальный самодостаточный сервер для Docker (.next/standalone)
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.3dplus73.ru" }],
        destination: "https://3dplus73.ru/:path*",
        permanent: true,
      },
      {
        source: "/personal_data_processing_policy.php",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/personal_data_processing_policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/consent_data_collection.php",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/consent_data_collection",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/upload/files/about/:file*",
        destination: "/docs/:file*",
        permanent: true,
      },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/services.php", destination: "/services", permanent: true },
      { source: "/price.php", destination: "/price", permanent: true },
      { source: "/reviews.php", destination: "/reviews", permanent: true },
      { source: "/contacts.php", destination: "/contacts", permanent: true },
    ];
  },
};

export default nextConfig;
