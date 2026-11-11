import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

const baseUrl = site.url;
const lastModified = new Date(site.contentUpdatedAt);

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...servicePages.map((page) => ({
    path: `/services/${page.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/price", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
