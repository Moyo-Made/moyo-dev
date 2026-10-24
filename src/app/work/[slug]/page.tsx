import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudySlugs, getProject } from "@/lib/projects";

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

// Unstyled on purpose — this proves the data and MDX wiring. The case-study
// template is designed in Step 5.
export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);

  return (
    <article className="shell pt-32 pb-20">
      <h1 className="font-serif text-5xl">{project.title}</h1>
      <p>{project.summary}</p>
      <dl>
        <dt>Role</dt>
        <dd>{project.role}</dd>
        <dt>Year</dt>
        <dd>{project.year}</dd>
        <dt>Stack</dt>
        <dd>{project.stack.join(" · ")}</dd>
      </dl>
      {project.tldr && (
        <ul>
          <li>Problem: {project.tldr.problem}</li>
          <li>Built: {project.tldr.built}</li>
          <li>Result: {project.tldr.result}</li>
        </ul>
      )}
      <Body />
    </article>
  );
}
