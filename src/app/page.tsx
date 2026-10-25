import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { ReadmeSection } from "@/components/readme-section";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { FlowDiagram } from "@/components/flow-diagram";
import { NotesSection } from "@/components/notes-section";
import { PersonJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The home page: the hero, then five numbered sections; the contact title
// block (06) is the footer, in the layout.
export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <ReadmeSection />
      <WorkSection />
      <ExperienceSection />
      <Section id="process" caption="4 steps · shown on Social Shake">
        <FlowDiagram />
      </Section>
      <NotesSection />
    </>
  );
}
