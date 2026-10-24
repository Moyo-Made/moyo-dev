"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { LagosClock } from "@/components/lagos-clock";

export const navLinks = [
  { href: "/#readme", label: "README" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#changelog", label: "Changelog" },
  { href: "/#process", label: "How I build" },
  { href: "/#notes", label: "Notes" },
  // The footer's label is `// EXIT 0`, so Contact is numbered 00.
  { href: "/#contact", label: "Contact", number: "00" },
];

/**
 * Floating ink bar — email on the left, monogram in the middle, menu on the
 * right — over a full-screen ink menu, after oyin.design. Email is always one
 * click away.
 *
 * The menu is a disclosure, not a modal: while it's open the rest of the page
 * (#page) is made inert, so Tab moves only through the bar and the menu.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const page = document.getElementById("page");
    if (!open) return;

    if (page) page.inert = true;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      if (page) page.inert = false;
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="surface-ink">
      <div className="fixed inset-x-4 top-4 z-50 mx-auto flex h-14 max-w-md items-center justify-between rounded-sm bg-ink px-4 text-paper shadow-[0_8px_24px_-12px_rgb(0_0_0/0.5)]">
        <a
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.shortName}`}
          className="grid size-9 place-items-center rounded-sm hover:text-signal"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <path d="m3.5 6 8.5 7 8.5-7" />
          </svg>
        </a>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} — home`}
          className="font-serif text-2xl leading-none"
        >
          M<span className="text-signal">/</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="group grid size-9 place-items-center rounded-sm hover:text-signal"
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="site-menu"
        aria-label="Site"
        // Visibility flips instantly on open (so the first link can take
        // focus straight away) and fades out with the opacity on close.
        className={`fixed inset-0 z-40 flex flex-col bg-ink pt-28 duration-300 ${
          open
            ? "visible opacity-100 transition-opacity"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <ol className="shell flex-1">
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex items-baseline gap-4 md:gap-6">
              <span className="label-mono w-6 text-muted-on-ink">
                {link.number ?? String(i + 1).padStart(2, "0")}
              </span>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-5xl leading-[1.1] hover:text-signal md:text-7xl"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="shell label-mono flex flex-wrap justify-between gap-4 border-t border-ink-2 py-6 text-muted-on-ink">
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
          <LagosClock />
        </div>
      </nav>
    </header>
  );
}
