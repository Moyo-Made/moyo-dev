/**
 * Who this site is about, in one place. Anything that would otherwise be
 * repeated across the hero, footer, metadata and JSON-LD lives here.
 */
export const site = {
  name: "Moyomade Adegbite",
  shortName: "Moyo",
  /** The hero headline. Keep it to a job title. */
  role: "Frontend developer",
  /** What you do, in one sentence. Sits under the role in the hero. */
  tagline:
    "I build interactive tools that make complex systems easier to understand.",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  email: "adegbitemoyomade2004@gmail.com",
  /** Shown in the hero status bar. Flip off when you're not looking. */
  availableForRoles: true,
  socials: {
    github: "https://github.com/Moyo-Made",
    linkedin: "https://www.linkedin.com/in/moyomade-adegbite",
    x: "https://x.com/moyomadee7",
  },
} as const;
