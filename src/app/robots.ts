import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://glidernest.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/pesan/"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
