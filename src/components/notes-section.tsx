import { notes } from "@/data/notes";
import { Section } from "@/components/section";

const date = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `// 06 NOTES` — technical writing. Titles and dates do the work. */
export function NotesSection() {
  return (
    <Section id="notes" label="06 Notes">
      <ol className="border-t border-line">
        {notes.map((n) => (
          <li key={n.href} className="border-b border-line">
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-x-6 gap-y-1 py-6 transition-colors hover:bg-paper-2 md:grid-cols-[7rem_1fr_auto]"
            >
              <time dateTime={n.date} className="label-mono pt-1.5 text-muted">
                {date.format(new Date(n.date))}
              </time>
              <span className="font-serif text-2xl leading-snug text-pretty group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                {n.title}
              </span>
              <span className="label-mono pt-1.5 text-muted">
                {n.platform} ↗
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
