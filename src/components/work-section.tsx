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

/** `// 02 SELECTED WORK` — four case-study cards, then compact rows. */
export function WorkSection() {
  return (
    <Section id="work" label="02 Selected work">
      <ol className="space-y-24 md:space-y-32">
        {featuredProjects.map((project, i) => (
          <li key={project.slug}>
            <FeaturedCard project={project} index={i + 1} />
          </li>
        ))}
      </ol>

      <h3 className="label-mono mt-28 text-muted">Also built</h3>
      <ul className="mt-6 border-t border-line">
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

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const href = projectHref(project);

  return (
    <article aria-labelledby={`${project.slug}-title`} className="group">
      {project.image && (
        <SmartLink
          href={href ?? "#work"}
          tabIndex={-1}
          aria-hidden
          className="block overflow-hidden border border-line bg-paper-2"
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1440}
            height={900}
            sizes="(min-width: 1200px) 760px, (min-width: 768px) 66vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
          />
        </SmartLink>
      )}

      <div className="mt-6 flex items-baseline gap-4">
        <span className="label-mono text-muted">
          {String(index).padStart(2, "0")}
        </span>
        <h3
          id={`${project.slug}-title`}
          className="font-serif text-3xl leading-tight md:text-4xl"
        >
          {href ? (
            <SmartLink
              href={href}
              className="underline decoration-transparent decoration-2 underline-offset-[0.15em] transition-colors hover:decoration-signal"
            >
              {project.title}
            </SmartLink>
          ) : (
            project.title
          )}
        </h3>
        <span className="label-mono ml-auto shrink-0 text-muted">
          {project.year}
        </span>
      </div>

      <p className="mt-3 text-xl leading-snug text-pretty">{project.outcome}</p>
      <p className="mt-2 text-muted">{project.role}</p>

      <ul aria-label="Stack" className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="label-mono border border-line px-2 py-1 text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <p className="label-mono mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {project.caseStudy && (
          <Link
            href={`/work/${project.slug}`}
            className="underline decoration-signal decoration-2 underline-offset-8 hover:text-muted"
          >
            Read the case study →
          </Link>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-ink"
          >
            Live ↗
          </a>
        )}
        {project.links.code && (
          <a
            href={project.links.code}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-ink"
          >
            Code ↗
          </a>
        )}
      </p>
    </article>
  );
}

function AlsoBuiltRow({ project }: { project: Project }) {
  const href = projectHref(project);
  const body = (
    <>
      <span className="label-mono pt-1 text-muted">{project.year}</span>
      <span>
        <span className="font-medium">{project.title}</span>
        <span className="mt-1 block text-muted">{project.outcome}</span>
      </span>
      <span className="label-mono hidden pt-1 text-right text-muted md:block">
        {project.stack.slice(0, 2).join(" · ")}
      </span>
      <span aria-hidden className="pt-0.5 text-muted">
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
