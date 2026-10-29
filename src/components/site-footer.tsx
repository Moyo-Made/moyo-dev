import { mailto, site } from "@/data/site";
import { Words } from "@/components/statement";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight } from "@/components/icons";
import { Eyebrow, Panel } from "@/components/panel";

/**
 * Every page closes here, on the same lit panel it opens with: one
 * question, and the address itself set large enough to be the thing you
 * remember. It opens a pre-filled email; the button beside it copies the
 * address for anyone without a mail app set up.
 */
export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="pt-16 md:pt-24">
      <Panel>
        <div className="shell pt-20 pb-10 md:pt-28 md:pb-12">
          <Eyebrow live>Open to freelance work and remote roles</Eyebrow>
          <h2
            id="contact-title"
            className="mt-8 max-w-[16ch] text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] leading-[1.03] font-semibold tracking-[-0.045em] text-balance"
          >
            <Words text="Have something in mind? Let’s build it." />
          </h2>
          <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-pretty text-muted md:text-xl md:leading-relaxed">
            Whether you&rsquo;re starting something new or improving an existing product, I&rsquo;d
            love to hear what you&rsquo;re working on.
          </p>

          <div className="mt-14 flex flex-col gap-5 border-t border-ink/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
            <a
              href={mailto}
              className="group w-fit text-[clamp(1.75rem,1rem+3.2vw,3.25rem)] leading-none font-medium tracking-[-0.035em] break-all"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat pb-1.5 transition-[background-size] duration-500 ease-soft group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                {site.email}
              </span>
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <CopyEmail />
              <a href={mailto} className="btn btn-primary">
                Email me
              </a>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
            {(
              [
                ["LinkedIn", site.socials.linkedin],
                ["GitHub", site.socials.github],
                ["X", site.socials.x],
              ] as const
            ).map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-ink"
                >
                  {label}
                  <ArrowUpRight className="nudge-out size-4" />
                </a>
              </li>
            ))}
            <li>
              Based in {site.location} ({site.timeZone}), working remotely.
            </li>
          </ul>
        </div>
      </Panel>

      <div className="shell flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          {site.name}, {site.role.toLowerCase()}.
        </p>
        <a href="#top" className="w-fit transition-colors hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  );
}
