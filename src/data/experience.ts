/**
 * Jobs and community roles — the 30-second recruiter scan.
 * Newest first. `impact` is one or two lines, numbers up front.
 */

export interface Role {
  period: string;
  role: string;
  org: string;
  impact: string;
  tags: string[];
}

export const jobs: Role[] = [
  {
    period: "Jan 2026 — Present",
    role: "Frontend Engineer",
    org: "Straqa",
    impact:
      "Building the frontend of a logistics infrastructure platform for African businesses, including a transportation management dashboard kept in sync with live data over REST APIs.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "REST APIs"],
  },
  {
    period: "Oct 2025 — Present",
    role: "Frontend Engineer",
    org: "Gixel",
    impact:
      "Led Gixel's move from iOS-only to the web: a Next.js app that turns one product photo into a full fashion campaign, with OpenAI, Gemini and Replicate behind it and Firebase shared with the iOS app.",
    tags: ["Next.js", "TypeScript", "Firebase", "AI integration"],
  },
  {
    period: "Nov 2024 — Jun 2025",
    role: "Frontend Developer",
    org: "TechSynergy",
    impact:
      "Rebuilt the company site in React and TypeScript, and built the PrintEazy e-commerce UI — reusable components cut feature development time by 30%; SEO work lifted organic traffic 18%.",
    tags: ["React", "TypeScript", "SEO"],
  },
  {
    period: "Feb 2024 — Sep 2024",
    role: "Frontend Developer",
    org: "Laferla",
    impact:
      "Built Go-Digital, moving insurance cards into Apple and Google Wallet — a 25% jump in adoption. Reworked onboarding for 20% more sign-ups; code splitting cut navigation time 35%.",
    tags: ["Next.js", "TypeScript", "Apple Wallet", "Google Wallet"],
  },
];

export const community: Role[] = [
  {
    period: "May 2026",
    role: "Hackathon Lead",
    org: "VibeCode Africa Lagos",
    impact:
      "Led a hackathon team that formed on the day and built a solution for agriculture.",
    tags: ["Hackathon", "Mentoring"],
  },
  {
    period: "2025", // TODO(moyo): month
    role: "Frontend Mentor",
    org: "GDG LASU Bootcamp 2.0",
    impact:
      "Guided participants through frontend projects across the bootcamp.",
    tags: ["Mentoring", "Frontend"],
  },
  {
    period: "Aug 2024 — Present",
    role: "Frontend Engineer, Digital Working Group",
    org: "DevFest Lagos",
    impact:
      "Frontend engineer on the team behind the 2024 and 2025 event platforms for 4,000+ attendees. Helped raise accessibility from 82% to 96% (WCAG 2.1 AA) and cut page rollout time by 25% with a shared component library.",
    tags: ["Next.js", "TypeScript", "Accessibility", "Community"],
  },
];
