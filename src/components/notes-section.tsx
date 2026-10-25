import { notes } from "@/data/notes";
import { Section } from "@/components/section";

const date = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `05 — WRITING`: technical writing, as a table. Titles and dates do the work. */
export function NotesSection() {
  return (
    <Section id="writing" caption={`${notes.length} articles`}>
      <div
        aria-hidden
        className="label-mono hidden grid-cols-[7rem_1fr_auto] gap-x-6 border-b-2 border-ink pb-2 text-muted md:grid"
      >
        <span>Date</span>
        <span>Title</span>
        <span>Platform</span>
      </div>
      <ol className="border-t-2 border-ink md:border-t-0">
        {notes.map((n) => (
          <li key={n.href} className="border-b border-line">
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-x-6 gap-y-1 py-6 transition-colors hover:bg-paper-2 md:grid-cols-[7rem_1fr_auto]"
            >
              <time dateTime={n.date} className="label-mono pt-2 text-muted">
                {date.format(new Date(n.date))}
              </time>
              <span className="font-display text-2xl leading-snug font-semibold tracking-tight text-pretty group-hover:underline group-hover:decoration-annot group-hover:decoration-2 group-hover:underline-offset-4">
                {n.title}
              </span>
              <span className="label-mono pt-2 text-muted">
                {n.platform} <span className="text-annot">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
