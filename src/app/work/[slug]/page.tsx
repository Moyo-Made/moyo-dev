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
  return { title: project.title, description: project.summary };
}

/**
 * The case-study template: ink header → screenshot straddling the seam →
 * a sticky facts column beside TL;DR and the write-up → next case study.
 * Every fact comes from src/data/projects.ts; the MDX is the write-up only.
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

  return (
    <article>
      <header className="surface-ink">
        <div className="shell pt-36 pb-16 md:pb-24">
          <Link
            href="/#work"
            className="label-mono text-muted-on-ink hover:text-paper"
          >
            ← All work
          </Link>
          <p className="label-mono mt-12 text-muted-on-ink">
            {`// CASE STUDY ${number > 0 ? String(number).padStart(2, "0") : ""}`}
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-muted-on-ink md:text-2xl">
            {project.summary}
          </p>
        </div>
      </header>

      {project.image && (
        // Ink above the halfway line, paper below — the screenshot sits on the seam.
        <div className="bg-[linear-gradient(var(--ink)_50%,var(--paper)_50%)]">
          <div className="shell">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={2400}
              height={1500}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="aspect-[16/10] w-full border border-ink-2 object-cover object-top shadow-[0_32px_64px_-32px_rgb(15_15_13/0.5)]"
            />
          </div>
        </div>
      )}

      <div className="shell grid grid-cols-1 gap-x-6 gap-y-12 py-20 md:grid-cols-12 md:py-28">
        <aside className="md:sticky md:top-28 md:col-span-3 md:self-start">
          <dl className="space-y-5">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="label-mono text-muted">{f.term}</dt>
                <dd className="mt-1 leading-snug">{f.detail}</dd>
              </div>
            ))}
            {(project.links.live || project.links.code) && (
              <div>
                <dt className="label-mono text-muted">Links</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-signal decoration-2 underline-offset-4 hover:text-muted"
                    >
                      Live site ↗
                    </a>
                  )}
                  {project.links.code && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-signal decoration-2 underline-offset-4 hover:text-muted"
                    >
                      Source code ↗
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          {project.tldr && (
            <section
              aria-label="TL;DR"
              className="border border-line bg-paper-2/60 p-6 md:p-8"
            >
              <p className="label-mono text-muted">{"// TL;DR"}</p>
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

          <nav
            aria-label="More work"
            className="mt-24 border-t border-line pt-8"
          >
            {next ? (
              <Link href={`/work/${next.slug}`} className="group block">
                <span className="label-mono text-muted">Next case study</span>
                <span className="mt-2 block font-serif text-4xl leading-tight group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-8">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <Link
                href="/#work"
                className="label-mono underline decoration-signal decoration-2 underline-offset-8 hover:text-muted"
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
