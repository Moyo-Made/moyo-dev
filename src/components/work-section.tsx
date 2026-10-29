import Image from "next/image";
import Link from "next/link";
import {
  alsoBuilt,
  featuredProjects,
  formatList,
  isExternal,
  mlProjects,
  projectDomain,
  projectHref,
  projectScreens,
} from "@/lib/projects";
import { Statement } from "@/components/statement";
import { SectionLabel } from "@/components/panel";
import { WorkShowcase } from "@/components/work-showcase";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

/**
 * Selected work: the three case studies in one frame that turns between
 * them, then the next four projects as tiles, each with its screen rising
 * from the tile's foot.
 */
export function WorkSection() {
  const tiles = alsoBuilt.filter((p) => p.image).slice(0, 4);
  const more = alsoBuilt.length + mlProjects.length;

  return (
    <section id="work" aria-labelledby="work-title" className="relative shell py-24 md:py-32">
      {/* The hero's screens link here, one anchor per project. */}
      {featuredProjects.map((p) => (
        <span key={p.slug} id={`work-${p.slug}`} className="absolute top-0" />
      ))}

      <SectionLabel n={1}>Work</SectionLabel>
      <Statement id="work-title" title="Selected work." className="mt-8">
        {
          "Three products I’ve helped build and ship, each with a full write-up: the problem, the decisions, and what I’d change."
        }
      </Statement>

      <div className="mt-14 md:mt-16">
        <WorkShowcase
          items={featuredProjects.map((p) => ({
            slug: p.slug,
            name: p.name,
            outcome: p.outcome,
            stack: formatList(p.stack),
            domain: projectDomain(p),
            live: p.links.live,
            screens: projectScreens(p),
            highlights: p.highlights,
          }))}
        />
      </div>

      <div className="mt-28 md:mt-36">
        <div className="flex items-end justify-between gap-6">
          <h3 className="text-xl font-semibold tracking-[-0.02em]">Also built</h3>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            All {alsoBuilt.length + featuredProjects.length + mlProjects.length} projects
            <ArrowRight className="nudge-out size-4" />
          </Link>
        </div>

        <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {tiles.map((p, i) => {
            const href = projectHref(p) ?? "/work";
            const external = isExternal(href);
            // Wide, narrow / narrow, wide: a staggered grid with no gaps.
            const wide = i === 0 || i === 3;
            return (
              <li key={p.slug} className={wide ? "lg:col-span-2" : ""}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                  className="tile group flex h-[22rem] flex-col p-6 md:h-[26rem] md:p-7"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className={wide ? "max-w-[24rem] lg:max-w-[40%]" : "max-w-[24rem]"}>
                      <span className="block font-mono text-xs text-muted">{p.year}</span>
                      <span className="mt-2 block text-lg font-semibold tracking-[-0.02em]">
                        {p.name}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-muted">
                        {p.outcome}
                      </span>
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface shadow-[0_1px_2px_rgb(32_33_31/0.08)] transition-colors group-hover:bg-ink group-hover:text-surface">
                      <ArrowUpRight className="nudge-out size-4" />
                    </span>
                  </span>
                  <span
                    className={`tile-shot window absolute bottom-0 block ${
                      wide
                        ? "right-0 left-10 rounded-r-none md:left-12 lg:right-7 lg:left-[48%] lg:rounded-r-[10px]"
                        : "right-0 left-10 rounded-r-none md:left-12"
                    }`}
                  >
                    <Image
                      src={p.image!.src}
                      alt=""
                      width={p.image!.width}
                      height={p.image!.height}
                      sizes={
                        wide ? "(min-width: 1024px) 600px, 90vw" : "(min-width: 1024px) 340px, 90vw"
                      }
                      className="block h-auto w-full"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Plus {more - tiles.length} more on{" "}
          <Link href="/work" className="link">
            the work page
          </Link>
          , including machine learning projects.
        </p>
      </div>
    </section>
  );
}
