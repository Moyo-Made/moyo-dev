import Readme from "@/content/readme.mdx";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/** `// 01 README` — the bio, with the work inside it. Copy lives in readme.mdx. */
export function ReadmeSection() {
  return (
    <Section id="readme" label="01 README">
      <div className="space-y-6 text-2xl leading-[1.4] tracking-[-0.01em] text-pretty md:text-[1.875rem]">
        <Readme components={{ Reveal }} />
      </div>
      <p className="label-mono mt-10 text-muted">
        <span className="hidden [@media(hover:hover)]:inline">
          Hover the underlined words to preview the work
        </span>
        <span className="[@media(hover:hover)]:hidden">
          Tap the underlined words to open the work
        </span>
      </p>
    </Section>
  );
}
