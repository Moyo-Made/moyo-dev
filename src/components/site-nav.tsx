"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { sections } from "@/data/sections";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The title bar: name on the left, a numbered index of every section, theme
 * and email on the right. On the home page the section being read is
 * highlighted. Below lg the index drops to a scrolling strip under the bar,
 * so every section stays one tap away without a menu to open.
 */
export function SiteNav() {
  const current = useCurrentSection();
  const stripRef = useRef<HTMLElement>(null);

  // Keep the highlighted section in view in the mobile strip. Scrolls only
  // the strip, never the page.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>("[aria-current]");
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [current]);

  const index = (
    <ol className="flex items-center gap-1">
      {sections.map((f, i) => {
        const active = current === f.id;
        return (
          <li key={f.id} className="shrink-0">
            <Link
              href={`/#${f.id}`}
              aria-current={active ? "location" : undefined}
              className={`label-mono flex items-baseline gap-1.5 px-2 py-1.5 transition-colors ${
                active ? "bg-mark text-on-mark" : "text-muted hover:text-ink"
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="shell flex h-12 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="font-display text-lg leading-none font-semibold tracking-tight"
        >
          {site.name}
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
