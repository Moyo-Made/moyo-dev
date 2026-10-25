import Link from "next/link";
import { site } from "@/data/site";
import { getLastShipped } from "@/lib/github";
import { LagosClock } from "@/components/lagos-clock";
import { RelativeTime } from "@/components/relative-time";

/**
 * The ten-second answer to who, what, and where's the proof. Name, then the
 * role as the headline, then the problem solved with a link to the evidence.
 * Three numbered callouts (where, last shipped,
 * availability) are leadered off it like annotations on a drawing; on small
 * screens they stack underneath.
 */
export async function Hero() {
  const lastShipped = await getLastShipped();
  // The changelog fallback only knows the month.
  const isMonth = /^\d{4}-\d{2}$/.test(lastShipped.at);

  const callouts = [
    {
      term: "Location",
      detail: (
        <>
          {site.location}
          <span className="label-mono mt-1 block text-muted">
            <LagosClock /> WAT
          </span>
        </>
      ),
    },
    {
      term: "Last shipped",
      detail: (
        <>
          <a
            href={lastShipped.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-base break-all underline decoration-line underline-offset-4 hover:decoration-annot"
          >
            {lastShipped.name}
          </a>
          <span className="label-mono mt-1 block text-muted">
            {isMonth ? (
              <time dateTime={lastShipped.at}>{lastShipped.at}</time>
            ) : (
              <RelativeTime iso={lastShipped.at} />
            )}
          </span>
        </>
      ),
    },
    {
      term: "Status",
      detail: site.availableForRoles ? (
        <span className="bg-mark px-1.5 text-on-mark">Available for roles</span>
      ) : (
        "Heads-down building"
      ),
    },
  ];

  return (
    <section aria-labelledby="hero-name" className="bg-grid border-b border-line">
      <div className="shell flex min-h-svh flex-col pt-32 pb-10 lg:pt-24">
        <div className="grid flex-1 content-center gap-x-6 gap-y-14 py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 id="hero-name" className="settle">
              <span className="label-mono block text-muted">{site.name}</span>
              <span className="mt-4 block font-display text-[clamp(3.25rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.025em] text-balance">
                {site.role}
              </span>
            </h1>
            <p
              className="settle mt-6 max-w-xl text-xl leading-snug text-pretty text-muted md:text-2xl"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              {site.tagline} Most recently:{" "}
              <Link
                href={site.proof.href}
                className="text-ink underline decoration-annot underline-offset-4 hover:text-annot"
              >
                {site.proof.text}
              </Link>
              .
            </p>

            <div
              className="settle mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              <a
                href="#work"
                className="label-mono inline-flex items-center gap-3 bg-ink px-5 py-4 text-paper transition-colors hover:bg-annot"
              >
                Read the work <span aria-hidden>↓</span>
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono underline decoration-line underline-offset-8 transition-colors hover:text-annot hover:decoration-annot"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <dl className="space-y-8 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-line lg:pl-6">
            {callouts.map((c, i) => (
              <div
                key={c.term}
                className="settle relative"
                style={{ "--d": `${400 + i * 120}ms` } as React.CSSProperties}
              >
                {/* The leader runs back toward the headline. */}
                <span
                  aria-hidden
                  className="draw-x absolute top-2.5 right-full mr-2 hidden w-20 origin-right items-center text-annot lg:flex"
                  style={{ "--d": `${500 + i * 120}ms` } as React.CSSProperties}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-current" />
                  <span className="leader-x flex-1" />
                </span>
                <dt className="label-mono flex items-center gap-2 text-annot">
                  <span
                    aria-hidden
                    className="grid size-5 place-items-center rounded-full border border-current text-[0.625rem] tracking-normal"
                  >
                    {i + 1}
                  </span>
                  {c.term}
                </dt>
                <dd className="mt-2 text-lg leading-snug">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
