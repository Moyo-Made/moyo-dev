import { site } from "@/data/site";
import { SectionHeader } from "@/components/section";

const links = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

/** Subject and body the email opens with, so nobody starts from a blank page. */
const subject = "Let's work together";
const prompts = ["We're building", "The hard part is", "Timeline:"];
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
  `Hi ${site.shortName},\n\n${prompts.map((p) => `${p} `).join("\n")}\n`,
)}`;

/**
 * `06 — CONTACT`: one question, then the sheet's title block — the
 * boxed corner of an engineering drawing that says who drew it and where
 * else to find them.
 */
export function SiteFooter() {
  const cell = "border-r border-b border-ink p-4";
  const term = "label-mono text-muted";

  return (
    <footer id="contact" aria-labelledby="contact-label" className="bg-grid">
      <div className="shell pt-20 pb-10 md:pt-28">
        <SectionHeader
          id="contact"
          caption={
            site.availableForRoles ? "Open to frontend roles" : undefined
          }
        />

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-12 md:mt-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-balance">
              Building something complicated? Let&rsquo;s make it feel simple.
            </p>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted text-pretty md:text-2xl">
              Hiring for a frontend role, or need a product built? Send me what
              you&rsquo;re working on and the part that&rsquo;s hardest to get
              right. I&rsquo;ll write back with how I&rsquo;d approach it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={mailto}
                className="label-mono inline-flex items-center gap-3 bg-ink px-5 py-4 text-paper transition-colors hover:bg-annot"
              >
                Email me <span aria-hidden>→</span>
              </a>
              <p className="label-mono text-muted">
                Recently shipped: Social Shake · Gixel
              </p>
            </div>
          </div>

          <EmailDraft />
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-l border-ink bg-paper md:grid-cols-4">
          <div className={`${cell} col-span-2`}>
            <dt className={term}>Drawn by</dt>
            <dd className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {site.name}
            </dd>
          </div>
          <div className={cell}>
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
          <div className={cell}>
            <dt className={term}>Page</dt>
            <dd className="mt-2">
              <a href="#top" className="hover:text-annot">
                Back to top <span className="text-annot">↑</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}

/**
 * A compose window with the blanks showing: what to send, at a glance.
 * The whole card opens the same pre-filled email as the button.
 */
function EmailDraft() {
  const row = "flex gap-3 border-b border-line py-2";

  return (
    <a
      href={mailto}
      aria-label={`Email ${site.shortName} with a pre-filled draft`}
      className="group ticks block bg-paper-2 p-5 font-mono text-sm leading-relaxed transition-colors hover:bg-paper"
    >
      <p className="label-mono text-annot">New message</p>
      <div aria-hidden className="mt-3">
        <p className={row}>
          <span className="text-muted">To</span>
          <span className="truncate">{site.email}</span>
        </p>
        <p className={row}>
          <span className="text-muted">Subject</span>
          <span>{subject}</span>
        </p>
        <div className="space-y-2 pt-4">
          <p>Hi {site.shortName},</p>
          {prompts.map((p) => (
            <p key={p} className="flex items-baseline gap-2">
              <span className="shrink-0">{p}</span>
              <span className="h-px flex-1 translate-y-[-0.2em] bg-annot" />
            </p>
          ))}
        </div>
        <p className="label-mono mt-6 text-right group-hover:text-annot">
          Send <span className="text-annot">→</span>
        </p>
      </div>
    </a>
  );
}
