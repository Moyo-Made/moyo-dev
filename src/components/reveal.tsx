import Image from "next/image";
import Link from "next/link";
import { getProject, isExternal, projectHref } from "@/lib/projects";

/**
 * A phrase in the README that references a project, footnote-style: the
 * phrase links to the work, a numbered marker follows it, and on wide
 * screens a compact sidenote (thumbnail, title, stack) floats in the right
 * margin at the same height. Hovering or focusing either one highlights
 * both. Numbers come from CSS counters (.refs / .ref-mark in globals.css),
 * so they follow the order of the copy.
 *
 * Below lg there's no margin to float into: the sidenote is hidden and the
 * phrase itself opens the work. Screen readers get the project's outcome as
 * the link's description either way.
 */
export function Reveal({
  project: slug,
  children,
}: {
  project: string;
  children: React.ReactNode;
}) {
  const project = getProject(slug);
  if (!project) throw new Error(`<Reveal> has no project "${slug}"`);

  const href = projectHref(project) ?? "/#work";
  const descId = `ref-${slug}`;
  const linkProps = {
    href,
    ...(isExternal(href) && { target: "_blank", rel: "noreferrer" }),
  };
  const Anchor = isExternal(href) ? "a" : Link;

  return (
    <span className="group/ref">
      <Anchor
        {...linkProps}
        aria-describedby={descId}
        className="underline decoration-line decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] group-hover/ref:decoration-annot group-hover/ref:decoration-2 focus-visible:decoration-annot"
      >
        {children}
      </Anchor>
      <sup
        aria-hidden
        className="ref-mark ml-0.5 font-mono text-[0.45em] font-medium tracking-normal text-annot"
      />
      <span id={descId} className="sr-only">
        {project.title}: {project.outcome}
      </span>

      {/* The sidenote repeats the link for pointer users only. Kept short so
          neighbouring notes don't stack past the paragraph. */}
      <Anchor
        {...linkProps}
        aria-hidden
        tabIndex={-1}
        className="float-right clear-right -mr-[19rem] mb-3 hidden w-64 grid-cols-[4.5rem_1fr] gap-3 border-l-2 border-line py-1 pl-3 text-sm leading-snug tracking-normal transition-colors group-hover/ref:border-annot group-focus-within/ref:border-annot lg:grid xl:-mr-[22rem] xl:w-72"
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt=""
            width={144}
            height={90}
            sizes="4.5rem"
            className="aspect-[16/10] w-full border border-line object-cover object-top"
          />
        ) : (
          <span />
        )}
        <span>
          <span className="label-mono ref-num mr-1.5 text-annot" />
          <span className="font-display text-base font-semibold">
            {project.title}
          </span>
          <span className="label-mono mt-1 block text-muted">
            {project.stack.slice(0, 2).join(" · ")}
          </span>
        </span>
      </Anchor>
    </span>
  );
}
