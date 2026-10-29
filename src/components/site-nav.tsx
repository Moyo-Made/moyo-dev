"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const links = [
  { key: "work", label: "Work", href: "/#work" },
  { key: "about", label: "About", href: "/about" },
  { key: "writing", label: "Writing", href: "/#writing" },
] as const;

type LinkKey = (typeof links)[number]["key"];

/**
 * A quiet sticky bar: clear over the top of the page, frosted with a
 * hairline once it scrolls. On wide screens a soft pill slides to where
 * you are; below md the links fold into a menu that overlays the page.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const section = useHomeSection(pathname === "/");

  const current: LinkKey | null =
    pathname === "/"
      ? section
      : pathname.startsWith("/work")
        ? "work"
        : pathname.startsWith("/about")
          ? "about"
          : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; so does growing past the breakpoint it lives at.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 48rem)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-line bg-canvas/85 backdrop-blur-md backdrop-saturate-150" : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[1.0625rem] font-semibold tracking-[-0.03em]"
          aria-label="moyomade — home"
        >
          moyomade<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
          <LinkList current={current} />
          <a href="#contact" className="btn btn-sm btn-primary ml-2">
            Let&rsquo;s talk
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid size-10 place-items-center rounded-lg md:hidden"
        >
          <span aria-hidden className="relative block h-3 w-[18px]">
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-soft ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-soft ${
                open ? "top-[5px] -rotate-45" : "top-[10px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Overlays the page rather than pushing it down, so closing it mid
          scroll can't shift where an anchor lands. */}
      <div
        id="site-menu"
        data-open={open}
        className="menu-panel absolute inset-x-0 top-full border-b border-line bg-canvas shadow-[0_16px_32px_-16px_rgb(32_33_31/0.18)] md:hidden"
      >
        <nav aria-label="Main" className="min-h-0 overflow-hidden">
          <ul className="shell pt-2 pb-6">
            {links.map((l) => (
              <li key={l.key} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === l.key ? "location" : undefined}
                  className="flex items-center justify-between py-4 text-2xl font-medium tracking-[-0.025em]"
                >
                  {l.label}
                  {current === l.key && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Let&rsquo;s talk
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/**
 * The desktop links. The highlight is one pill behind them that slides from
 * the old place to the new; it fades in where it first lands.
 */
function LinkList({ current }: { current: LinkKey | null }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, shown: false, slide: false });

  // Measured from the <li>: it's positioned, so the link's own offset is 0.
  const place = useCallback((slide: boolean) => {
    const active = listRef.current?.querySelector("[aria-current]")?.closest("li");
    setPill((prev) =>
      active
        ? { x: active.offsetLeft, w: active.offsetWidth, shown: true, slide: slide && prev.shown }
        : { ...prev, shown: false, slide: false },
    );
  }, []);

  useLayoutEffect(() => place(true), [current, place]);

  // Fonts loading or the window resizing move the links; follow without sliding.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(list);
    return () => observer.disconnect();
  }, [place]);

  return (
    <ul ref={listRef} className="relative flex items-center">
      <li
        aria-hidden
        className={`absolute inset-y-0 left-0 rounded-lg bg-ink/[0.055] ease-soft ${
          pill.slide ? "transition-[translate,width,opacity] duration-300" : "transition-opacity duration-200"
        } ${pill.shown ? "opacity-100" : "opacity-0"}`}
        style={{ translate: `${pill.x}px`, width: pill.w }}
      />
      {links.map((l) => (
        <li key={l.key} className="relative">
          <Link
            href={l.href}
            aria-current={current === l.key ? "location" : undefined}
            className={`block rounded-lg px-3 py-1.5 text-[0.9375rem] transition-colors duration-200 ${
              current === l.key ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** On the home page, the linked section crossing a band a third of the way down. */
function useHomeSection(active: boolean) {
  const [current, setCurrent] = useState<LinkKey | null>(null);

  useEffect(() => {
    if (!active) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id as LinkKey;
          if (e.isIntersecting) setCurrent(id);
          else setCurrent((c) => (c === id ? null : c));
        }
      },
      { rootMargin: "-33% 0px -60% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.key);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      setCurrent(null);
    };
  }, [active]);

  return current;
}
