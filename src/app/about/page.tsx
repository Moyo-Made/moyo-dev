import type { Metadata } from "next";
import Link from "next/link";
import { community } from "@/data/experience";
import { mailto, site } from "@/data/site";
import { mlProjects } from "@/lib/projects";
import { Statement } from "@/components/statement";
import { ExperienceList } from "@/components/experience-section";
import { ArrowUpRight } from "@/components/icons";
import { Eyebrow, Panel, SectionLabel } from "@/components/panel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Moyomade Adegbite is a software engineer in Lagos, Nigeria, building web products end to end for founders and teams, and learning machine learning properly.",
  alternates: { canonical: "/about" },
};

/** A titled, numbered block: heading on the left, content on the right on wide screens. */
function Block({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="arrive grid gap-x-10 gap-y-6 border-t border-line py-14 first:border-t-0 md:py-20 lg:grid-cols-12"
    >
      <div className="lg:col-span-4">
        <p aria-hidden className="font-mono text-xs text-accent-ink tabular-nums">
          {String(n).padStart(2, "0")}
        </p>
        <h2 id={id} className="mt-3 text-2xl font-semibold tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">{children}</div>
    </section>
  );
}

const prose = "max-w-[38rem] space-y-5 text-[1.0625rem] leading-[1.75] text-pretty";

/**
 * The longer story: background, how I work, what I'm learning, community,
 * and what I'm looking for. Professional first; personal where it explains
 * the work.
 */
export default function About() {
  return (
    <>
      <Panel as="header">
        <div className="shell pt-16 pb-12 md:pt-24 md:pb-16">
          <Eyebrow live>
            {site.location} · {site.timeZone}
            <span className="hidden sm:inline"> · open to freelance and remote roles</span>
          </Eyebrow>
          <Statement id="about-title" as="h1" title="About me." className="mt-8">
            {
              "I build web products end to end, and I care as much about what a product needs to do as about the code underneath it."
            }
          </Statement>
        </div>
      </Panel>

      <div className="shell pt-10 pb-8 md:pt-16">
        <Block n={1} id="background" title="Background">
          <div className={prose}>
            <p>
              I&rsquo;m {site.name}, a software engineer based in {site.location}. I started on the
              frontend and grew outward from it. Today I build whole products, from the data model
              and payments to the screens people use.
            </p>
            <p>
              That has meant moving insurance cards into Apple and Google Wallet at Laferla,
              building the ticket flow for DevFest Lagos&rsquo;s 4,000+ attendees, building{" "}
              <Link href="/work/social-shake" className="link">
                Social Shake
              </Link>{" "}
              end to end for an Australian client, and taking{" "}
              <Link href="/work/gixel" className="link">
                Gixel
              </Link>{" "}
              from an iOS-only app to the web. I&rsquo;m now a frontend engineer at Straqa, working
              on logistics software for African businesses.
            </p>
          </div>
        </Block>

        <Block n={2} id="approach" title="How I approach the work">
          <div className={prose}>
            <p>
              I try to understand the problem before writing code, because the stated requirement is
              rarely the real one. Social Shake was pitched as a marketplace; the real problem was
              trust, so the product holds a brand&rsquo;s payment and only charges it when they
              approve the video.
            </p>
            <p>
              From there it&rsquo;s scope, then building it properly: usable, fast and maintainable
              from the start, and tested against what happens in production, not just the demo.
              Every project ends with a write-up of what I&rsquo;d change, which is where most of
              what I&rsquo;ve learned comes from.
            </p>
          </div>
        </Block>

        <Block n={3} id="learning" title="Learning AI properly">
          <div className={prose}>
            <p>
              I&rsquo;ve shipped AI features in production: Gixel&rsquo;s campaign generation runs
              on OpenAI, Gemini and Replicate. Now I&rsquo;m learning the layer underneath, training
              and evaluating models myself, and{" "}
              <a
                href="https://madevblog.hashnode.dev/from-ui-to-ai-where-i-begin"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                writing about it as I go
              </a>
              .
            </p>
          </div>
          <ul className="mt-8 border-t border-line">
            {mlProjects.map((p) => (
              <li key={p.slug} className="border-b border-line py-5">
                <a
                  href={p.links.live ?? p.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <span className="flex items-center gap-1.5 text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-ink">
                    {p.name}
                    <ArrowUpRight className="nudge-out size-4 text-muted" />
                  </span>
                  <span className="mt-1 block leading-relaxed text-pretty text-muted">
                    {p.summary}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Block>

        <Block n={4} id="community" title="Community">
          <ul>
            {community.map((c) => (
              <li key={c.org} className="py-4 first:pt-0">
                <p className="flex items-baseline">
                  <span className="font-semibold tracking-[-0.015em]">
                    {c.org} <span className="font-normal text-muted">— {c.role}</span>
                  </span>
                  <span aria-hidden className="leader" />
                  <span className="shrink-0 text-sm text-muted tabular-nums">{c.period}</span>
                </p>
                <p className="mt-1.5 leading-relaxed text-pretty text-muted">{c.detail}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block n={5} id="looking-for" title="What I’m looking for">
          <div className={prose}>
            <p>
              Freelance and contract work with founders and product teams: new products, features
              for products that already have users, and AI features that solve a real problem.
            </p>
            <p>
              I&rsquo;m also open to remote engineering roles, full-time or contract, on teams that
              take product quality seriously.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mailto} className="btn btn-primary">
              Email me
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
              <ArrowUpRight className="nudge-out size-4 text-muted" />
            </a>
          </div>
        </Block>

        <section aria-labelledby="experience-title" className="border-t border-line pt-14 md:pt-20">
          <SectionLabel n={6}>Experience</SectionLabel>
          <h2 id="experience-title" className="mt-8 text-2xl font-semibold tracking-[-0.025em]">
            Experience
          </h2>
          <ExperienceList className="mt-8" />
        </section>
      </div>
    </>
  );
}
