"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * The path the visitor asked for. not-found.tsx gets no props and is
 * prerendered, so the server can't know it — the browser fills it in.
 */
export function MissingPath() {
  const path = useSyncExternalStore(
    noop,
    () => decodeURIComponent(window.location.pathname),
    () => "this page",
  );
  return <span suppressHydrationWarning>{path}</span>;
}
