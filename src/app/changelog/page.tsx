import type { Metadata } from "next";
import Link from "next/link";
import { changelog } from "@/data/changelog";
import { ChangelogList } from "@/components/changelog-list";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything I've shipped, built or started — newest first.",
  alternates: { canonical: "/changelog" },
};

/** The full archive, grouped by year. */
export default function ChangelogPage() {
  const years = Map.groupBy(changelog, (c) => c.month.slice(0, 4));

  return (
    <>
      <header className="bg-grid border-b border-line">
        <div className="shell pt-32 pb-14 md:pb-20 lg:pt-24">
          <Link href="/#changelog" className="label-mono text-muted hover:text-annot">
            ← Home
          </Link>
          <p className="label-mono mt-12 border-t-2 border-ink pt-3">
            Full changelog
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]">
            Everything shipped
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-muted md:text-2xl">
            {changelog.length} entries, newest first. Shipped means it&rsquo;s
            live; built means the code is public; started means it&rsquo;s in
            progress.
          </p>
        </div>
      </header>

      {[...years].map(([year, entries]) => (
        <section
          key={year}
          aria-labelledby={`y${year}`}
          className="shell grid grid-cols-1 gap-x-6 gap-y-6 py-14 md:grid-cols-12"
        >
          <h2
            id={`y${year}`}
            className="font-display text-4xl font-semibold tracking-tight md:sticky md:top-20 md:col-span-3 md:self-start"
          >
            {year}
          </h2>
          <div className="md:col-span-8 md:col-start-4">
            <ChangelogList entries={entries} />
          </div>
        </section>
      ))}
    </>
  );
}
