import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const serif = await readFile(
  join(
    process.cwd(),
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
  ),
);

/** Favicon: the nav's "M/" monogram — paper M, yellow slash, on ink. */
export default async function Icon() {
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
          borderRadius: 12,
          fontFamily: "Instrument Serif",
          fontSize: 50,
          color: "#f3f0e8",
          paddingBottom: 4,
        }}
      >
        M<span style={{ color: "#f2b705" }}>/</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }] },
  );
}
