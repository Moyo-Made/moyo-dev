import { site } from "@/data/site";
import { figures } from "@/data/figures";
import { FigureHeader } from "@/components/section";
import { LagosClock } from "@/components/lagos-clock";

const links = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

/**
 * `FIG. 07 — CONTACT`: one question, then the sheet's title block — the
 * boxed corner of an engineering drawing that says who drew it, where, and
 * how to reach them.
 */
export function SiteFooter() {
  const cell = "border-r border-b border-ink p-4";
  const term = "label-mono text-muted";

  return (
    <footer id="contact" aria-labelledby="contact-label" className="bg-grid">
      <div className="shell pt-20 pb-10 md:pt-28">
        <FigureHeader
          id="contact"
          caption={
            site.availableForRoles ? "Open to frontend & full-stack roles" : undefined
          }
        />

        <p className="mt-10 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-balance md:mt-14">
          Got a system that needs explaining?
        </p>
        <a
          href={`mailto:${site.email}`}
          className="label-mono mt-10 inline-flex items-center gap-3 bg-ink px-5 py-4 text-paper transition-colors hover:bg-annot"
        >
          Send an email <span aria-hidden>→</span>
        </a>

        <dl className="mt-16 grid grid-cols-2 border-t border-l border-ink bg-paper md:grid-cols-4">
          <div className={`${cell} col-span-2`}>
            <dt className={term}>Drawn by</dt>
            <dd className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {site.name}
            </dd>
          </div>
          <div className={cell}>
            <dt className={term}>Location</dt>
            <dd className="mt-2">{site.location}</dd>
          </div>
          <div className={cell}>
            <dt className={term}>Local time</dt>
            <dd className="mt-2">
              <LagosClock />
            </dd>
          </div>
          <div className={`${cell} col-span-2`}>
            <dt className={term}>Contact</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${site.email}`}
                className="break-all underline decoration-annot underline-offset-4 hover:text-annot"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div className={`${cell} col-span-2`}>
            <dt className={term}>Elsewhere</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-annot"
                    >
                      {l.label} <span className="text-annot">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={`${cell} col-span-2`}>
            <dt className={term}>Source</dt>
            <dd className="mt-2">
              Built in public —{" "}
              <a
                href="https://github.com/Moyo-Made/moyo-dev"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:text-annot hover:decoration-annot"
              >
                moyo-dev ↗
              </a>
            </dd>
          </div>
          <div className={cell}>
            <dt className={term}>Scale</dt>
            <dd className="mt-2">1 : 1</dd>
          </div>
          <div className={cell}>
            <dt className={term}>Sheet</dt>
            <dd className="mt-2 flex items-baseline justify-between gap-2">
              {figures.length} figures
              <a href="#top" className="label-mono hover:text-annot">
                Top ↑
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
