import { projects, type Project } from "@/data/projects";

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const alsoBuilt = projects.filter((p) => p.tier === "also");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Slugs that have an MDX write-up — the pages /work/[slug] prerenders. */
export const caseStudySlugs = projects
  .filter((p) => p.caseStudy)
  .map((p) => p.slug);
