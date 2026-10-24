/**
 * The site-wide section grid, borrowed from oyin.design: a mono label in the
 * left column (sticky on desktop), content in the right. On mobile the label
 * stacks above the content.
 */
export function Section({
  id,
  label,
  tone = "paper",
  children,
}: {
  id: string;
  /** Without the slashes — "02 Selected work" renders as `// 02 SELECTED WORK`. */
  label: string;
  tone?: "paper" | "ink";
  children: React.ReactNode;
}) {
  const headingId = `${id}-label`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={tone === "ink" ? "surface-ink" : undefined}
    >
      <div className="shell grid grid-cols-1 gap-x-6 gap-y-6 py-20 md:grid-cols-12 md:py-28">
        <h2
          id={headingId}
          className={`label-mono md:col-span-3 md:sticky md:top-28 md:self-start ${
            tone === "ink" ? "text-muted-on-ink" : "text-muted"
          }`}
        >
          {`// ${label}`}
        </h2>
        <div className="md:col-span-8 md:col-start-4">{children}</div>
      </div>
    </section>
  );
}
