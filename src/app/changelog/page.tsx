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
      <header className="surface-ink">
        <div className="shell pt-36 pb-16 md:pb-24">
          <Link
            href="/#changelog"
            className="label-mono text-muted-on-ink hover:text-paper"
          >
            ← Home
          </Link>
          <p className="label-mono mt-12 text-muted-on-ink">{"// CHANGELOG"}</p>
          <h1 className="mt-5 font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight">
            Everything shipped
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-muted-on-ink md:text-2xl">
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
            className="font-serif text-4xl md:sticky md:top-28 md:col-span-3 md:self-start"
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
