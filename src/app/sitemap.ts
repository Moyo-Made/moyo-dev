import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...caseStudySlugs.map((slug) => ({
      url: `${siteUrl}/work/${slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/changelog`, priority: 0.5 },
  ];
}
