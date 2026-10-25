import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for the generated share images (opengraph-image.tsx files),
 * drawn like the site: drafting paper, ink, blue annotations. Satori can't
 * read woff2, so this loads the woff/ttf builds of the site's fonts straight
 * from node_modules.
 */
export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  paper: "#f5f6f3",
  ink: "#121418",
  line: "#d3d7dc",
  grid: "rgba(18, 20, 24, 0.06)",
  muted: "#586070",
  annot: "#2443e6",
  mark: "#f2b705",
};

/** The grid-paper background, as a style object. */
export const ogGrid = {
  backgroundColor: ogColors.paper,
  backgroundImage: `linear-gradient(${ogColors.grid} 1px, transparent 1px), linear-gradient(90deg, ${ogColors.grid} 1px, transparent 1px)`,
  backgroundSize: "24px 24px",
};

const font = (path: string) => readFile(join(process.cwd(), "node_modules", path));

async function loadFonts() {
  const [display, sans, mono] = await Promise.all([
    font("@fontsource/ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff"),
    font("geist/dist/fonts/geist-sans/Geist-Regular.ttf"),
    font("geist/dist/fonts/geist-mono/GeistMono-Regular.ttf"),
  ]);
  return [
    { name: "IBM Plex Sans Condensed", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Geist", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * Read once when the module loads — at build time — rather than inside each
 * image function. File reads inside the function count as request-time work
 * under Cache Components and would make the image dynamic.
 */
export const ogFonts = await loadFonts();

/** `FIG. 00 — TITLE` in Geist Mono, as on every figure on the site. */
export function OgLabel({ fig, children }: { fig: string; children: string }) {
  return (
    <div
      style={{
        display: "flex",
        borderTop: `3px solid ${ogColors.ink}`,
        paddingTop: 14,
        fontFamily: "Geist Mono",
        fontSize: 22,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: ogColors.ink,
      }}
    >
      <span style={{ color: ogColors.annot }}>{fig}</span>
      <span style={{ color: ogColors.muted }}>&nbsp;—&nbsp;</span>
      <span>{children}</span>
    </div>
  );
}

/** The bottom row: a highlighted status on the left, location on the right. */
export function OgFooter({ left }: { left: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `1px solid ${ogColors.line}`,
        paddingTop: 22,
        fontFamily: "Geist Mono",
        fontSize: 20,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: ogColors.muted,
      }}
    >
      <span style={{ background: ogColors.mark, color: ogColors.ink, padding: "2px 10px" }}>
        {left}
      </span>
      <span>Lagos, Nigeria · 6.5244° N, 3.3792° E</span>
    </div>
  );
}
