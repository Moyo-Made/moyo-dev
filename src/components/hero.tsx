import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getProject, isExternal, projectHref } from "@/lib/projects";

/**
 * The ten-second answer to who, what, and where's the proof. On the left:
 * availability, name and city, the role as the headline, then the problem
 * solved. On the right, the proof itself — the latest case study's
 * screenshot in crop marks, with numbered callouts leadered up to it.
 */
export function Hero() {
  const project = getProject(site.proof.project);
  if (!project) throw new Error(`site.proof has no project "${site.proof.project}"`);
  const href = projectHref(project) ?? "/#work";
  // Without a case study the proof links to the live product, in a new tab.
  const external = isExternal(href) && { target: "_blank", rel: "noreferrer" };

  const notes = [
    ...site.proof.notes,
    { term: "Stack", detail: project.stack.join(" · ") },
  ];

  return (
    <section aria-labelledby="hero-name" className="bg-grid border-b border-line">
      <div className="shell grid min-h-svh content-center gap-x-6 gap-y-16 pt-32 pb-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-6">
          {site.availableForRoles && (
            <p className="settle label-mono inline-flex items-center gap-2 bg-mark px-2 py-1 text-on-mark">
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              Available for roles
            </p>
          )}
          <h1 id="hero-name" className="settle mt-6">
            <span className="label-mono block text-muted">
              {site.name} · {site.location.split(",")[0]}
            </span>
            <span className="mt-4 block font-display text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.025em] text-balance">
              {site.role}
            </span>
          </h1>
          <p
            className="settle mt-6 max-w-xl text-xl leading-snug text-pretty text-muted md:text-2xl"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {site.tagline} Most recently:{" "}
            <Link
              href={href}
              {...external}
              className="text-ink underline decoration-annot underline-offset-4 hover:text-annot"
            >
              {site.proof.text}
            </Link>
            .
          </p>

          <div
            className="settle mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            <a
              href="#work"
              className="label-mono inline-flex items-center gap-3 bg-ink px-5 py-4 text-paper transition-colors hover:bg-annot"
            >
              Read the work <span aria-hidden>↓</span>
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="label-mono underline decoration-line underline-offset-8 transition-colors hover:text-annot hover:decoration-annot"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {project.image && (
          <figure
            className="settle group lg:col-span-6 lg:col-start-7"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            <Link
              href={href}
              {...external}
              aria-label={project.caseStudy ? `${project.title} — case study` : project.title}
              className="ticks block p-3 group-hover:[--tick:var(--annot)]"
            >
              <span className="block overflow-hidden border border-line bg-paper-2">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={1440}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1200px) 560px, (min-width: 1024px) 46vw, 100vw"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                />
              </span>
            </Link>

            {/* Callouts, each leadered up to the frame. */}
            <figcaption>
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-3">
                {notes.map((n, i) => (
                  <div key={n.term} className="px-3">
                    <span
                      aria-hidden
                      className="draw-y ml-2.5 block h-8 leader-y text-annot"
                      style={{ "--d": `${600 + i * 120}ms` } as React.CSSProperties}
                    />
                    <dt className="label-mono flex items-center gap-2 text-annot">
                      <span
                        aria-hidden
                        className="grid size-5 place-items-center rounded-full border border-current text-[0.625rem] tracking-normal"
                      >
                        {i + 1}
                      </span>
                      {n.term}
                    </dt>
                    <dd className="mt-1.5 leading-snug">{n.detail}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
