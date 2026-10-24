import Image from "next/image";
import type { MDXComponents } from "mdx/types";

/**
 * Typography for case-study write-ups. Passed to each case study's MDX
 * directly (not via the global mdx-components.tsx) so the README keeps its
 * own large-type styling.
 */
export const caseStudyComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-20 font-serif text-3xl leading-tight first:mt-0 md:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 text-xl font-medium leading-snug" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 max-w-[68ch] text-lg leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 max-w-[68ch] list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-muted"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 max-w-[68ch] list-decimal space-y-2 pl-6 text-lg leading-relaxed marker:text-muted"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => (
    <a
      className="underline decoration-muted/50 underline-offset-4 hover:decoration-signal hover:decoration-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm bg-paper-2 px-1.5 py-0.5 font-mono text-[0.88em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-sm bg-ink p-5 font-mono text-sm leading-relaxed text-paper [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-signal pl-6 font-serif text-2xl leading-snug [&_p]:mt-0 [&_p]:text-2xl"
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
      sizes="(min-width: 1200px) 760px, (min-width: 768px) 66vw, 100vw"
      className="my-4 block h-auto w-full border border-line"
    />
  ),
};
