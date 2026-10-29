import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { OgEyebrow, OgFooter, ogColors, ogFonts, ogFrame, ogSize } from "@/lib/og";

export const alt = `${site.name}, ${site.role}. ${site.hero.headline.join(" ")}`;
export const size = ogSize;
export const contentType = "image/png";

/** The share card for the home page: the hero, as an image. */
export default async function Image() {
  return new ImageResponse(
    (
      <div style={ogFrame}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <OgEyebrow>{site.hero.eyebrow}</OgEyebrow>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 44,
              fontSize: 104,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            {site.hero.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div
            style={{
              marginTop: 32,
              maxWidth: 1040,
              fontSize: 30,
              lineHeight: 1.4,
              color: ogColors.muted,
            }}
          >
            Web products, SaaS features and AI integrations for founders and teams.
          </div>
        </div>
        <OgFooter />
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
