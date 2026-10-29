/**
 * Who this site is about, in one place. Anything that would otherwise be
 * repeated across the hero, footer, metadata and JSON-LD lives here.
 */
export const site = {
  name: "Moyomade Adegbite",
  shortName: "Moyomade",
  /** The job title, for metadata and structured data. */
  role: "Software Engineer",
  /** The positioning, in one sentence. Meta description and JSON-LD. */
  description:
    "Moyomade Adegbite is a software engineer helping founders and teams build reliable web products, SaaS features, and AI-powered applications. Explore selected work and get in touch.",
  hero: {
    eyebrow: "Software engineer",
    headline: ["Good ideas deserve", "great execution."],
    body: "I’m Moyomade, a software engineer helping founders and teams build thoughtful, reliable digital products. I’ve worked across AI, marketplaces, fintech, and logistics.",
  },
  location: "Lagos, Nigeria",
  /** Shown beside the contact links. */
  timeZone: "UTC+1",
  /** Public address. Mail forwards to a personal inbox; nothing sends from it. */
  email: "hello@moyomade.me",
  socials: {
    github: "https://github.com/Moyo-Made",
    linkedin: "https://www.linkedin.com/in/moyomade-adegbite",
    x: "https://x.com/moyomadee7",
  },
} as const;

/** Opens an email with a subject and a few prompts, so nobody starts blank. */
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Let's work together",
)}&body=${encodeURIComponent(
  `Hi ${site.shortName},\n\nWe're building: \nThe hard part is: \nTimeline: \n`,
)}`;
