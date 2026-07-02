import type { MetadataRoute } from "next";
import { getAllGliders } from "@/data/gliders";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/gliders", "/panduan", "/tentang", "/kontak"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const gliderPages = getAllGliders().map((g) => ({
    url: `${site.url}/gliders/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...gliderPages];
}
