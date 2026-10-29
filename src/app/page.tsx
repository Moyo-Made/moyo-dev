import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { WorkedWith } from "@/components/worked-with";
import { WorkSection } from "@/components/work-section";
import { ServicesSection } from "@/components/services-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProcessSection } from "@/components/process-section";
import { AboutSection } from "@/components/about-section";
import { WritingSection } from "@/components/writing-section";
import { PersonJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The home page answers four questions in order: who is this (hero), what
 * has he built (work), what can he do for me (services, experience, process)
 * and how do I reach him (the contact footer, in the layout).
 */
export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <WorkedWith />
      <WorkSection />
      <ServicesSection />
      <ExperienceSection />
      <ProcessSection />
      <AboutSection />
      <WritingSection />
    </>
  );
}
