import { experience } from "@/data/experience";

/**
 * Where the work happened, straight after the hero: names set as text, not
 * logos, so nothing reads as an endorsement. The industries under each name
 * back up the hero's "AI, marketplaces, fintech, and logistics".
 */
export function WorkedWith() {
  return (
    <section aria-labelledby="worked-with-title" className="shell pt-16 md:pt-24">
      <h2 id="worked-with-title" className="text-sm text-muted">
        Teams I&rsquo;ve built software with
      </h2>
      <ul className="strip arrive mt-5 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {experience.map((e) => (
          <li key={e.org} className="bg-canvas">
            <p className="text-[1.0625rem] font-semibold tracking-[-0.02em]">{e.org}</p>
            <p className="mt-1 text-sm text-muted">{e.sector}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
