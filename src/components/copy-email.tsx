"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Check, Copy } from "@/components/icons";

/** Copies the address and says so, in place, for two seconds. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied): the mailto still works.
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-secondary">
      <span className="relative grid size-4 place-items-center">
        <Copy
          className={`absolute size-4 transition-[opacity,scale] duration-200 ${copied ? "scale-50 opacity-0" : ""}`}
        />
        <Check
          className={`absolute size-4 text-accent-ink transition-[opacity,scale] duration-200 ${copied ? "" : "scale-50 opacity-0"}`}
        />
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
