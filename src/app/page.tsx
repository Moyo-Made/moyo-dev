import { jobs, community } from "@/data/experience";
import { notes } from "@/data/notes";
import { changelog } from "@/data/changelog";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { ReadmeSection } from "@/components/readme-section";
import { WorkSection } from "@/components/work-section";

// Hero, README and Selected work are designed; Experience, Changelog and
// Notes are still the plain Step 1 rendering until Step 6.
export default function Home() {
  return (
    <>
      <Hero />
      <ReadmeSection />

      <WorkSection />

      <Section id="experience" label="03 Experience">
        <ul className="space-y-3">
          {[...jobs, ...community].map((r) => (
            <li key={`${r.org}-${r.role}`}>
              {r.period} · {r.role} @ {r.org} — {r.impact}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="changelog" label="04 Changelog">
        <ul className="space-y-1 font-mono text-sm">
          {changelog.map((c) => (
            <li key={`${c.month}-${c.name}`}>
              {c.month} {c.action} {c.name} {c.note && `— ${c.note}`}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="notes" label="06 Notes">
        <ul className="space-y-2">
          {notes.map((n) => (
            <li key={n.href}>
              {n.date} · <a href={n.href} className="underline">{n.title}</a> ({n.platform})
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
