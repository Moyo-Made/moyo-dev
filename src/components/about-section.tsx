import Link from "next/link";
import { SectionLabel } from "@/components/panel";
import { ArrowRight } from "@/components/icons";

/**
 * The human part of the home page, kept short; /about has the rest. There's
 * no portrait yet, so the copy takes the space one would.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="shell py-24 md:py-32">
        <SectionLabel n={5}>About</SectionLabel>
        <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <h2
            id="about-title"
            className="arrive text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.08] font-semibold tracking-[-0.035em] lg:col-span-4"
          >
            About me
          </h2>
          <div className="arrive lg:col-span-7 lg:col-start-6">
            <div className="max-w-[36rem] space-y-5 text-lg leading-relaxed text-pretty text-muted">
              <p>
                I&rsquo;m a software engineer in Lagos, Nigeria. I&rsquo;ve built insurance cards
                for Apple Wallet, ticketing for a 4,000-person conference, and a marketplace that
                moves money between brands and creators.
              </p>
              <p>
                What keeps me interested is the space between an idea and the thing people use:
                working out what a product really needs to do, then making it work properly,
                including the parts nobody sees.
              </p>
              <p>
                I&rsquo;m now learning machine learning in depth, training models rather than only
                calling them, and writing about it as I go.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors hover:text-accent-ink"
            >
              More about me
              <ArrowRight className="nudge-out size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
