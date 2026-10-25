import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudySlugs,
  featuredProjects,
  getProject,
  nextCaseStudy,
} from "@/lib/projects";
import { caseStudyComponents } from "@/components/case-study-mdx";
import { site } from "@/data/site";

// With Cache Components on, `dynamicParams` is gone: unknown slugs are
// handled by the notFound() below instead.
//
// Every real case study is prerendered by generateStaticParams, so navigating
// to one is already instant. Only unknown slugs would block, and those should
// block — streaming them would turn a real 404 into a 200.
export const instant = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/work/${slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    // Child openGraph replaces the parent's, so siteName is repeated here.
    // The image comes from ./opengraph-image.tsx.
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_NG",
      url,
      title: project.title,
      description: project.outcome,
    },
  };
}

/**
 * The case-study template, drawn as its own sheet: a grid-paper title block,
 * the screenshot in crop marks, a spec table beside the TL;DR and
 * the write-up, then the next case study. Every fact comes from
 * src/data/projects.ts; the MDX is the write-up only.
 */
export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const number = featuredProjects.findIndex((p) => p.slug === slug) + 1;
  const next = nextCaseStudy(slug);

  const facts = [
    { term: "Role", detail: project.role },
    project.team && { term: "Team", detail: project.team },
    { term: "Year", detail: String(project.year) },
    { term: "Stack", detail: project.stack.join(", ") },
  ].filter(Boolean) as { term: string; detail: string }[];

  const link =
    "underline decoration-annot underline-offset-4 hover:text-annot";

  return (
    <article>
      <header className="bg-grid border-b border-line">
        <div className="shell pt-32 pb-14 md:pb-20 lg:pt-24">
          <Link href="/#work" className="label-mono text-muted hover:text-annot">
            ← All work
          </Link>
          <p className="label-mono mt-12 border-t-2 border-ink pt-3">
            <span className="text-annot">
              Case study{number > 0 ? ` ${String(number).padStart(2, "0")}` : ""}
            </span>
            <span aria-hidden className="text-muted">
              {" — "}
            </span>
            {project.year}
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-balance">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-muted md:text-2xl">
            {project.summary}
          </p>
        </div>
      </header>

      {project.image && (
        <figure className="shell pt-12 md:pt-16">
          <div className="ticks p-3">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={2400}
              height={1500}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1200px) 1112px, 100vw"
              className="aspect-[16/10] w-full border border-line object-cover object-top"
            />
          </div>
          <figcaption className="label-mono mt-3 px-3 text-muted">
            {project.image.alt}
          </figcaption>
        </figure>
      )}

      <div className="shell grid grid-cols-1 gap-x-6 gap-y-12 py-16 md:grid-cols-12 md:py-24">
        <aside className="md:sticky md:top-20 md:col-span-4 md:self-start lg:col-span-3">
          <dl className="border-t-2 border-ink">
            {facts.map((f) => (
              <div key={f.term} className="border-b border-line py-3">
                <dt className="label-mono text-muted">{f.term}</dt>
                <dd className="mt-1 leading-snug">{f.detail}</dd>
              </div>
            ))}
            {(project.links.live || project.links.code) && (
              <div className="border-b border-line py-3">
                <dt className="label-mono text-muted">Links</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className={link}
                    >
                      Live site ↗
                    </a>
                  )}
                  {project.links.code && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className={link}
                    >
                      Source code ↗
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="md:col-span-8 lg:col-start-5">
          {project.tldr && (
            <section aria-label="TL;DR" className="ticks bg-paper-2 p-6 md:p-8">
              <p className="label-mono text-annot">TL;DR</p>
              <dl className="mt-5 grid gap-4 md:grid-cols-[6rem_1fr]">
                {(
                  [
                    ["Problem", project.tldr.problem],
                    ["Built", project.tldr.built],
                    ["Result", project.tldr.result],
                  ] as const
                ).map(([term, detail]) => (
                  <div key={term} className="contents">
                    <dt className="label-mono pt-1 text-muted">{term}</dt>
                    <dd className="text-lg leading-snug">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-20">
            <Body components={caseStudyComponents} />
          </div>

          <nav aria-label="More work" className="mt-24 border-t-2 border-ink pt-4">
            {next ? (
              <Link href={`/work/${next.slug}`} className="group block">
                <span className="label-mono text-muted">Next case study</span>
                <span className="mt-3 block font-display text-4xl leading-tight font-semibold tracking-tight group-hover:underline group-hover:decoration-annot group-hover:decoration-2 group-hover:underline-offset-8">
                  {next.title} <span className="text-annot">→</span>
                </span>
              </Link>
            ) : (
              <Link
                href="/#work"
                className="label-mono inline-block bg-ink px-4 py-3 text-paper transition-colors hover:bg-annot"
              >
                See all work ↑
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
