import { buildSteps } from "@/data/process";

/**
 * `05 — HOW I BUILD` as an actual flow diagram: one box per step,
 * joined by arrows (left to right on wide screens, top to bottom on small
 * ones), each with its annotation leadered underneath. Static markup, so it
 * reads the same without JavaScript; connectors draw in on scroll where the
 * browser supports it.
 */
export function FlowDiagram() {
  const last = buildSteps.length - 1;

  return (
    <>
      <ol className="grid lg:grid-cols-4 lg:gap-x-12">
        {buildSteps.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="relative border-2 border-ink bg-paper px-4 pt-3 pb-4">
              <span className="label-mono text-annot">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-3xl leading-none font-semibold tracking-tight">
                {step.title}
              </h3>
              {i < last && (
                <Arrow className="draw-on-view absolute top-1/2 left-full hidden w-12 origin-left -translate-y-1/2 lg:flex" />
              )}
            </div>

            <span
              aria-hidden
              className="draw-on-view-y ml-4 block h-8 leader-y text-annot"
            />
            <p className="ml-4 max-w-[48ch] border-l border-annot pl-4 leading-relaxed text-pretty">
              {step.body}
            </p>

            {i < last && (
              <Arrow className="draw-on-view-y mx-auto my-4 flex h-14 w-3 origin-top flex-col lg:hidden" />
            )}
          </li>
        ))}
      </ol>
      <p className="label-mono mt-12 flex items-center gap-3 text-muted">
        <span aria-hidden className="text-base text-annot">
          ↺
        </span>
        Every write-up feeds the next scope.
      </p>
    </>
  );
}

/** A solid connector with a head, horizontal unless flex-col is passed. */
function Arrow({ className }: { className: string }) {
  const vertical = className.includes("flex-col");
  return (
    <span aria-hidden className={`items-center ${className}`}>
      <span className={vertical ? "w-0.5 flex-1 bg-ink" : "h-0.5 flex-1 bg-ink"} />
      <svg
        viewBox="0 0 10 10"
        className={`size-2.5 shrink-0 fill-ink ${vertical ? "rotate-90" : ""}`}
      >
        <path d="M0 0 10 5 0 10Z" />
      </svg>
    </span>
  );
}
