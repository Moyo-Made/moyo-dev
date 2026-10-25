import { sectionNumber, sectionTitle, type SectionId } from "@/data/sections";

/**
 * A home-page section: a heavy rule with `02 — SELECTED WORK` on the left
 * and an optional caption on the right, then the content across the full
 * width. Numbers and titles come from src/data/sections.ts.
 */
export function Section({
  id,
  caption,
  children,
}: {
  id: SectionId;
  /** Right of the rule, e.g. "4 case studies · 6 more". */
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`}>
      <div className="shell py-20 md:py-28">
        <SectionHeader id={id} caption={caption} />
        <div className="settle-on-view mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeader({
  id,
  caption,
}: {
  id: SectionId;
  caption?: string;
}) {
  return (
    <div className="settle-on-view flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-ink pt-3">
      <h2 id={`${id}-label`} className="label-mono">
        <span className="text-annot">{sectionNumber(id)}</span>
        <span aria-hidden className="text-muted">
          {" — "}
        </span>
        {sectionTitle(id)}
      </h2>
      {caption && <p className="label-mono text-muted">{caption}</p>}
    </div>
  );
}
