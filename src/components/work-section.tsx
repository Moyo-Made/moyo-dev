import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import {
  alsoBuilt,
  featuredProjects,
  isExternal,
  projectHref,
} from "@/lib/projects";
import { Section } from "@/components/section";

/**
 * `02 — SELECTED WORK`: each case study as a plate — the screenshot in crop
 * marks with its caption, and a spec table beside it. Plates
 * alternate sides on wide screens. Smaller projects follow as a table.
 */
export function WorkSection() {
  return (
    <Section
      id="work"
      caption={`${featuredProjects.length} featured · ${alsoBuilt.length} more`}
    >
      <ol className="space-y-24 md:space-y-32">
        {featuredProjects.map((project, i) => (
          <li key={project.slug}>
            <Plate project={project} index={i + 1} flip={i % 2 === 1} />
          </li>
        ))}
      </ol>

      <h3 className="label-mono mt-28">Also built</h3>
      <div
        aria-hidden
        className="label-mono mt-6 hidden grid-cols-[3.5rem_1fr_11rem_1rem] gap-x-4 border-b-2 border-ink pb-2 text-muted md:grid"
      >
        <span>Year</span>
        <span>Project</span>
        <span className="text-right">Stack</span>
        <span />
      </div>
      <ul className="mt-6 border-t border-line md:mt-0 md:border-t-0">
        {alsoBuilt.map((project) => (
          <li key={project.slug} className="border-b border-line">
            <AlsoBuiltRow project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function SmartLink({
  href,
  children,
  ...props
}: { href: string; children: React.ReactNode } & Omit<
  React.ComponentProps<"a">,
  "href"
>) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function Plate({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const href = projectHref(project);
  const specs = [
    { term: "Role", detail: project.role },
    { term: "Year", detail: String(project.year) },
    { term: "Stack", detail: project.stack.join(", ") },
  ];

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group grid gap-x-6 gap-y-8 lg:grid-cols-12 lg:items-start"
    >
      {project.image && (
        <figure
          className={
            flip ? "lg:order-2 lg:col-span-7 lg:col-start-6" : "lg:col-span-7"
          }
        >
          <SmartLink
            href={href ?? "#work"}
            tabIndex={-1}
            aria-hidden
            className="ticks block p-3 group-hover:[--tick:var(--annot)]"
          >
            <span className="block overflow-hidden border border-line bg-paper-2">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1440}
                height={900}
                sizes="(min-width: 1200px) 680px, (min-width: 1024px) 56vw, 100vw"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
              />
            </span>
          </SmartLink>
          <figcaption className="label-mono mt-3 px-3 text-muted">
            {project.image.alt}
          </figcaption>
        </figure>
      )}

      <div
        className={
          flip ? "lg:order-1 lg:col-span-5" : "lg:col-span-5 lg:col-start-8"
        }
      >
        <p className="label-mono text-muted lg:pt-3">
          No. {String(index).padStart(2, "0")}
        </p>
        <h3
          id={`${project.slug}-title`}
          className="mt-3 font-display text-3xl leading-[1.05] font-semibold tracking-tight text-balance md:text-4xl"
        >
          {href ? (
            <SmartLink
              href={href}
              className="underline decoration-transparent decoration-2 underline-offset-[0.15em] transition-colors hover:decoration-annot"
            >
              {project.title}
            </SmartLink>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-4 text-xl leading-snug text-pretty">{project.outcome}</p>

        <dl className="mt-8 border-t-2 border-ink">
          {specs.map((s) => (
            <div
              key={s.term}
              className="grid grid-cols-[5rem_1fr] gap-x-4 border-b border-line py-3"
            >
              <dt className="label-mono pt-0.5 text-muted">{s.term}</dt>
              <dd className="leading-snug">{s.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="label-mono mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.caseStudy && (
            <Link
              href={`/work/${project.slug}`}
              className="bg-ink px-4 py-3 text-paper transition-colors hover:bg-annot"
            >
              Read the case study →
            </Link>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="py-3 underline decoration-line underline-offset-8 hover:text-annot hover:decoration-annot"
            >
              Live ↗
            </a>
          )}
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noreferrer"
              className="py-3 underline decoration-line underline-offset-8 hover:text-annot hover:decoration-annot"
            >
              Code ↗
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

function AlsoBuiltRow({ project }: { project: Project }) {
  const href = projectHref(project);
  const body = (
    <>
      <span className="label-mono pt-1 text-muted">{project.year}</span>
      <span>
        <span className="font-display text-xl font-semibold">{project.title}</span>
        <span className="mt-1 block text-muted">{project.outcome}</span>
      </span>
      <span className="label-mono hidden pt-1 text-right text-muted md:block">
        {project.stack.slice(0, 2).join(" · ")}
      </span>
      <span aria-hidden className="pt-0.5 text-annot">
        {href ? "↗" : ""}
      </span>
    </>
  );
  const grid =
    "grid grid-cols-[3.5rem_1fr_1rem] gap-x-4 py-5 md:grid-cols-[3.5rem_1fr_11rem_1rem]";

  return href ? (
    <SmartLink
      href={href}
      className={`${grid} transition-colors hover:bg-paper-2`}
    >
      {body}
    </SmartLink>
  ) : (
    <div className={grid}>{body}</div>
  );
}
