import type { MetadataRoute } from "next";

const baseUrl = "https://3dplus73.ru";
const lastModified = new Date("2026-11-01T00:00:00.000Z");

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/price", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
