import type { Metadata } from "next";
import Link from "next/link";
import { MissingPath } from "@/components/missing-path";
import { ArrowRight } from "@/components/icons";
import { Eyebrow, Panel } from "@/components/panel";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const ways = [
  { href: "/", label: "Home", note: "Who I am and what I build" },
  { href: "/work", label: "Work", note: "Every project, with case studies" },
  { href: "/about", label: "About", note: "Background, and what I’m looking for" },
];

/**
 * A lost visitor gets the path they asked for and three ways back, all on
 * the panel every page opens with.
 */
export default function NotFound() {
  return (
    <Panel as="section" aria-labelledby="not-found-title">
      <div className="shell grid gap-x-10 gap-y-12 pt-16 pb-14 md:pt-24 md:pb-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>404 · page not found</Eyebrow>
          <h1
            id="not-found-title"
            className="mt-8 max-w-[40rem] text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)] leading-[1.03] font-semibold tracking-[-0.045em] text-balance"
          >
            This page doesn&rsquo;t exist.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted">
            There&rsquo;s nothing at{" "}
            <code className="rounded-md bg-surface/80 px-1.5 py-0.5 font-mono text-[0.9375rem] break-all text-ink shadow-[inset_0_0_0_1px_rgb(32_33_31/0.07)]">
              <MissingPath />
            </code>
            . It may have moved when the site was redesigned.
          </p>
        </div>

        <ul className="overflow-hidden rounded-2xl bg-surface/90 shadow-[inset_0_0_0_1px_rgb(32_33_31/0.07)] lg:col-span-5">
          {ways.map((w) => (
            <li key={w.href} className="border-b border-line last:border-b-0">
              <Link
                href={w.href}
                className="group flex items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-ink/[0.025]"
              >
                <span>
                  <span className="block font-semibold tracking-[-0.015em]">{w.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{w.note}</span>
                </span>
                <ArrowRight className="nudge-out size-4 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
