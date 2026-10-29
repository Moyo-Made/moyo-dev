import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import {
  alsoBuilt,
  featuredProjects,
  formatList,
  isExternal,
  mlProjects,
  projectHref,
} from "@/lib/projects";
import { Statement } from "@/components/statement";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Eyebrow, Panel, SectionLabel } from "@/components/panel";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products Moyomade Adegbite has built and shipped: a creator marketplace, an AI campaign generator, conference ticketing, and more — with case studies.",
  alternates: { canonical: "/work" },
};

const total = featuredProjects.length + alsoBuilt.length + mlProjects.length;

/**
 * Every project: the three case studies as cards, then the rest as a
 * ledger, then the machine-learning work kept apart from the product work,
 * opened by the lit panel and numbered like the home page's sections.
 */
export default function WorkIndex() {
  return (
    <>
      <Panel as="header">
        <div className="shell pt-16 pb-12 md:pt-24 md:pb-16">
          <Eyebrow>
            {total} projects · {featuredProjects.length} case studies
          </Eyebrow>
          <Statement id="work-title" as="h1" title="Work." className="mt-8">
            {
              "Products I’ve built and shipped, for clients, for the teams I’ve worked in, and on my own. The first three have full case studies."
            }
          </Statement>
        </div>
      </Panel>

      <div className="shell pt-16 pb-8 md:pt-24">
        <section aria-labelledby="case-studies-title">
          <SectionLabel n={1}>Case studies</SectionLabel>
          <h2 id="case-studies-title" className="sr-only">
            Case studies
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug} className="arrive">
                <CaseStudyCard project={p} />
              </li>
            ))}
          </ul>
        </section>

        <ProjectLedger n={2} id="more" title="More projects" projects={alsoBuilt} />
        <ProjectLedger
          n={3}
          id="ml"
          title="Machine learning"
          note="Models trained and served end to end, while I learn the field properly."
          projects={mlProjects}
        />
      </div>
    </>
  );
}

function CaseStudyCard({ project: p }: { project: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="lift group block">
      {p.image && (
        <span className="stage block p-4 sm:p-6">
          <Image
            src={p.image.src}
            alt=""
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
            className="window aspect-[16/10] w-full object-cover object-top transition-[translate] duration-500 ease-soft motion-safe:group-hover:-translate-y-1"
          />
        </span>
      )}
      <span className="mt-5 flex items-center justify-between gap-4">
        <span className="text-xl font-semibold tracking-[-0.025em]">{p.name}</span>
        <ArrowRight className="nudge-out size-4 shrink-0 text-muted" />
      </span>
      <span className="mt-1.5 block leading-relaxed text-pretty text-muted">{p.outcome}</span>
    </Link>
  );
}

function ProjectLedger({
  n,
  id,
  title,
  note,
  projects,
}: {
  n: number;
  id: string;
  title: string;
  note?: string;
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby={`${id}-title`} className="mt-24 md:mt-32">
      <SectionLabel n={n}>{title}</SectionLabel>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-[-0.025em]">
          {title}
        </h2>
        {note && <p className="text-[0.9375rem] text-muted">{note}</p>}
      </div>
      <ul className="mt-6 border-t border-ink">
        {projects.map((p) => {
          const href = projectHref(p);
          const external = href && isExternal(href);
          const row = (
            <>
              <span className="text-sm text-muted tabular-nums md:pt-1">{p.year}</span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-ink">
                  {p.name}
                  {href && <ArrowUpRight className="nudge-out size-4 text-muted" />}
                </span>
                <span className="mt-1 block max-w-[38rem] leading-relaxed text-pretty text-muted">
                  {p.outcome}
                </span>
              </span>
              <span className="text-sm text-muted md:pt-1 md:text-right">
                {formatList(p.stack.slice(0, 3))}
              </span>
            </>
          );
          const grid =
            "arrive grid gap-x-8 gap-y-1 border-b border-line py-6 md:grid-cols-[4rem_minmax(0,1fr)_16rem]";

          return (
            <li key={p.slug}>
              {href ? (
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                  className={`${grid} group`}
                >
                  {row}
                </a>
              ) : (
                <div className={grid}>{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
