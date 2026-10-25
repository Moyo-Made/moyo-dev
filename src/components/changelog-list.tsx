import type { Action, ChangelogEntry } from "@/data/changelog";

/**
 * The changelog as a git log: a rail down the left with one commit dot per
 * entry. The dot shows the kind of change — highlighter yellow for shipped,
 * ink for built, hollow for started — and the action is also written out, so
 * colour is never the only signal.
 */
const dot: Record<Action, string> = {
  shipped: "bg-mark border-ink",
  built: "bg-ink border-ink",
  started: "bg-paper border-ink",
};

export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <ol className="relative border-l border-line">
      {entries.map((c) => (
        <li
          key={`${c.month}-${c.name}`}
          className="relative grid grid-cols-[4.5rem_1fr] gap-x-5 gap-y-1 py-3 pl-6 font-mono text-sm sm:grid-cols-[4.5rem_4.5rem_1fr]"
        >
          <span
            aria-hidden
            className={`absolute top-[1.1rem] -left-[5px] size-[9px] rounded-full border ${dot[c.action]}`}
          />
          <time dateTime={c.month} className="text-muted">
            {c.month}
          </time>
          <span className="text-muted">{c.action}</span>
          <span className="col-span-2 min-w-0 sm:col-span-1">
            {c.href ? (
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="break-words underline decoration-line underline-offset-4 hover:decoration-annot hover:decoration-2"
              >
                {c.name}
              </a>
            ) : (
              c.name
            )}
            {c.note && (
              <span className="mt-0.5 block font-sans text-[0.95rem] text-muted">
                {c.note}
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
