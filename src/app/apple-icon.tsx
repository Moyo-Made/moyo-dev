import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Read at module load (build time), so the icon stays static.
const semibold = await readFile(
  join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf"),
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
          background: "#20211f",
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: 104,
          letterSpacing: "-0.04em",
          color: "#f8f8f5",
          position: "relative",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 30,
            width: 20,
            height: 20,
            borderRadius: 10,
            background: "#2f8b65",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: semibold, weight: 600 }] },
  );
}
