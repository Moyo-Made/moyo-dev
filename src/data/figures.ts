/**
 * The home page's figures, in order. The nav index, each section's
 * `FIG. 02 — SELECTED WORK` header and the footer all number from here.
 */
export const figures = [
  { id: "readme", title: "README" },
  { id: "work", title: "Selected work" },
  { id: "experience", title: "Experience" },
  { id: "changelog", title: "Changelog" },
  { id: "process", title: "How I build" },
  { id: "notes", title: "Notes" },
  { id: "contact", title: "Contact" },
] as const;

export type FigureId = (typeof figures)[number]["id"];

/** "02" for work, and so on. */
export function figNumber(id: FigureId) {
  return String(figures.findIndex((f) => f.id === id) + 1).padStart(2, "0");
}

export function figTitle(id: FigureId) {
  return figures.find((f) => f.id === id)!.title;
}
