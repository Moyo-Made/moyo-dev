import Link from "next/link";
import { jobs, community } from "@/data/experience";
import { notes } from "@/data/notes";
import { changelog } from "@/data/changelog";
import { featuredProjects, alsoBuilt } from "@/lib/projects";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { ReadmeSection } from "@/components/readme-section";

// Shell, hero and README are real; the content inside the remaining sections
// is still the plain Step 1 rendering. Steps 5–6 design each one.
export default function Home() {
  return (
    <>
      <Hero />
      <ReadmeSection />

      <Section id="work" label="02 Selected work">
        <ul className="space-y-3">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <strong>
                {p.caseStudy ? (
                  <Link href={`/work/${p.slug}`} className="underline">
                    {p.title}
                  </Link>
                ) : (
                  p.title
                )}
              </strong>{" "}
              ({p.year}) — {p.outcome}
            </li>
          ))}
        </ul>
        <h3 className="label-mono mt-10 text-muted">Also built</h3>
        <ul className="mt-3 space-y-2">
          {alsoBuilt.map((p) => (
            <li key={p.slug}>
              {p.title} — {p.outcome}
            </li>
          ))}
        </ul>
      </Section>

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
