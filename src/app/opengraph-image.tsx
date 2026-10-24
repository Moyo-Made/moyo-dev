import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { OgFooter, OgLabel, ogColors, ogFonts, ogSize } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

/** The share card for the home page: the hero, as an image. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px 56px",
          background: ogColors.ink,
          color: ogColors.paper,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <OgLabel>Now shipping</OgLabel>
          <div
            style={{
              marginTop: 36,
              fontFamily: "Instrument Serif",
              fontSize: 128,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 32,
              maxWidth: 860,
              fontFamily: "Geist",
              fontSize: 34,
              lineHeight: 1.3,
              color: ogColors.muted,
            }}
          >
            {site.tagline}
          </div>
        </div>
        <OgFooter left={site.availableForRoles ? "Available for roles" : "Building"} />
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
