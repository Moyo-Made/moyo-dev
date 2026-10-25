/**
 * The home page's sections, in order. The nav, each section's
 * `02 — SELECTED WORK` header and the footer all number from here.
 */
export const sections = [
  { id: "readme", title: "README" },
  { id: "work", title: "Selected work" },
  { id: "experience", title: "Experience" },
  { id: "process", title: "How I build" },
  { id: "writing", title: "Writing" },
  { id: "contact", title: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** "02" for work, and so on. */
export function sectionNumber(id: SectionId) {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
}

export function sectionTitle(id: SectionId) {
  return sections.find((s) => s.id === id)!.title;
}
