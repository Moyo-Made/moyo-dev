"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const dark = () => window.matchMedia("(prefers-color-scheme: dark)");

/** The theme in effect: the saved pick on <html>, else the system's. */
function getTheme(): Theme {
  const picked = document.documentElement.dataset.theme;
  if (picked === "light" || picked === "dark") return picked;
  return dark().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  const media = dark();
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/**
 * Light (drafting paper) ↔ dark (blueprint). The pick is saved; until there
 * is one, the site follows the system. The script in layout.tsx applies a
 * saved pick before first paint.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // The server can't know the theme, so it renders a neutral label.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      className={`grid size-8 place-items-center hover:text-annot ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <circle cx="10" cy="10" r="7" />
        <path d="M10 3a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
    </button>
  );
}
