import { figNumber, figTitle, type FigureId } from "@/data/figures";

/**
 * A figure on the sheet: a heavy rule with `FIG. 02 — SELECTED WORK` on the
 * left and an optional caption on the right, then the content across the
 * full width. Numbers and titles come from src/data/figures.ts.
 */
export function Section({
  id,
  caption,
  children,
}: {
  id: FigureId;
  /** Right of the rule, e.g. "4 case studies · 6 more". */
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`}>
      <div className="shell py-20 md:py-28">
        <FigureHeader id={id} caption={caption} />
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function FigureHeader({
  id,
  caption,
}: {
  id: FigureId;
  caption?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-ink pt-3">
      <h2 id={`${id}-label`} className="label-mono">
        <span className="text-annot">Fig. {figNumber(id)}</span>
        <span aria-hidden className="text-muted">
          {" — "}
        </span>
        {figTitle(id)}
      </h2>
      {caption && <p className="label-mono text-muted">{caption}</p>}
    </div>
  );
}
