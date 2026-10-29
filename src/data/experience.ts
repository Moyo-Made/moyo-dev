/**
 * Where the work happened. Newest first. `detail` is one or two lines,
 * numbers up front; `sector` labels the strip under the home page's hero.
 */

export interface Role {
  org: string;
  role: string;
  period: string;
  sector: string;
  detail: string;
}

export const experience: Role[] = [
  {
    org: "Straqa",
    role: "Frontend engineer",
    period: "2026 – now",
    sector: "Logistics",
    detail:
      "The frontend of a logistics platform for African businesses, including a transportation management dashboard kept in sync with live data.",
  },
  {
    org: "Gixel",
    role: "Lead web engineer",
    period: "2025 – now",
    sector: "AI",
    detail:
      "Took an iOS-only product to the web: the Next.js app, the generation pipeline, credits and billing.",
  },
  {
    org: "Social Shake",
    role: "Freelance, sole developer",
    period: "2025",
    sector: "Marketplace & payments",
    detail:
      "A three-sided marketplace with escrow payments and live chat, built end to end for an Australian client.",
  },
  {
    org: "TechSynergy",
    role: "Frontend developer",
    period: "2024 – 2025",
    sector: "E-commerce",
    detail:
      "Rebuilt the company site and the PrintEazy store UI. Shared components cut feature work by 30%; SEO work lifted organic traffic 18%.",
  },
  {
    org: "Laferla Insurance",
    role: "Frontend developer",
    period: "2024",
    sector: "Insurance",
    detail:
      "Moved member insurance cards into Apple and Google Wallet, a 25% jump in adoption. Reworked onboarding for 20% more sign-ups.",
  },
  {
    org: "DevFest Lagos",
    role: "Frontend engineer, volunteer team",
    period: "2024 – now",
    sector: "Events & ticketing",
    detail:
      "The 2024 and 2025 event platforms for 4,000+ attendees. Helped raise accessibility from 82% to 96% (WCAG 2.1 AA).",
  },
];

/** Community roles, for the About page. */
export const community = [
  {
    org: "VibeCode Africa Lagos",
    role: "Hackathon lead",
    period: "May 2026",
    detail: "Led a hackathon team that formed on the day and built a solution for agriculture.",
  },
  {
    org: "GDG LASU Bootcamp 2.0",
    role: "Frontend mentor",
    period: "2025", // TODO(moyo): month
    detail: "Guided participants through frontend projects across the bootcamp.",
  },
  {
    org: "DevFest Lagos",
    role: "Frontend engineer, Digital Working Group",
    period: "2024 – now",
    detail:
      "On the team behind the 2024 and 2025 event platforms, and a shared component library that cut page rollout time by 25%.",
  },
];
