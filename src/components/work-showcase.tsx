"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { StageScreens } from "@/components/project-stage";
import { ArrowUpRight } from "@/components/icons";
import { Corners } from "@/components/panel";

export interface ShowcaseItem {
  slug: string;
  name: string;
  outcome: string;
  stack: string;
  domain?: string;
  live?: string;
  screens: ProjectImage[];
  highlights?: Project["highlights"];
}

/** How long each project stays on show before the page turns. */
const DURATION = 7000;
/** Matches the page-turn in globals.css. */
const TURN = 900;

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Selected work as one frame that turns between projects like pages. It
 * advances on its own while on screen (each tab's bar shows how long is
 * left) and stops for good once the visitor picks a project. Hovering or
 * focusing inside pauses it; with reduced motion it never advances and
 * pages swap without turning.
 */
export function WorkShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [chosen, setChosen] = useState(false);
  const [held, setHeld] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const turnTimer = useRef<number>(undefined);

  function go(i: number) {
    if (i === active) return;
    setLeaving(active);
    setActive(i);
    window.clearTimeout(turnTimer.current);
    turnTimer.current = window.setTimeout(() => setLeaving(null), TURN + 50);
  }

  function pick(i: number) {
    setChosen(true);
    go(i);
  }

  // Only run the clock while the showcase crosses the middle of the screen.
  // A margin rather than a ratio: the block is taller than most screens.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The hero's screens link to #work-<slug>: open that project.
  useEffect(() => {
    function fromHash() {
      const i = items.findIndex((p) => `#work-${p.slug}` === window.location.hash);
      if (i < 0) return;
      setChosen(true);
      setActive(i);
    }
    // Reading the URL is an external sync, so it happens after mount.
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  useEffect(() => () => window.clearTimeout(turnTimer.current), []);

  const autoplay = !chosen && !reduced;
  const running = autoplay && onScreen && !held;

  function onKeyDown(e: React.KeyboardEvent) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    let next: number | undefined;
    if (step) next = (active + step + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  }

  const p = items[active];

  return (
    <div
      ref={root}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      <div
        role="tablist"
        aria-label="Selected work"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 sm:gap-4"
      >
        {items.map((item, i) => {
          const on = i === active;
          const state = !on ? undefined : !autoplay ? "done" : running ? "true" : "paused";
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`showcase-tab-${item.slug}`}
              aria-selected={on}
              aria-controls="showcase-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => pick(i)}
              className="group text-left"
            >
              <span className="block h-0.5 overflow-hidden rounded-full bg-line">
                <span
                  key={on ? `on-${i}` : `off-${i}`}
                  data-running={state}
                  onAnimationEnd={() => {
                    if (on && autoplay) go((active + 1) % items.length);
                  }}
                  style={{ "--dur": `${DURATION}ms` } as React.CSSProperties}
                  className="tab-progress block h-full bg-ink"
                />
              </span>
              <span className="mt-3 flex items-baseline gap-2">
                <span className="hidden font-mono text-xs text-muted tabular-nums sm:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`truncate text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors sm:text-base ${
                    on ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {item.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${p.slug}`}
        className="mt-6 md:mt-8"
      >
        <Link href={`/work/${p.slug}`} tabIndex={-1} aria-hidden className="group relative block">
          <div className="turn-pages aspect-[5/4] sm:aspect-[16/10]">
            {items.map((item, i) => {
              // Screens load for the page on show, the one turning away and
              // the one up next, so a turn never waits but the rest wait
              // their turn. The section sits below the fold: nothing eager.
              const mounted = i === active || i === leaving || i === (active + 1) % items.length;
              return (
                <div
                  key={item.slug}
                  data-state={i === active ? "active" : i === leaving ? "leaving" : undefined}
                  className="turn-page stage grid items-center"
                >
                  {mounted && <StageScreens screens={item.screens} domain={item.domain} />}
                </div>
              );
            })}
          </div>
          <Corners inset={-6} />
        </Link>

        <div key={p.slug} className="swap mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-muted tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] md:text-[2.25rem]">
              {p.name}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-pretty text-muted">{p.outcome}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={`/work/${p.slug}`} className="btn btn-primary btn-sm">
                Read the case study
              </Link>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  Visit {p.domain}
                  <ArrowUpRight className="nudge-out size-4" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            {p.highlights && (
              <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {[
                  ["The problem", p.highlights.problem],
                  ["My role", p.highlights.role],
                  ["The hard part", p.highlights.challenge],
                  ["Outcome", p.highlights.outcome],
                ].map(([term, detail]) => (
                  <div key={term} className="border-t border-line pt-4">
                    <dt className="text-[0.9375rem] font-medium tracking-[-0.01em]">{term}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-muted">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-7 text-sm text-muted">Built with {p.stack}.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
