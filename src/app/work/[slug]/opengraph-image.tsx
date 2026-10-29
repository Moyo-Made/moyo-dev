import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { caseStudySlugs, getProject } from "@/lib/projects";
import { OgEyebrow, OgFooter, ogColors, ogFonts, ogFrame, ogSize } from "@/lib/og";

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
      alt: project ? `${project.name} case study: ${project.outcome}` : site.name,
      size,
      contentType,
    },
  ];
}

const mime = (src: string) => (src.endsWith(".png") ? "image/png" : "image/jpeg");

/** Share card for a case study: name and outcome, with the screenshot beside. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug)!;

  const shot = project.image
    ? `data:${mime(project.image.src)};base64,${(
        await readFile(join(process.cwd(), "public", project.image.src))
      ).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div style={ogFrame}>
        <div style={{ display: "flex", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <OgEyebrow>{`Case study · ${project.year}`}</OgEyebrow>
            <div
              style={{
                marginTop: 36,
                fontSize: 80,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
              }}
            >
              {project.name}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.35,
                color: ogColors.muted,
              }}
            >
              {project.outcome}
            </div>
          </div>
          {shot && (
            <div
              style={{
                display: "flex",
                marginTop: 8,
                borderRadius: 14,
                overflow: "hidden",
                background: ogColors.surface,
                border: `1px solid ${ogColors.line}`,
                boxShadow: "0 24px 48px -16px rgba(32, 33, 31, 0.28)",
              }}
            >
              <img
                src={shot}
                alt=""
                width={460}
                height={300}
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          )}
        </div>
        <OgFooter />
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
