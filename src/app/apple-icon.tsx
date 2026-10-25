import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const display = await readFile(
  join(
    process.cwd(),
    "node_modules/@fontsource/ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff",
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
          background: "#121418",
          fontFamily: "IBM Plex Sans Condensed",
          fontSize: 116,
          color: "#f5f6f3",
          position: "relative",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            right: 28,
            bottom: 28,
            width: 28,
            height: 28,
            background: "#f2b705",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "IBM Plex Sans Condensed", data: display, weight: 600 }] },
  );
}
