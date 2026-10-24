import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { caseStudySlugs, featuredProjects, getProject } from "@/lib/projects";
import { OgFooter, OgLabel, ogColors, ogFonts, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

// generateImageMetadata gets plain params; the Image function below gets a
// promise (Next 16).
export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  return [
    {
      id: "og",
      alt: project ? `${project.title} — ${project.outcome}` : site.name,
      size,
      contentType,
    },
  ];
}

const mime = (src: string) => (src.endsWith(".png") ? "image/png" : "image/jpeg");

/** Share card for a case study: title and outcome, with the screenshot beside. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug)!;
  const number = featuredProjects.findIndex((p) => p.slug === slug) + 1;

  const shot = project.image
    ? `data:${mime(project.image.src)};base64,${(
        await readFile(join(process.cwd(), "public", project.image.src))
      ).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px 52px",
          background: ogColors.ink,
          color: ogColors.paper,
        }}
      >
        <div style={{ display: "flex", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <OgLabel>{`Case study ${String(number).padStart(2, "0")}`}</OgLabel>
            <div
              style={{
                marginTop: 28,
                fontFamily: "Instrument Serif",
                fontSize: 84,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: "Geist",
                fontSize: 28,
                lineHeight: 1.3,
                color: ogColors.muted,
              }}
            >
              {project.outcome}
            </div>
          </div>
          {shot && (
            <img
              src={shot}
              alt=""
              width={440}
              height={275}
              style={{
                marginTop: 52,
                objectFit: "cover",
                objectPosition: "top",
                border: `1px solid ${ogColors.ink2}`,
                transform: "rotate(-2deg)",
              }}
            />
          )}
        </div>
        <OgFooter left={site.name} />
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
