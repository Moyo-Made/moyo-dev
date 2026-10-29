import { Fragment } from "react";

/**
 * Text split into words that ink in as they rise up the screen, so a
 * statement fills in at reading pace. Pure CSS (`.ink-in` in globals.css);
 * without scroll-driven animation it's simply shown in its colour.
 */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="ink-in">{w}</span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}

/**
 * A section's opening statement: the title in ink and its context in grey,
 * running on as one sentence. `as="h1"` for a page's own title.
 */
export function Statement({
  id,
  title,
  children,
  as: Heading = "h2",
  className = "",
}: {
  id: string;
  /** Ends with a full stop: it reads as the first sentence. */
  title: string;
  children?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={`max-w-[50rem] text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.16] font-semibold tracking-[-0.032em] text-balance ${className}`}
    >
      <Heading id={id} className="inline">
        <Words text={title} />
      </Heading>
      {children && (
        <>
          {" "}
          <span className="text-muted">
            <Words text={children} />
          </span>
        </>
      )}
    </div>
  );
}
