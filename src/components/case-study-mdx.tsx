import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Children } from "react";

/** "What I'd do differently" → "what-id-do-differently", for heading anchors. */
function slugify(node: React.ReactNode) {
  return Children.toArray(node)
    .filter((c) => typeof c === "string")
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Typography for case-study write-ups, passed to each case study's MDX
 * directly. Section headings get ids, so the page's index can link to and
 * follow them.
 */
export const caseStudyComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      id={slugify(children)}
      className="mt-20 scroll-mt-34 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] first:mt-0 md:text-[2rem]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mt-10 text-xl leading-snug font-semibold tracking-[-0.02em]" {...props} />
  ),
  p: (props) => <p className="mt-5 max-w-[42rem] text-[1.0625rem] leading-[1.75]" {...props} />,
  ul: (props) => (
    <ul
      className="mt-5 max-w-[42rem] list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.75] marker:text-muted"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 max-w-[42rem] list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.75] marker:text-muted"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => <a className="link" {...props} />,
  code: (props) => (
    <code className="rounded-[5px] bg-stage px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-6 max-w-[42rem] overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 max-w-[42rem] border-l-2 border-accent pl-6 text-xl leading-snug font-medium tracking-[-0.015em] [&_p]:mt-0 [&_p]:text-xl"
      {...props}
    />
  ),
  hr: () => <hr className="my-16 border-line" />,
  // Markdown images sit inside a <p>, so this stays an inline <img> — no
  // <figure> wrapper. The surrounding prose explains each screenshot.
  img: ({ src, alt }) => (
    <Image
      src={src as string}
      alt={alt ?? ""}
      width={1600}
      height={1000}
      sizes="(min-width: 1200px) 672px, (min-width: 768px) 66vw, 100vw"
      className="window my-8 block h-auto w-full"
    />
  ),
};
