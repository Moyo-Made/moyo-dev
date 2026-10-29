import Link from "next/link";
import { services } from "@/data/services";
import { Statement } from "@/components/statement";
import { SectionLabel } from "@/components/panel";

/**
 * What a client can hire for. Four numbered cards, each with one line of
 * evidence from shipped work, so none of it is a promise alone.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <SectionLabel n={2}>Services</SectionLabel>
        <Statement id="services-title" title="What I can help with." className="mt-8">
          {
            "Early products and established ones. I’m most useful where the idea is clear and it needs someone to build it well."
          }
        </Statement>

        <ul className="mt-14 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="arrive relative rounded-[1.25rem] bg-surface p-7 shadow-[inset_0_0_0_1px_rgb(32_33_31/0.06)] md:p-9"
            >
              <p className="font-mono text-xs text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-pretty text-muted">
                {s.body}
              </p>
              <p className="mt-6 flex gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                <span>
                  <span className="text-ink">For example: </span>
                  {s.href ? (
                    <Link href={s.href} className="link">
                      {s.example}
                    </Link>
                  ) : (
                    s.example
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
