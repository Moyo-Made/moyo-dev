import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { OgFooter, OgLabel, ogColors, ogFonts, ogGrid, ogSize } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

/** The share card for the home page: the overview figure, as an image. */
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
          ...ogGrid,
          color: ogColors.ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <OgLabel fig="Fig. 00">System overview</OgLabel>
          <div
            style={{
              marginTop: 40,
              fontFamily: "IBM Plex Sans Condensed",
              fontSize: 40,
              letterSpacing: "-0.01em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 18,
              maxWidth: 980,
              fontFamily: "IBM Plex Sans Condensed",
              fontSize: 76,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
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
