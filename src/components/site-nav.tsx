"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { sections } from "@/data/sections";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The title bar: the M mark on the left, a numbered index of every section, theme
 * and email on the right. On the home page the section being read is
 * highlighted. Below lg the index drops to a scrolling strip under the bar,
 * so every section stays one tap away without a menu to open.
 */
export function SiteNav() {
  const current = useCurrentSection();
  const stripRef = useRef<HTMLElement>(null);

  // Keep the highlighted section in view in the mobile strip. Scrolls only
  // the strip, never the page. Measured on screen, since the link's offset
  // is relative to its own (positioned) <li>.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>("[aria-current]");
    if (!strip || !active) return;
    const left =
      active.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    strip.scrollTo({
      left: left - (strip.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [current]);

  const index = <SectionIndex current={current} />;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="shell flex h-12 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group relative grid size-8 place-items-center bg-ink font-display text-xl leading-none font-semibold text-paper transition-colors hover:bg-annot"
        >
          {/* The favicon's mark: a condensed M with the status square. */}
          <span aria-hidden>M</span>
          <span aria-hidden className="absolute right-0.5 bottom-0.5 size-[5px] bg-mark" />
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          {index}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.shortName}`}
            className="grid size-8 place-items-center hover:text-annot"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <rect x="3" y="5" width="18" height="14" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
          </a>
        </div>
      </div>

      <nav
        ref={stripRef}
        aria-label="Sections"
        className="relative overflow-x-auto border-t border-line [scrollbar-width:none] lg:hidden"
      >
        <div className="shell py-1">{index}</div>
      </nav>
    </header>
  );
}

/**
 * The numbered section links. The highlight is one block behind them that
 * slides and stretches from the old section to the new one, rather than a
 * background on each link. It fades in where it first lands and fades out
 * where it was, and jumps without sliding when the layout resizes.
 */
function SectionIndex({ current }: { current: string | null }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [mark, setMark] = useState({ x: 0, w: 0, shown: false, slide: false });

  // Measure the highlighted item against the list (each <li> is positioned,
  // so the link's own offset would be 0). Slides only between two sections,
  // so the first highlight doesn't sweep in from the left edge.
  const place = useCallback((slide: boolean) => {
    const active = listRef.current?.querySelector<HTMLElement>("[aria-current]")?.closest("li");
    setMark((prev) =>
      active
        ? { x: active.offsetLeft, w: active.offsetWidth, shown: true, slide: slide && prev.shown }
        : { ...prev, shown: false, slide: false },
    );
  }, []);

  useLayoutEffect(() => place(true), [current, place]);

  // Fonts loading, the window resizing, or the desktop index appearing at lg
  // all move the links; follow them without animating.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(list);
    return () => observer.disconnect();
  }, [place]);

  return (
    <ol ref={listRef} className="relative flex items-center gap-1">
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 bg-mark ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          mark.slide ? "transition-[translate,width,opacity] duration-300" : "transition-opacity duration-200"
        } ${mark.shown ? "opacity-100" : "opacity-0"}`}
        style={{ translate: `${mark.x}px`, width: mark.w }}
      />
      {sections.map((f, i) => {
        const active = current === f.id;
        return (
          <li key={f.id} className="relative shrink-0">
            <Link
              href={`/#${f.id}`}
              aria-current={active ? "location" : undefined}
              className={`label-mono flex items-baseline gap-1.5 px-2 py-1.5 transition-colors duration-300 ${
                active ? "text-on-mark" : "text-muted hover:text-ink"
              }`}
            >
              <span className={active ? undefined : "text-annot"}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {f.title}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The section crossing the upper third of the screen, on the home page only.
 * Null elsewhere, and before the first scroll event lands.
 */
function useCurrentSection() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      // A thin band a third of the way down the viewport.
      { rootMargin: "-33% 0px -66% 0px" },
    );
    for (const f of sections) {
      const el = document.getElementById(f.id);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      setCurrent(null);
    };
  }, [pathname]);

  return current;
}
