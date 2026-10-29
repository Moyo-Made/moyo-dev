import { notes } from "@/data/notes";
import { SectionLabel } from "@/components/panel";

const date = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Writing: posts on other platforms, newest first, each title running to
 * its date along a dotted leader. Kept apart from the services copy, in
 * the same visual language.
 */
export function WritingSection() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="shell pb-24 md:pb-32">
      <SectionLabel n={6}>Writing</SectionLabel>
      <div className="arrive mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="writing-title" className="text-xl font-semibold tracking-[-0.02em]">
            Writing
          </h2>
          <p className="mt-2 max-w-[22rem] text-[0.9375rem] leading-relaxed text-muted">
            Notes on engineering, learning AI, and building in tech.
          </p>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {notes.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline py-3.5 sm:py-4"
              >
                <span className="text-[1.0625rem] leading-snug font-medium tracking-[-0.01em] text-pretty transition-colors group-hover:text-accent-ink">
                  {n.title}
                </span>
                <span aria-hidden className="leader" />
                <time
                  dateTime={n.date}
                  className="shrink-0 text-sm whitespace-nowrap text-muted tabular-nums"
                >
                  {date.format(new Date(n.date))}
                  <span className="hidden sm:inline"> · {n.platform}</span>
                </time>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
