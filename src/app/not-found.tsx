import Link from "next/link";
import { MissingPath } from "@/components/missing-path";

/** 404 as a terminal error — the build-log theme's version of a lost page. */
export default function NotFound() {
  return (
    <section className="surface-ink">
      <div className="shell flex min-h-svh flex-col justify-center pt-28 pb-16">
        <p className="label-mono text-muted-on-ink">{"// 404"}</p>
        <h1 className="mt-6 font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
          Nothing shipped here.
        </h1>

        <div className="mt-12 max-w-2xl border border-ink-2 bg-ink-2/40 p-6 font-mono text-sm leading-relaxed md:text-base">
          <p>
            <span className="text-signal">$</span> open <MissingPath />
          </p>
          <p className="text-muted-on-ink">
            zsh: command not found: <MissingPath />
          </p>
          <p className="mt-4 text-muted-on-ink">try one of these:</p>
          <ul className="mt-1 space-y-1">
            {[
              { cmd: "cd ~", href: "/", note: "home" },
              { cmd: "ls work", href: "/#work", note: "selected work" },
              { cmd: "git log", href: "/changelog", note: "everything shipped" },
            ].map((c) => (
              <li key={c.cmd}>
                <span className="text-signal">$</span>{" "}
                <Link
                  href={c.href}
                  className="underline decoration-ink-2 underline-offset-4 hover:text-signal hover:decoration-signal"
                >
                  {c.cmd}
                </Link>{" "}
                <span className="text-muted-on-ink"># {c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
