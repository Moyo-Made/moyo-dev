import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudySlugs,
  formatList,
  getProject,
  nextCaseStudy,
  projectDomain,
} from "@/lib/projects";
import { caseStudyComponents } from "@/components/case-study-mdx";
import { Highlights, StageScreens } from "@/components/project-stage";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { Corners, Eyebrow, Panel } from "@/components/panel";
import { CaseStudyBar } from "@/components/case-study-bar";
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

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/work/${slug}`;
  return {
    title: `${project.name} case study`,
    description: project.summary,
    alternates: { canonical: url },
    // Child openGraph replaces the parent's, so siteName is repeated here.
    // The image comes from ./opengraph-image.tsx.
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_GB",
      url,
      title: project.title,
      description: project.outcome,
    },
  };
}

/**
 * The case-study template, the same shape for every project: the lit
 * header panel with what it is and my part in it, the screen, a sticky bar
 * of its sections, the four short answers, then the numbered write-up
 * (problem, what made it hard, how it was built, the key decision, impact,
 * what I'd change) and the next case study. Every fact comes from
 * src/data/projects.ts; the MDX is the write-up only.
 */
export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const next = nextCaseStudy(slug);
  const domain = projectDomain(project);
  const action = project.links.live
    ? { href: project.links.live, label: `Visit ${domain}` }
    : project.links.code
      ? { href: project.links.code, label: "Source code" }
      : undefined;

  const facts = [
    { term: "Role", detail: project.role },
    project.team && { term: "Team", detail: project.team },
    { term: "Year", detail: String(project.year) },
    { term: "Built with", detail: formatList(project.stack) },
  ].filter(Boolean) as { term: string; detail: string }[];

  return (
    <article>
      <Panel as="header">
        <div className="shell pt-10 md:pt-14">
          <Link
            href="/work"
            className="flex w-fit items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="nudge-left size-4" />
            All work
          </Link>

          <Eyebrow className="rise mt-12 md:mt-16">Case study · {project.year}</Eyebrow>
          <h1
            className="rise mt-6 text-[clamp(2.75rem,1.4rem+5vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {project.name}
          </h1>
          <p
            className="rise mt-6 max-w-[44rem] text-lg leading-relaxed text-pretty text-muted md:text-xl md:leading-relaxed"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            {project.summary}
          </p>

          <dl
            className="rise mt-14 grid gap-x-8 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4"
            style={{ "--d": "260ms" } as React.CSSProperties}
          >
            {facts.map((f) => (
              <div
                key={f.term}
                className="border-b border-ink/10 py-5 last:border-b-0 sm:py-6 lg:border-b-0"
              >
                <dt className="font-mono text-xs tracking-[0.04em] text-muted uppercase">
                  {f.term}
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pretty">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>

      {project.image && (
        <div className="shell mt-10 md:mt-14">
          <div className="relative">
            <div className="stage group">
              <StageScreens screens={[project.image]} domain={domain} priority />
            </div>
            <Corners inset={-6} />
          </div>
        </div>
      )}

      {/* A direct child of the article, so it sticks for the article's length. */}
      <CaseStudyBar
        name={project.name}
        bodyId="case-study-body"
        action={action}
        className="mt-14 md:mt-20"
      />

      {project.highlights && (
        <section aria-labelledby="at-a-glance" className="shell mt-14 md:mt-20">
          <h2 id="at-a-glance" className="section-label">
            <span className="hatch" />
            At a glance
          </h2>
          <Highlights highlights={project.highlights} className="mt-6" />
        </section>
      )}

      <div className="shell py-20 md:py-28">
        <div id="case-study-body" className="numbered-sections mx-auto max-w-[42rem]">
          <Body components={caseStudyComponents} />
        </div>
      </div>

      {next && (
        <nav aria-label="More work" className="shell pb-24 md:pb-32">
          <Link
            href={`/work/${next.slug}`}
            className="tile group flex min-h-[20rem] flex-col p-7 md:min-h-[24rem] md:p-10"
          >
            <span className="relative z-10 max-w-[28rem]">
              <span className="font-mono text-xs tracking-[0.04em] text-muted uppercase">
                Next case study
              </span>
              <span className="mt-3 block text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-tight font-semibold tracking-[-0.035em]">
                {next.name}
              </span>
              <span className="mt-2 block leading-relaxed text-pretty text-muted">
                {next.outcome}
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                Read it
                <ArrowRight className="nudge-out size-4" />
              </span>
            </span>
            {next.image && (
              <span className="tile-shot window absolute right-6 bottom-0 hidden w-[48%] md:block">
                <Image
                  src={next.image.src}
                  alt=""
                  width={next.image.width}
                  height={next.image.height}
                  sizes="560px"
                  className="block h-auto w-full"
                />
              </span>
            )}
          </Link>
        </nav>
      )}
    </article>
  );
}
