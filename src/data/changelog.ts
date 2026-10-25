/**
 * Everything shipped, styled as a git log. Newest first.
 *
 * `month` is YYYY-MM — month precision is enough, and it's what a reader
 * scans. Dates come from when each GitHub repo was created; correct any that
 * shipped later. Entries with `note: ""` still need a one-liner in your words.
 */

export type Action = "shipped" | "built" | "started";

export interface ChangelogEntry {
  month: string;
  name: string;
  action: Action;
  note: string;
  href?: string;
}

export const changelog: ChangelogEntry[] = [
  {
    month: "2026-10",
    name: "moyo-dev",
    action: "started",
    note: "This site — a tech-only portfolio, built in public.",
    href: "https://github.com/Moyo-Made/moyo-dev",
  },
  {
    month: "2026-10",
    name: "california-housing-intelligence",
    action: "shipped",
    note: "Random Forest + FastAPI + Next.js housing-price explorer.",
    href: "https://california-housing-intelligence.vercel.app",
  },
  {
    month: "2026-10",
    name: "time-machine",
    action: "started",
    note: "A browser-based 3D historical exploration game.",
    href: "https://github.com/Moyo-Made/time-machine",
  },
  {
    month: "2026-10",
    name: "atelier-store",
    action: "shipped",
    note: "A luxury e-commerce storefront.",
    href: "https://atelierrstore.vercel.app",
  },
  {
    month: "2026-08",
    name: "how-nigeria-works",
    action: "shipped",
    note: "3D explainer of Nigeria's government, every claim sourced.",
    href: "https://nggovt.vercel.app",
  },
  {
    month: "2026-05",
    name: "career-recommender",
    action: "shipped",
    note: "CareerFit — AI career-path recommender, 94% top-3 accuracy.",
    href: "https://career-recommender-seven.vercel.app",
  },
  {
    month: "2026-01",
    name: "zentro",
    action: "built",
    note: "A delivery mobile app.",
    href: "https://github.com/Moyo-Made/zentro",
  },
  {
    month: "2025-10",
    name: "fileflow",
    action: "built",
    note: "Smart file organisation for your desktop.",
    href: "https://github.com/Moyo-Made/fileflow",
  },
  {
    month: "2025-09",
    name: "devfest-lagos-2025-ticketing",
    action: "shipped",
    note: "Multi-day, multi-recipient ticketing for 4,000+ attendees.",
    href: "https://tickets.devfestlagos.com/",
  },
  {
    month: "2025-09",
    name: "cirri-note",
    action: "shipped",
    note: "", // TODO(moyo)
    href: "https://cirri-note.vercel.app",
  },
  {
    month: "2025-07",
    name: "telecom-signal-strength",
    action: "shipped",
    note: "", // TODO(moyo)
    href: "https://telecom-signal-strength.vercel.app",
  },
  {
    month: "2025-06",
    name: "intern-connect",
    action: "shipped",
    note: "Two-sided internship platform with role-based dashboards.",
    href: "https://intern-connect-ten.vercel.app",
  },
  {
    month: "2025-02",
    name: "social-shake",
    action: "shipped",
    note: "", // TODO(moyo) — has a separate socket server repo
    href: "https://social-shake.vercel.app",
  },
  {
    month: "2024-12",
    name: "crypto-tracker",
    action: "built",
    note: "Live crypto prices and trends from the CoinMarketCap API.",
    href: "https://github.com/Moyo-Made/Crypto-Tracker",
  },
  {
    month: "2024-10",
    name: "pricecraft",
    action: "built",
    note: "A dynamic pricing-page builder.",
    href: "https://github.com/Moyo-Made/PriceCraft",
  },
  {
    month: "2024-09",
    name: "devfest-lagos-2024",
    action: "shipped",
    note: "Official conference site — accessibility 82% → 96%.",
    href: "https://2024.devfestlagos.com/",
  },
  {
    month: "2024-09",
    name: "homebiro",
    action: "shipped",
    note: "", // TODO(moyo)
    href: "https://homebiro.vercel.app",
  },
  {
    month: "2024-07",
    name: "docg-cli",
    action: "built",
    note: "A documentation-generation CLI.",
    href: "https://github.com/Moyo-Made/docg-cli",
  },
  {
    month: "2024-07",
    name: "promptopia",
    action: "built",
    note: "Discover and share AI prompts.",
    href: "https://github.com/Moyo-Made/Promptopia",
  },
  {
    month: "2024-06",
    name: "finance-dashboard",
    action: "shipped",
    note: "Income, expenses and transactions, visualised.",
    href: "https://finance-dashboard-psi.vercel.app",
  },
];
