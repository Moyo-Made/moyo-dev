import Link from "next/link";
import { changelog } from "@/data/changelog";
import { Section } from "@/components/section";
import { ChangelogList } from "@/components/changelog-list";

const SHOWN = 8;

/** `// 04 CHANGELOG` — the latest entries; the rest live on /changelog. */
export function ChangelogSection() {
  return (
    <Section id="changelog" label="04 Changelog">
      <ChangelogList entries={changelog.slice(0, SHOWN)} />
      <Link
        href="/changelog"
        className="label-mono mt-10 inline-block underline decoration-signal decoration-2 underline-offset-8 hover:text-muted"
      >
        Full changelog — {changelog.length} entries →
      </Link>
    </Section>
  );
}
