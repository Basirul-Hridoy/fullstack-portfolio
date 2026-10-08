import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/certificates`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/reviews/videos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
