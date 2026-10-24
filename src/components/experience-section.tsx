import { community, jobs, type Role } from "@/data/experience";
import { Section } from "@/components/section";

/** `// 03 EXPERIENCE` — dates, role, impact, tags. Built for a 30-second scan. */
export function ExperienceSection() {
  return (
    <Section id="experience" label="03 Experience">
      <RoleList roles={jobs} />
      <h3 className="label-mono mt-20 text-muted">Community</h3>
      <RoleList roles={community} compact />
    </Section>
  );
}

function RoleList({ roles, compact }: { roles: Role[]; compact?: boolean }) {
  return (
    <ol className={`border-t border-line ${compact ? "mt-6" : ""}`}>
      {roles.map((r) => (
        <li
          key={`${r.org}-${r.role}`}
          className="grid gap-x-6 gap-y-2 border-b border-line py-7 md:grid-cols-[11rem_1fr]"
        >
          <p className="label-mono pt-1.5 text-muted">{r.period}</p>
          <div>
            <h4 className={compact ? "text-lg" : "text-xl"}>
              <span className="font-medium">{r.role}</span>
              <span className="text-muted"> · </span>
              <span className="font-serif text-[1.15em]">{r.org}</span>
            </h4>
            <p className="mt-2 max-w-[62ch] leading-relaxed text-pretty">
              {r.impact}
            </p>
            <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <li
                  key={t}
                  className="label-mono border border-line px-2 py-1 text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
