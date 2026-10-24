import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { ReadmeSection } from "@/components/readme-section";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { ChangelogSection } from "@/components/changelog-section";
import { ProcessSteps } from "@/components/process-steps";
import { NotesSection } from "@/components/notes-section";

// The home page: ink hero, six paper sections, ink footer (in the layout).
export default function Home() {
  return (
    <>
      <Hero />
      <ReadmeSection />
      <WorkSection />
      <ExperienceSection />
      <ChangelogSection />
      <Section id="process" label="05 How I build">
        <ProcessSteps />
      </Section>
      <NotesSection />
    </>
  );
}
