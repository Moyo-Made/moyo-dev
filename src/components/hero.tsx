import { site } from "@/data/site";
import { experience } from "@/data/experience";
import type { ProjectImage } from "@/data/projects";
import { getProject, projectDomain, projectScreens } from "@/lib/projects";
import { Window } from "@/components/window";
import { ArrowDown } from "@/components/icons";
import { Eyebrow, Panel } from "@/components/panel";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function screen(slug: string, which: number, override?: ProjectImage) {
  const project = getProject(slug);
  if (!project) throw new Error(`Hero stack has no project "${slug}"`);
  const image = override ?? projectScreens(project)[which];
  if (!image) throw new Error(`"${slug}" has no screen ${which}`);
  return { project, image };
}

/** The three products, fanned back to front, as on the live hero. */
const stack = [
  { ...screen("gixel", 0), position: "top-0 right-0 w-[80%]", d: 300, fan: ["14px", "-26px"] },
  {
    ...screen("devfest-lagos-2025-ticketing", 1),
    position: "top-[31%] left-0 w-[78%]",
    d: 420,
    fan: ["-22px", "0px"],
  },
  {
    ...screen("social-shake", 0, {
      src: "/images/work/social-shake-join.png",
      alt: "",
      width: 1440,
      height: 806,
    }),
    position: "right-[3%] bottom-0 w-[72%]",
    d: 540,
    fan: ["10px", "24px"],
  },
];

/** Numbers that are already on the site, each pointing at its source. */
const proof = [
  { value: "500+", label: "creators on Social Shake", href: "#work-social-shake" },
  { value: "4,000+", label: "DevFest Lagos attendees", href: "#work-devfest-lagos-2025-ticketing" },
  { value: String(experience.length), label: "teams shipped with", href: "#experience" },
];

/**
 * The hero on its own lit panel, inset from the screen edges: copy and
 * actions on the left, the shipped products on the right, and the proof
 * along the panel's foot.
 */
export function Hero() {
  return (
    <Panel as="section" aria-labelledby="hero-title">
      <div className="shell pt-16 md:pt-24 lg:pt-28">
        <div className="hero-split">
          <div>
            <Eyebrow live className="rise">
              {site.hero.eyebrow}
              <span className="hidden sm:inline"> · open to new work</span>
            </Eyebrow>

            <h1
              id="hero-title"
              className="mt-7 text-[clamp(2.75rem,1.4rem+5.6vw,5.75rem)] leading-[1.02] font-semibold tracking-[-0.045em] lg:text-[clamp(3.5rem,1rem+4vw,4.75rem)]"
            >
              {site.hero.headline.map((line, i) => (
                <span key={line} className="rise block" style={delay(80 + i * 100)}>
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="rise mt-8 max-w-[36rem] text-lg leading-relaxed text-pretty text-muted md:text-xl md:leading-relaxed"
              style={delay(320)}
            >
              {site.hero.body}
            </p>

            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(420)}>
              <a href="#contact" className="btn btn-primary">
                Let&rsquo;s work together
              </a>
              <a href="#work" className="btn btn-secondary">
                Explore my work
                <ArrowDown className="nudge-down size-4 text-muted" />
              </a>
            </div>
          </div>

          <ul
            aria-label="Recent products"
            className="relative mt-16 aspect-[10/11] max-w-[34rem] lg:mt-0 lg:max-w-none"
          >
            {stack.map(({ project, image, position, d, fan }) => (
              <li key={project.slug} className={`rise absolute ${position}`} style={delay(d)}>
                <a
                  href={`#work-${project.slug}`}
                  aria-label={`${project.name}: ${project.outcome}`}
                  className="fan lift group block"
                  style={{ "--fx": fan[0], "--fy": fan[1] } as React.CSSProperties}
                >
                  <Window
                    image={image}
                    domain={projectDomain(project)}
                    priority
                    decorative
                    sizes="(min-width: 1024px) 400px, 80vw"
                    className="transition-[translate,box-shadow] duration-500 ease-soft motion-safe:group-hover:-translate-y-1.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul
          aria-label="In numbers"
          className="rise mt-16 grid grid-cols-3 border-t border-ink/10 md:mt-20"
          style={delay(640)}
        >
          {proof.map((p, i) => (
            <li key={p.label} className={i > 0 ? "border-l border-ink/10" : ""}>
              <a
                href={p.href}
                className={`group block py-6 md:py-8 ${i > 0 ? "pl-4 sm:pl-8" : ""}`}
              >
                <span className="block text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                  {p.value}
                </span>
                <span className="mt-2.5 block text-[0.8125rem] leading-snug text-muted transition-colors group-hover:text-ink sm:text-[0.9375rem]">
                  {p.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
