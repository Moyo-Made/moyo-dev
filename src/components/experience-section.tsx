import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { Statement } from "@/components/statement";
import { SectionLabel } from "@/components/panel";
import { ArrowUpRight } from "@/components/icons";

/** Experience on the home page, on a white band. */
export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-surface">
      <div className="shell py-24 md:py-32">
        <SectionLabel n={3}>Experience</SectionLabel>
        <Statement id="experience-title" title="Experience." className="mt-8">
          {
            "In-house at startups, independently for clients, and with the volunteer team behind one of Nigeria’s largest developer conferences."
          }
        </Statement>
        <ExperienceList className="mt-14 md:mt-16" />
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-[0.9375rem] text-muted transition-colors hover:text-ink"
        >
          Full history on LinkedIn
          <ArrowUpRight className="nudge-out size-4" />
        </a>
      </div>
    </section>
  );
}

/**
 * Where the work happened, as a ledger rather than a timeline: who, what
 * changed, and when, aligned so the eye can run down any one column. Rows
 * arrive one at a time as they scroll in.
 */
export function ExperienceList({ className = "" }: { className?: string }) {
  return (
    <ol className={`border-t border-ink ${className}`}>
      {experience.map((e) => (
        <li
          key={e.org}
          className="arrive grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-12 md:py-7"
        >
          <div className="flex items-baseline justify-between gap-4 md:col-span-4 md:block">
            <h3 className="text-lg font-semibold tracking-[-0.02em]">{e.org}</h3>
            <p className="text-sm text-muted tabular-nums md:hidden">{e.period}</p>
            <p className="hidden text-[0.9375rem] text-muted md:mt-1 md:block">{e.role}</p>
          </div>
          <p className="text-sm text-muted md:hidden">{e.role}</p>
          <p className="mt-1 max-w-[40rem] text-[1.0625rem] leading-relaxed text-pretty md:col-span-6 md:mt-0">
            {e.detail}
          </p>
          <p className="hidden text-right text-[0.9375rem] text-muted tabular-nums md:col-span-2 md:block">
            {e.period}
          </p>
        </li>
      ))}
    </ol>
  );
}
