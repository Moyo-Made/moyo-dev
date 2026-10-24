import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for the generated share images (opengraph-image.tsx files).
 * Satori can't read woff2, so this loads the woff/ttf builds of the site's
 * fonts straight from node_modules.
 */
export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  ink: "#0f0f0d",
  ink2: "#1c1c19",
  paper: "#f3f0e8",
  muted: "#9c978b",
  signal: "#f2b705",
};

const font = (path: string) => readFile(join(process.cwd(), "node_modules", path));

async function loadFonts() {
  const [serif, sans, mono] = await Promise.all([
    font("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"),
    font("geist/dist/fonts/geist-sans/Geist-Regular.ttf"),
    font("geist/dist/fonts/geist-mono/GeistMono-Regular.ttf"),
  ]);
  return [
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
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

/** `// LABEL` in Geist Mono, as used across the site. */
export function OgLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "Geist Mono",
        fontSize: 22,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: ogColors.muted,
      }}
    >
      {`// ${children}`}
    </div>
  );
}

/** The bottom status row: yellow dot, name, location. */
export function OgFooter({ left }: { left: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `1px solid ${ogColors.ink2}`,
        paddingTop: 24,
        fontFamily: "Geist Mono",
        fontSize: 20,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: ogColors.muted,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{ width: 12, height: 12, borderRadius: 12, background: ogColors.signal }}
        />
        <span style={{ color: ogColors.paper }}>{left}</span>
      </div>
      <span>Lagos, Nigeria</span>
    </div>
  );
}
