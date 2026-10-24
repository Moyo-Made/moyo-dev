"use client";

import { useEffect, useRef, useState } from "react";
import { buildSteps } from "@/data/process";

/**
 * Four numbered steps; the one crossing the middle of the screen lights up,
 * after oyin.design's process section. Unlike Oyin's, inactive steps stay at
 * readable contrast (muted, not faded) — the active one turns ink and gets
 * the yellow marker. Without JavaScript every step simply shows at full ink.
 */
export function ProcessSteps() {
  const [active, setActive] = useState<number | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="border-t border-line">
      {buildSteps.map((step, i) => {
        const lit = active === null || active === i;
        return (
          <li
            key={step.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="relative grid gap-x-6 gap-y-2 border-b border-line py-8 pl-4 md:grid-cols-[3rem_12rem_1fr] md:pl-0"
          >
            <span
              aria-hidden
              className={`absolute top-0 -left-px h-full w-0.5 bg-signal transition-opacity duration-300 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className="label-mono pt-2 text-muted md:pl-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-serif text-3xl leading-none transition-colors duration-300 md:text-4xl ${
                lit ? "text-ink" : "text-muted"
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`max-w-[52ch] pt-1 leading-relaxed transition-colors duration-300 ${
                lit ? "text-ink" : "text-muted"
              }`}
            >
              {step.body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
