/**
 * Every project on the site, and the single source of truth for its facts.
 *
 * Cards, case-study headers, share previews and the README hover previews all
 * read from here. Case-study MDX files (src/content/work/<slug>.mdx) hold only
 * the write-up — no frontmatter — so the facts can never drift between places.
 *
 * Array order is display order.
 */

export type Tier =
  /** Large card in Selected work, with a full case study. */
  | "featured"
  /** Compact row under Selected work. */
  | "also"
  /** Small card in the Machine learning block under Selected work. */
  | "ml";

export interface Project {
  slug: string;
  title: string;
  /** The one line a recruiter reads on the card. Lead with the result. */
  outcome: string;
  /** Two or three sentences. Case-study intro and meta description. */
  summary: string;
  role: string;
  /** Who else was involved, if anyone. Omit for solo work. */
  team?: string;
  year: number;
  stack: string[];
  links: { live?: string; code?: string };
  tier: Tier;
  image?: { src: string; alt: string };
  /** The three-line TL;DR box at the top of the case study. */
  tldr?: { problem: string; built: string; result: string };
  /** True when src/content/work/<slug>.mdx exists. */
  caseStudy: boolean;
}

export const projects: Project[] = [
  {
    slug: "social-shake",
    title: "Social Shake — UGC Marketplace",
    outcome:
      "A marketplace where brands brief, hire and pay 500+ creators for short-form video.",
    summary:
      "Built end to end as a freelancer for an Australian client. Brands write a brief in a four-step wizard, invite or open it to creators, and pay only for approved videos; creators apply, deliver and get paid out; admins approve both sides. Brands, creators and admins each get their own dashboard.",
    role: "Sole developer, end to end — freelance",
    team: "Solo, for an Australian client",
    year: 2025,
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe Connect", "Socket.io"],
    links: { live: "https://app.social-shake.com" },
    tier: "featured",
    image: {
      src: "/images/work/social-shake-brief-types.png",
      alt: "Step one of the Social Shake brief: choosing between raw UGC, creator-posted UGC and Spark Ads",
    },
    tldr: {
      problem:
        "Brands and creators had to trust each other first: one pays up front, or the other films for free.",
      built:
        "A three-sided marketplace: a four-step brief, card holds charged only on approval, and Stripe Connect payouts.",
      result: "Live for an Australian client, with 500+ creators on the platform.",
    },
    caseStudy: true,
  },
  {
    slug: "atelier",
    title: "Atelier — Luxury Storefront",
    outcome:
      "A luxury fashion store that looks the part, with real checkout, accounts and an admin behind it.",
    summary:
      "A luxury e-commerce storefront: catalogue, search, bag, Stripe checkout and customer accounts, plus an admin for products, stock and orders. Built solo on Next.js with Drizzle over Neon Postgres and Better Auth.",
    role: "Solo — UI and full stack",
    year: 2026,
    stack: ["Next.js", "TypeScript", "Drizzle", "Neon Postgres", "Stripe", "Better Auth"],
    links: {
      live: "https://atelierrstore.vercel.app",
      code: "https://github.com/Moyo-Made/atelier-store",
    },
    tier: "featured",
    image: {
      src: "/images/work/atelier-storefront.jpg",
      alt: "Atelier's homepage: an autumn collection campaign under a spaced serif wordmark",
    },
    caseStudy: false,
  },
  {
    slug: "how-nigeria-works",
    title: "Three Arms — How Nigeria Works",
    outcome:
      "A 3D explainer of Nigeria's government where every constitutional claim cites its section.",
    summary:
      "An interactive 3D explainer of Nigeria's federal government — the three arms, the three tiers, and how a bill becomes law. Each institution is a landmark you can orbit and take apart; unverified facts are marked as such, never guessed.",
    role: "Solo — design, 3D and content",
    year: 2026,
    stack: ["React", "Three.js", "React Three Fiber", "Vite"],
    links: {
      live: "https://nggovt.vercel.app",
      code: "https://github.com/Moyo-Made/how-nigeria-works",
    },
    tier: "featured",
    image: {
      src: "/images/work/how-nigeria-works.jpg",
      alt: "Three Arms — a 3D model of the National Assembly on a plinth, with sourced key facts in the side panel",
    },
    caseStudy: false, // TODO: write in Step 8
  },
  {
    slug: "devfest-lagos-2025-ticketing",
    title: "DevFest Lagos 2025 — Ticketing",
    outcome:
      "Ticketing for one of Nigeria's largest developer conferences — 4,000+ attendees.",
    summary:
      "As a frontend engineer on the DevFest Lagos team, I worked on the 2025 ticketing platform and its ticket-selection flow. The hard part wasn't selling tickets; it was letting one person buy several ticket types, across several days, for several different people — each with their own code.",
    role: "Frontend engineer on the DevFest Lagos team",
    year: 2025,
    stack: ["Next.js", "TypeScript", "Redux"],
    links: { live: "https://tickets.devfestlagos.com/" },
    tier: "featured",
    image: {
      src: "/images/work/devfest-2025-ticketing.png",
      alt: "DevFest Lagos 2025 ticketing platform",
    },
    tldr: {
      problem:
        "One buyer, many tickets: different types, different days, different people.",
      built:
        "A selection flow where each ticket is its own object with its own recipient.",
      result:
        "Powered ticketing for a 4,000+ attendee conference.", // TODO(moyo): tickets processed / sell-out time
    },
    caseStudy: true,
  },
  {
    slug: "california-housing-intelligence",
    title: "California Housing Intelligence",
    outcome:
      "A Random Forest price model you can poke at — served by FastAPI, explained in a Next.js app.",
    summary:
      "An educational ML explorer built on the 1990 California census. A Random Forest predicts block-group house values; the app lets you change the inputs, compare predictions side by side, and see how the model responds — with its limits stated plainly.",
    role: "Solo — model, API and frontend",
    year: 2026,
    stack: ["Python", "scikit-learn", "FastAPI", "Next.js", "TypeScript"],
    links: {
      live: "https://california-housing-intelligence.vercel.app",
      code: "https://github.com/Moyo-Made/california-housing-intelligence",
    },
    tier: "ml",
    image: {
      src: "/images/work/california-housing.jpg",
      alt: "California Housing Intelligence — a $213,000 prediction for a synthetic block group, with the model's average error shown underneath",
    },
    tldr: {
      problem: "ML demos hide how a model behaves and where it breaks.",
      built:
        "A live workbench over a Random Forest: presets, comparisons and a model-response chart.",
      result: "Test MAE of $32,773 on held-out data, with its limits written down.",
    },
    caseStudy: false, // TODO: write in Step 8
  },
  {
    slug: "careerfit",
    title: "CareerFit — AI Career Recommender",
    outcome: "Top-3 accuracy of 94% across 24 careers.",
    summary:
      "My final-year project: an AI career-path recommender for Nigerian university students. A short personality-and-skills assessment returns three best-fit, degree-relevant careers, ranked by match.",
    role: "Solo — full stack and model",
    year: 2026,
    stack: ["React", "Flask", "Python", "scikit-learn", "MongoDB"],
    links: {
      live: "https://career-recommender-seven.vercel.app/",
      code: "https://github.com/Moyo-Made/career-recommender",
    },
    tier: "ml",
    image: {
      src: "/images/work/careerfit-home.png",
      alt: "CareerFit home page — “Discover the career path that fits who you are”",
    },
    caseStudy: false, // TODO: port from the general site in Step 8
  },
  {
    slug: "internconnect",
    title: "InternConnect",
    outcome:
      "A two-sided internship platform — companies post and review, students apply and track.",
    summary:
      "My SIWES project: role-based dashboards for companies and students in one Next.js codebase, backed by PostgreSQL and Prisma, JWT auth and Cloudinary uploads.",
    role: "Solo — full stack",
    year: 2025,
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    links: { live: "https://intern-connect-ten.vercel.app/" },
    tier: "also",
    image: {
      src: "/images/work/internconnect-home.jpg",
      alt: "InternConnect landing page",
    },
    caseStudy: false,
  },
  {
    slug: "go-digital",
    title: "Go-Digital — Insurance Cards",
    outcome:
      "Moved insurance cards into Apple and Google Wallet — a 25% jump in adoption.",
    summary:
      "Laferla's member cards went from plastic to the phone. I built the frontend and led the Apple Wallet pass integration with the backend developer.",
    role: "Frontend engineer at Laferla",
    team: "With a backend developer",
    year: 2024,
    stack: ["Next.js", "TypeScript", "Redux", "Apple Wallet", "Google Wallet"],
    links: {},
    tier: "also",
    image: {
      src: "/images/work/go-digital.png",
      alt: "Go-Digital digital insurance card platform",
    },
    caseStudy: false,
  },
  {
    slug: "devfest-lagos-2024",
    title: "DevFest Lagos 2024 — Website",
    outcome: "Lifted the accessibility score from 82% to 96% (WCAG 2.1 AA).",
    summary:
      "Built key sections of the official DevFest Lagos 2024 site, and reusable components that cut new-page rollout time by 25%.",
    role: "Frontend engineer, Digital Working Group",
    year: 2024,
    stack: ["Next.js", "TypeScript", "SCSS"],
    links: { live: "https://2024.devfestlagos.com/" },
    tier: "also",
    image: {
      src: "/images/work/devfest-2024.png",
      alt: "DevFest Lagos 2024 website — hero",
    },
    caseStudy: false,
  },
  {
    slug: "mega-league",
    title: "Mega League",
    outcome:
      "Performance work on a global STEM & AI platform — a 35% lift in engagement.",
    summary:
      "A collaboration platform for students and educators across several countries. I worked on frontend performance and responsiveness, and kept it stable through high-traffic events.",
    role: "Frontend engineer",
    year: 2024,
    stack: ["React", "JavaScript", "CSS"],
    links: {},
    tier: "also",
    image: { src: "/images/work/mega-league.png", alt: "Mega League platform" },
    caseStudy: false,
  },
];
