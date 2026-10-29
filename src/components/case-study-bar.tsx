"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";

type Heading = { id: string; text: string };

/**
 * The case study's own bar, Bambu-style: the project on the left, its
 * sections in the middle with the one being read marked, and the way out to
 * the live product on the right. It sticks under the site nav for the
 * length of the article. Sections are read from the write-up once it's
 * rendered, since the MDX owns them.
 */
export function CaseStudyBar({
  name,
  bodyId,
  action,
  className = "",
}: {
  name: string;
  bodyId: string;
  action?: { href: string; label: string };
  className?: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLHeadingElement>(`#${bodyId} h2[id]`)];
    // The headings only exist in the DOM, so they're read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(els.map((h) => ({ id: h.id, text: h.textContent ?? "" })));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      // The band sits just under both bars, where a jumped-to heading lands.
      { rootMargin: "-112px 0px -60% 0px" },
    );
    els.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [bodyId]);

  // On narrow screens the links scroll sideways: keep the current one in view.
  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>('[aria-current="location"]');
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  return (
    <div
      className={`sticky top-16 z-30 border-y border-line bg-canvas/85 backdrop-blur-md ${className}`}
    >
      <nav aria-label="Case study sections" className="shell flex h-12 items-center gap-6">
        <a
          href="#top"
          className="hidden shrink-0 text-[0.9375rem] font-semibold tracking-[-0.015em] md:block"
        >
          {name}
        </a>
        <ol
          ref={list}
          className="-mx-1 flex h-full min-w-0 flex-1 items-stretch gap-1 overflow-x-auto [scrollbar-width:none] md:justify-center"
        >
          {headings.map((h) => {
            const on = current === h.id;
            return (
              <li key={h.id} className="flex shrink-0">
                <a
                  href={`#${h.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`relative flex items-center px-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    on ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {h.text}
                  <span
                    aria-hidden
                    className={`absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-accent transition-opacity duration-200 ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary hidden shrink-0 sm:inline-flex"
          >
            {action.label}
            <ArrowUpRight className="nudge-out size-3.5 opacity-70" />
          </a>
        )}
      </nav>
    </div>
  );
}
