import Link from "next/link";
import { changelog } from "@/data/changelog";
import { Section } from "@/components/section";
import { ChangelogList } from "@/components/changelog-list";

const SHOWN = 8;

/** `04 — CHANGELOG`: the latest entries; the rest live on /changelog. */
export function ChangelogSection() {
  return (
    <Section id="changelog" caption={`Latest ${SHOWN} of ${changelog.length}`}>
      <ChangelogList entries={changelog.slice(0, SHOWN)} />
      <Link
        href="/changelog"
        className="label-mono mt-10 inline-block bg-ink px-4 py-3 text-paper transition-colors hover:bg-annot"
      >
        Full changelog — {changelog.length} entries →
      </Link>
    </Section>
  );
}
