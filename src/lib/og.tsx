import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

/**
 * Shared pieces for the generated share images (opengraph-image.tsx files),
 * drawn like the site: warm off-white, near-black ink, one green dot. Satori
 * can't read woff2, so this loads the ttf builds of Geist from node_modules.
 */
export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  canvas: "#f8f8f5",
  surface: "#ffffff",
  ink: "#20211f",
  muted: "#64645e",
  line: "#e6e6e0",
  accent: "#2f8b65",
};

const font = (path: string) =>
  readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans", path));

/**
 * Read once when the module loads — at build time — rather than inside each
 * image function. File reads inside the function count as request-time work
 * under Cache Components and would make the image dynamic.
 */
const [regular, semibold] = await Promise.all([
  font("Geist-Regular.ttf"),
  font("Geist-SemiBold.ttf"),
]);

export const ogFonts = [
  { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
];

/** The whole card: canvas, padding, Geist. */
export const ogFrame = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  padding: "72px 80px 60px",
  background: ogColors.canvas,
  color: ogColors.ink,
  fontFamily: "Geist",
} as const;

/** The small line above a title, after a green dot, as on the site. */
export function OgEyebrow({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: ogColors.muted }}>
      <div style={{ width: 10, height: 10, borderRadius: 5, background: ogColors.accent }} />
      {children}
    </div>
  );
}

/** The bottom row: who, on the left; where to find them, on the right. */
export function OgFooter() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `1px solid ${ogColors.line}`,
        paddingTop: 26,
        fontSize: 24,
        color: ogColors.muted,
      }}
    >
      <span style={{ fontWeight: 600, color: ogColors.ink, letterSpacing: "-0.01em" }}>{site.name}</span>
      <span>moyomade.me</span>
    </div>
  );
}
