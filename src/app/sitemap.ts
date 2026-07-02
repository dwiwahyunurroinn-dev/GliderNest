import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.SITE_URL ?? "https://glidernest.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/sugar-glider",
    "/blog",
    "/galeri",
    "/testimoni",
    "/reseller",
    "/cara-memesan",
    "/kontak",
    "/pesan",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const [gliders, articles] = await Promise.all([
      prisma.glider.findMany({ select: { slug: true } }),
      prisma.article.findMany({
        where: { published: true },
        select: { slug: true },
      }),
    ]);
    return [
      ...staticPages,
      ...gliders.map((g) => ({
        url: `${BASE_URL}/sugar-glider/${g.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...articles.map((a) => ({
        url: `${BASE_URL}/blog/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return staticPages;
  }
}
