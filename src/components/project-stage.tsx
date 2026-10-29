import type { Project, ProjectImage } from "@/data/projects";
import { Window } from "@/components/window";

/**
 * A project's screens on a lit stage. Two screens: the first set back, the
 * second raised in front, drifting further as the page scrolls. One screen:
 * framed and centred. Drift sits on a wrapper so it never fights the hover
 * lift on the window itself (`group` is the caller's).
 */
export function StageScreens({
  screens: [back, front],
  domain,
  priority,
}: {
  screens: ProjectImage[];
  domain?: string;
  priority?: boolean;
}) {
  if (!back) return null;

  if (!front) {
    return (
      <div className="px-4 pt-6 pb-4 sm:px-10 sm:pt-12 sm:pb-10 lg:px-16 lg:pt-16 lg:pb-14">
        <div className="drift mx-auto max-w-[64rem]">
          <Window
            image={back}
            domain={domain}
            priority={priority}
            sizes="(min-width: 1240px) 1030px, 90vw"
            className="transition-[translate] duration-700 ease-soft motion-safe:group-hover:-translate-y-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[5/4] sm:aspect-[16/10]">
      <div className="drift absolute top-[7%] left-[5%] w-[86%] sm:top-[9%] sm:left-[6%] sm:w-[72%]">
        <Window
          image={back}
          domain={domain}
          priority={priority}
          sizes="(min-width: 1240px) 840px, 80vw"
          className="transition-[translate] duration-700 ease-soft motion-safe:group-hover:-translate-y-1"
        />
      </div>
      <div className="drift drift-near absolute right-[4%] bottom-[6%] w-[54%] sm:right-[5%] sm:bottom-[8%] sm:w-[40%]">
        <Window
          image={front}
          domain={domain}
          raised
          sizes="(min-width: 1240px) 470px, 50vw"
          className="transition-[translate] duration-700 ease-soft motion-safe:group-hover:-translate-y-2"
        />
      </div>
    </div>
  );
}

/** The four short answers: problem, role, hard part, outcome. */
export function Highlights({
  highlights: h,
  className = "",
}: {
  highlights: NonNullable<Project["highlights"]>;
  className?: string;
}) {
  const facts = [
    { term: "The problem", detail: h.problem },
    { term: "My role", detail: h.role },
    { term: "The hard part", detail: h.challenge },
    { term: "Outcome", detail: h.outcome },
  ];
  return (
    <dl className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {facts.map((f) => (
        <div key={f.term} className="border-t border-line pt-4">
          <dt className="text-[0.9375rem] font-medium tracking-[-0.01em]">{f.term}</dt>
          <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-muted">{f.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
