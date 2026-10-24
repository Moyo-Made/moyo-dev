import { Fragment } from "react";
import { site } from "@/data/site";
import { getLastShipped } from "@/lib/github";
import { LagosClock } from "@/components/lagos-clock";
import { RelativeTime } from "@/components/relative-time";

/**
 * `// NOW SHIPPING` — the ten-second answer to who, what, and where's the
 * proof. After oyin.design's "Now showing" hero, with its bottom status row
 * turned into a build status bar.
 */
export async function Hero() {
  const lastShipped = await getLastShipped();
  // The changelog fallback only knows the month.
  const isMonth = /^\d{4}-\d{2}$/.test(lastShipped.at);

  return (
    <section aria-labelledby="hero-name" className="surface-ink">
      <div className="shell flex min-h-svh flex-col pt-28">
        <div className="flex flex-1 flex-col justify-center py-12">
          <p className="label-mono text-muted-on-ink">{"// NOW SHIPPING"}</p>

          <h1
            id="hero-name"
            aria-label={site.name}
            className="mt-6 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-tight"
          >
            <SplitLetters text={site.name} />
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-snug text-muted-on-ink md:text-2xl">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#work"
              className="label-mono inline-flex items-center gap-3 bg-signal px-5 py-4 text-ink transition-colors hover:bg-paper"
            >
              Read the work <span aria-hidden>↓</span>
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="label-mono text-muted-on-ink underline decoration-ink-2 underline-offset-8 transition-colors hover:text-paper hover:decoration-signal"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Status bar */}
        <dl className="label-mono grid grid-cols-1 gap-3 border-t border-ink-2 py-5 text-muted-on-ink sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
          <div>
            <dt className="sr-only">Status</dt>
            <dd className="flex items-center gap-2.5 text-paper">
              <span
                aria-hidden
                className={`relative grid size-2 place-items-center ${
                  site.availableForRoles ? "text-signal" : "text-muted-on-ink"
                }`}
              >
                {site.availableForRoles && (
                  <span className="absolute size-2 rounded-full bg-current opacity-60 motion-safe:animate-ping" />
                )}
                <span className="size-2 rounded-full bg-current" />
              </span>
              {site.availableForRoles ? "Available for roles" : "Heads-down building"}
            </dd>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <dt className="shrink-0">Last shipped</dt>
            <dd className="flex min-w-0 items-center gap-2">
              <a
                href={lastShipped.href}
                target="_blank"
                rel="noreferrer"
                className="truncate text-paper normal-case tracking-normal hover:text-signal"
              >
                {lastShipped.name}
              </a>
              <span aria-hidden>·</span>
              {isMonth ? (
                <time dateTime={lastShipped.at}>{lastShipped.at}</time>
              ) : (
                <RelativeTime iso={lastShipped.at} />
              )}
            </dd>
          </div>

          <div>
            <dt className="sr-only">Local time</dt>
            <dd>
              <LagosClock />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/**
 * The name rises in letter by letter on load. Screen readers get the
 * h1's aria-label instead of 17 separate letters; reduced motion skips it.
 */
function SplitLetters({ text }: { text: string }) {
  return (
    <span aria-hidden>
      {text.split(" ").map((word, w, words) => (
        // The space sits between word wrappers, not inside them: a trailing
        // space inside an inline-block collapses, and the name couldn't wrap.
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {[...word].map((char, i) => {
              const index = words.slice(0, w).join("").length + i;
              return (
                <span
                  key={i}
                  className="letter-rise inline-block"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
