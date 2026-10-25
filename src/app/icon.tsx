import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const display = await readFile(
  join(
    process.cwd(),
    "node_modules/@fontsource/ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff",
  ),
);

/** Favicon: a condensed M on ink, with the highlighter-yellow status square. */
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
          background: "#121418",
          borderRadius: 12,
          fontFamily: "IBM Plex Sans Condensed",
          fontSize: 46,
          color: "#f5f6f3",
          position: "relative",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            right: 9,
            bottom: 9,
            width: 10,
            height: 10,
            background: "#f2b705",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "IBM Plex Sans Condensed", data: display, weight: 600 }] },
  );
}
