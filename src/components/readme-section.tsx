import Readme from "@/content/readme.mdx";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * `01 — README`: the bio, with the work referenced inside it. Copy lives
 * in readme.mdx; the right padding is the margin the sidenotes float into,
 * and flow-root keeps them inside the section.
 */
export function ReadmeSection() {
  return (
    <Section id="readme" caption="References marked [n]">
      <div className="refs flow-root space-y-6 text-2xl leading-[1.4] tracking-[-0.01em] text-pretty md:text-[1.875rem] lg:pr-[19rem] xl:pr-[22rem]">
        <Readme components={{ Reveal }} />
      </div>
    </Section>
  );
}
