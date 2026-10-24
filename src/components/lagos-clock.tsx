"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

const getTime = () => format.format(new Date());
// The server can't know the visitor's "now"; render a placeholder there and
// fill it in on hydration.
const getServerTime = () => "--:--";

/** Live local time in Lagos, e.g. "Lagos 20:42". */
export function LagosClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return (
    <span className={className}>
      Lagos <time suppressHydrationWarning>{time}</time>
    </span>
  );
}
