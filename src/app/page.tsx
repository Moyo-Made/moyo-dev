import Link from "next/link";
import { site } from "@/data/site";
import { jobs, community } from "@/data/experience";
import { notes } from "@/data/notes";
import { changelog } from "@/data/changelog";
import { featuredProjects, alsoBuilt } from "@/lib/projects";
import { Section } from "@/components/section";

// Step 2: the shell is real (grid, labels, nav, footer); the content inside
// each section is still the plain Step 1 rendering. Steps 3–6 design each one.
export default function Home() {
  return (
    <>
      {/* Hero placeholder — designed in Step 3. */}
      <section className="surface-ink">
        <div className="shell flex min-h-svh flex-col justify-center pt-24 pb-16">
          <p className="label-mono text-muted-on-ink">{"// NOW SHIPPING"}</p>
          <h1 className="mt-6 font-serif text-6xl leading-none tracking-tight md:text-8xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-on-ink md:text-xl">
            {site.tagline}
          </p>
        </div>
      </section>

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
