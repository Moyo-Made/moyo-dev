import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const serif = await readFile(
  join(
    process.cwd(),
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
  ),
);

/** Home-screen icon. iOS rounds the corners itself, so this one is square. */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0f0f0d",
          fontFamily: "Instrument Serif",
          fontSize: 120,
          color: "#f3f0e8",
          paddingBottom: 8,
        }}
      >
        M<span style={{ color: "#f2b705" }}>/</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }] },
  );
}
