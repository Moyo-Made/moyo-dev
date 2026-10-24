/**
 * Who this site is about, in one place. Anything that would otherwise be
 * repeated across the hero, footer, metadata and JSON-LD lives here.
 */
export const site = {
  name: "Moyomade Adegbite",
  shortName: "Moyo",
  // TODO(moyo): final positioning line — this is the plan's working draft.
  tagline:
    "Frontend & full-stack engineer building interactive tools that explain complex systems.",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  url: "https://moyo-dev.vercel.app", // TODO: swap for the real domain at launch
  email: "adegbitemoyomade2004@gmail.com",
  /** Shown in the hero status bar. Flip off when you're not looking. */
  availableForRoles: true,
  socials: {
    github: "https://github.com/Moyo-Made",
    linkedin: "https://www.linkedin.com/in/moyomade-adegbite",
    x: "https://x.com/moyomadee7",
  },
} as const;
