/**
 * Who this site is about, in one place. Anything that would otherwise be
 * repeated across the hero, footer, metadata and JSON-LD lives here.
 */
export const site = {
  name: "Moyomade Adegbite",
  shortName: "Moyo",
  /** The hero headline. Keep it to a job title. */
  role: "Frontend developer",
  /** The problem you solve, in one sentence. Sits under the role in the hero. */
  tagline:
    "I turn complicated flows into fast, accessible interfaces people get on the first try.",
  /**
   * The evidence for the tagline. The hero links `text` ("Most recently: …")
   * and shows the project's screenshot with `notes` as callouts beside its
   * stack. `project` must be a slug in src/data/projects.ts.
   */
  proof: {
    project: "social-shake",
    text: "a UGC marketplace with 500+ creators, built end to end",
    notes: [
      { term: "Role", detail: "Sole developer, freelance, for an Australian client" },
      { term: "Hard part", detail: "Three user types, escrow payments and live chat" },
    ],
  },
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  email: "adegbitemoyomade2004@gmail.com",
  /** The tag above your name in the hero. Flip off when you're not looking. */
  availableForRoles: true,
  socials: {
    github: "https://github.com/Moyo-Made",
    linkedin: "https://www.linkedin.com/in/moyomade-adegbite",
    x: "https://x.com/moyomadee7",
  },
} as const;
