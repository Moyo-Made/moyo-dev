import { steps } from "@/data/process";
import { Statement } from "@/components/statement";
import { SectionLabel } from "@/components/panel";

/**
 * How I work: five steps, which really are a sequence, so they're numbered
 * and joined by a rail. Each is shown on the same project, so the section
 * reads as one story. The rail draws and the dots light in order as the
 * section scrolls past.
 */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="shell py-24 md:py-32">
      <SectionLabel n={4}>Process</SectionLabel>
      <Statement id="process-title" title="How I work." className="mt-8">
        {
          "The same five steps on every project, shown here on Social Shake, where the client needed a marketplace people could trust with money."
        }
      </Statement>

      <div className="arrive relative mt-14 md:mt-20">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-line lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
        >
          <span className="rail absolute inset-0 bg-accent" />
        </span>
        <ol className="grid gap-y-10 lg:grid-cols-5 lg:gap-x-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-9 lg:pt-10 lg:pl-0">
              <span
                aria-hidden
                className="rail-dot absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-canvas bg-accent shadow-[0_0_0_1px_var(--accent)] lg:top-0"
                style={{ "--i": i } as React.CSSProperties}
              />
              <p className="font-mono text-xs text-accent-ink tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-muted">
                {s.body}
              </p>
              <p className="mt-4 border-l-2 border-line pl-3 text-sm leading-relaxed text-pretty text-muted lg:mt-5">
                {s.example}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
