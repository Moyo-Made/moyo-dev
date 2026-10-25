import Link from "next/link";
import { MissingPath } from "@/components/missing-path";

/** 404 as a terminal error — the build-log theme's version of a lost page. */
export default function NotFound() {
  return (
    <section className="bg-grid">
      <div className="shell flex min-h-svh flex-col justify-center pt-32 pb-16">
        <p className="label-mono border-t-2 border-ink pt-3">
          <span className="text-annot">404</span>
          <span aria-hidden className="text-muted">
            {" — "}
          </span>
          Not on this sheet
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]">
          Nothing shipped here.
        </h1>

        <div className="ticks mt-12 max-w-2xl bg-paper-2 p-6 font-mono text-sm leading-relaxed md:text-base">
          <p>
            <span className="text-annot">$</span> open <MissingPath />
          </p>
          <p className="text-muted">
            zsh: command not found: <MissingPath />
          </p>
          <p className="mt-4 text-muted">try one of these:</p>
          <ul className="mt-1 space-y-1">
            {[
              { cmd: "cd ~", href: "/", note: "home" },
              { cmd: "ls work", href: "/#work", note: "selected work" },
              { cmd: "git log", href: "/changelog", note: "everything shipped" },
            ].map((c) => (
              <li key={c.cmd}>
                <span className="text-annot">$</span>{" "}
                <Link
                  href={c.href}
                  className="underline decoration-line underline-offset-4 hover:text-annot hover:decoration-annot"
                >
                  {c.cmd}
                </Link>{" "}
                <span className="text-muted"># {c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
