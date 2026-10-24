"use client";

import { useSyncExternalStore } from "react";

const DAY = 86_400_000;

const absolute = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function relative(then: Date, now: number) {
  const days = Math.floor((now - then.getTime()) / DAY);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
};

/**
 * "2d ago", worked out in the visitor's browser. The page is prerendered and
 * only refreshed daily, so a server-computed "2d ago" would drift; the server
 * renders the absolute date instead and the browser swaps in the relative one.
 */
export function RelativeTime({ iso }: { iso: string }) {
  const then = new Date(iso);
  const text = useSyncExternalStore(
    subscribe,
    () => relative(then, Date.now()),
    () => absolute.format(then),
  );
  return (
    <time dateTime={iso} title={absolute.format(then)} suppressHydrationWarning>
      {text}
    </time>
  );
}
