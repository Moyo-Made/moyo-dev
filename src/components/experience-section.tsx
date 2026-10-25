import { community, jobs, type Role } from "@/data/experience";
import { Section } from "@/components/section";

/** `03 — EXPERIENCE`: dates, role, impact, tags. Built for a 30-second scan. */
export function ExperienceSection() {
  return (
    <Section id="experience" caption={`${jobs.length} roles · ${community.length} community`}>
      <RoleTable roles={jobs} />
      <h3 className="label-mono mt-20">Community</h3>
      <RoleTable roles={community} compact />
    </Section>
  );
}

function RoleTable({ roles, compact }: { roles: Role[]; compact?: boolean }) {
  return (
    <div className={compact ? "mt-6" : undefined}>
      <div
        aria-hidden
        className="label-mono hidden grid-cols-[11rem_1fr] gap-x-6 border-b-2 border-ink pb-2 text-muted md:grid"
      >
        <span>Period</span>
        <span>Role · Organisation</span>
      </div>
      <ol className="border-t-2 border-ink md:border-t-0">
        {roles.map((r) => (
          <li
            key={`${r.org}-${r.role}`}
            className="grid gap-x-6 gap-y-2 border-b border-line py-7 md:grid-cols-[11rem_1fr]"
          >
            <p className="label-mono pt-2 text-muted">{r.period}</p>
            <div>
              <h4
                className={`font-display leading-tight font-semibold tracking-tight ${
                  compact ? "text-xl" : "text-2xl"
                }`}
              >
                {r.role}
                <span className="text-muted"> · </span>
                <span className="text-annot">{r.org}</span>
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
    </div>
  );
}
