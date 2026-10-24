import { site } from "@/data/site";
import { LagosClock } from "@/components/lagos-clock";

const links = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

/** `// EXIT 0` — the closing call to action, after oyin.design's curtain call. */
export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-label" className="surface-ink">
      <div className="shell grid grid-cols-1 gap-x-6 gap-y-6 pt-24 pb-10 md:grid-cols-12 md:pt-32">
        <h2 id="contact-label" className="label-mono text-muted-on-ink md:col-span-3">
          {"// EXIT 0"}
        </h2>
        <div className="md:col-span-9 md:col-start-4">
          <p className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Let&rsquo;s build
            <br />
            something.
          </p>
          <p className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <a
              href={`mailto:${site.email}`}
              className="text-xl break-all underline decoration-signal decoration-2 underline-offset-8 hover:text-signal md:text-3xl"
            >
              {site.email}
            </a>
            <span className="label-mono text-muted-on-ink">Send an email ↗</span>
          </p>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-signal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="label-mono mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ink-2 pt-6 text-muted-on-ink md:col-span-12">
          <span>
            Built in public —{" "}
            <a
              href="https://github.com/Moyo-Made/moyo-dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper"
            >
              source
            </a>
          </span>
          <LagosClock />
          <a href="#top" className="hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
