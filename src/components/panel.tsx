/**
 * `01 ▨ Work` above a section. Decorative: the section's own heading names
 * it for assistive tech, so the label is hidden from them.
 */
export function SectionLabel({ n, children }: { n: number; children: string }) {
  return (
    <p aria-hidden className="section-label">
      <span className="section-label-num">{String(n).padStart(2, "0")}</span>
      <span className="hatch" />
      <span>{children}</span>
    </p>
  );
}

/** A small + at each corner of the nearest positioned ancestor. */
export function Corners({ inset = 10 }: { inset?: number }) {
  const at = (v: "top" | "bottom", h: "left" | "right") =>
    ({ [v]: inset, [h]: inset }) as React.CSSProperties;
  return (
    <>
      <span aria-hidden className="corner" style={at("top", "left")} />
      <span aria-hidden className="corner" style={at("top", "right")} />
      <span aria-hidden className="corner" style={at("bottom", "left")} />
      <span aria-hidden className="corner" style={at("bottom", "right")} />
    </>
  );
}

/**
 * The lit panel every page opens with (and closes with, for contact): inset
 * from the screen edges, soft drifting light, a faint grid and corner marks.
 * Used once at the top and once at the foot of a page, never in between,
 * so it keeps marking where a page starts and ends.
 */
export function Panel({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "header" | "section" | "footer";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={`px-2.5 sm:px-3 md:px-4 ${className}`} {...rest}>
      <div className="panel">
        <div aria-hidden className="panel-light">
          <span />
          <span />
          <span />
        </div>
        <div aria-hidden className="panel-grid" />
        <Corners inset={14} />
        {children}
      </div>
    </Tag>
  );
}

/** The small pill above a page title: a green dot and a few words. */
export function Eyebrow({
  children,
  live,
  className = "",
}: {
  children: React.ReactNode;
  /** A slow pulse on the dot, for "available" statements. */
  live?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full bg-surface/80 py-1 pr-3.5 pl-2.5 text-sm text-muted shadow-[inset_0_0_0_1px_rgb(32_33_31/0.07)] ${className}`}
    >
      <span aria-hidden className="relative flex size-2">
        {live && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 motion-reduce:hidden" />
        )}
        <span className="relative size-2 rounded-full bg-accent" />
      </span>
      {/* One span, so the gap only separates the dot from the words. */}
      <span>{children}</span>
    </p>
  );
}
