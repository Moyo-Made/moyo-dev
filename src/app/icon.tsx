import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const semibold = await readFile(
  join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf"),
);

/** Favicon: an M on ink, with the site's green dot. */
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
          background: "#20211f",
          borderRadius: 14,
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: "-0.04em",
          color: "#f8f8f5",
          position: "relative",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            right: 9,
            bottom: 9,
            width: 9,
            height: 9,
            borderRadius: 5,
            background: "#2f8b65",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: semibold, weight: 600 }] },
  );
}
