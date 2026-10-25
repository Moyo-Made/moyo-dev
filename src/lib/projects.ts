import { projects, type Project } from "@/data/projects";

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const alsoBuilt = projects.filter((p) => p.tier === "also");
export const mlProjects = projects.filter((p) => p.tier === "ml");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Slugs that have an MDX write-up — the pages /work/[slug] prerenders. */
export const caseStudySlugs = projects
  .filter((p) => p.caseStudy)
  .map((p) => p.slug);

/** Where a project's title links: case study, else live site, else code. */
export function projectHref(project: Project): string | undefined {
  if (project.caseStudy) return `/work/${project.slug}`;
  return project.links.live ?? project.links.code;
}

export const isExternal = (href: string) => !href.startsWith("/");

/** The case study after this one, wrapping around. Undefined if it's the only one. */
export function nextCaseStudy(slug: string): Project | undefined {
  const i = caseStudySlugs.indexOf(slug);
  if (caseStudySlugs.length < 2 || i === -1) return undefined;
  return getProject(caseStudySlugs[(i + 1) % caseStudySlugs.length]);
}
