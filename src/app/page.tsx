import Link from "next/link";
import { site } from "@/data/site";
import { jobs, community } from "@/data/experience";
import { notes } from "@/data/notes";
import { changelog } from "@/data/changelog";
import { featuredProjects, alsoBuilt } from "@/lib/projects";

// Step 1 placeholder: every section of the home page, rendered straight from
// the data files with no styling. Step 2 onwards replaces this section by
// section with the real design.
export default function Home() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>{site.tagline}</p>

      <h2>{"// 02 Selected work"}</h2>
      <ul>
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <strong>
              {p.caseStudy ? <Link href={`/work/${p.slug}`}>{p.title}</Link> : p.title}
            </strong>{" "}
            ({p.year}) — {p.outcome} [{p.stack.join(", ")}]
          </li>
        ))}
      </ul>
      <h3>Also built</h3>
      <ul>
        {alsoBuilt.map((p) => (
          <li key={p.slug}>
            {p.title} — {p.outcome}
          </li>
        ))}
      </ul>

      <h2>{"// 03 Experience"}</h2>
      <ul>
        {[...jobs, ...community].map((r) => (
          <li key={`${r.org}-${r.role}`}>
            {r.period} · {r.role} @ {r.org} — {r.impact}
          </li>
        ))}
      </ul>

      <h2>{"// 04 Changelog"}</h2>
      <ul>
        {changelog.map((c) => (
          <li key={`${c.month}-${c.name}`}>
            {c.month} {c.action} {c.name} {c.note && `— ${c.note}`}
          </li>
        ))}
      </ul>

      <h2>{"// 06 Notes"}</h2>
      <ul>
        {notes.map((n) => (
          <li key={n.href}>
            {n.date} · <a href={n.href}>{n.title}</a> ({n.platform})
          </li>
        ))}
      </ul>
    </main>
  );
}
