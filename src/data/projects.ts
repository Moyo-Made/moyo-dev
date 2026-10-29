/**
 * Every project on the site, and the single source of truth for its facts.
 *
 * The home page, /work, case-study headers and share images all read from
 * here. Case-study MDX files (src/content/work/<slug>.mdx) hold only the
 * write-up — no frontmatter — so the facts can never drift between places.
 *
 * Array order is display order.
 */

export type Tier =
  /** Shown on its own stage in the home page's Selected work, with a case study. */
  | "featured"
  /** Listed under More projects on /work. */
  | "also"
  /** Listed under Machine learning on /work. */
  | "ml";

export interface ProjectImage {
  src: string;
  alt: string;
  /** Intrinsic size, so screens are shown whole at their own aspect ratio. */
  width: number;
  height: number;
  /**
   * A composed graphic rather than a screenshot. It's framed plainly,
   * never dressed in a browser bar as if it were the live page.
   */
  composite?: boolean;
}

export interface Project {
  slug: string;
  /** Short name: "Social Shake". */
  name: string;
  /** Full title with what it is: "Social Shake — UGC Marketplace". */
  title: string;
  /** One line under the name. Lead with what it does or what it achieved. */
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
  /** Cards, the case-study header and the share image. */
  image?: ProjectImage;
  /** Selected work's stage: the first set back, the second raised in front. Defaults to `image`. */
  screens?: ProjectImage[];
  /**
   * Four short answers a founder looks for. Shown under the stage on the
   * home page and at the top of the case study.
   */
  highlights?: { problem: string; role: string; challenge: string; outcome: string };
  /** True when src/content/work/<slug>.mdx exists. */
  caseStudy: boolean;
}

const socialShakeBrief: ProjectImage = {
  src: "/images/work/social-shake-brief-types.png",
  alt: "Step one of the Social Shake brief: choosing between raw UGC, creator-posted UGC and Spark Ads",
  width: 1598,
  height: 1000,
};

const devfestLanding: ProjectImage = {
  src: "/images/work/devfest-2025-ticketing.png",
  alt: "The DevFest Lagos 2025 ticketing landing page",
  width: 2878,
  height: 1632,
};

export const projects: Project[] = [
  {
    slug: "social-shake",
    name: "Social Shake",
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
    image: socialShakeBrief,
    screens: [
      socialShakeBrief,
      {
        src: "/images/work/social-shake-escrow.png",
        alt: "Brand notifications: an accepted invitation, and orders held in escrow until delivery is confirmed",
        width: 1600,
        height: 1117,
      },
    ],
    highlights: {
      problem:
        "Brands and creators had to trust each other first: one pays up front, or the other films for free.",
      role: "Sole developer for an Australian client, from first commit to production. Separate dashboards for brands, creators and admins.",
      challenge:
        "Money moves with each order. Cards are held at checkout, charged only when a video is approved, then paid out through Stripe Connect.",
      outcome:
        "Live, with 500+ creators on the platform and brands running projects and contests through it.",
    },
    caseStudy: true,
  },
  {
    slug: "gixel",
    name: "Gixel",
    title: "Gixel — AI Fashion Campaigns",
    outcome:
      "Turns one product photo into a whole fashion campaign: studio, on-model, lifestyle and detail shots.",
    summary:
      "Gixel lets fashion brands upload a product photo or link and get back a ready-to-post campaign. As lead web engineer I built the web app and the system behind it: generation jobs queued to a separate worker, credits and refunds that always add up, Stripe billing, and a project store shared with the iOS app.",
    role: "Lead web engineer — web app and backend",
    team: "Small team; the iOS app is built separately",
    year: 2026,
    stack: ["Next.js", "TypeScript", "Firebase", "Cloud Run", "Cloud Tasks", "Stripe"],
    links: { live: "https://gixel.net" },
    tier: "featured",
    image: {
      src: "/images/work/gixel-one-photo-campaign.jpg",
      alt: "Gixel: one photo of a red dress in, four campaign shots out (studio, lifestyle, detail and packaging)",
      width: 1920,
      height: 1200,
      composite: true,
    },
    highlights: {
      problem:
        "Every product needs a campaign’s worth of images, and a photoshoot per product doesn’t scale.",
      role: "Lead web engineer. Led the move from iOS-only to the web, building the web app and the backend it runs on.",
      challenge:
        "Generation is slow, costs money and sometimes fails. Jobs run on a queued worker, and credits are charged once and refunded exactly once.",
      outcome: "Live at gixel.net, with the web and iOS apps sharing one project library.",
    },
    caseStudy: true,
  },
  {
    slug: "devfest-lagos-2025-ticketing",
    name: "DevFest Lagos ticketing",
    title: "DevFest Lagos 2025 — Ticketing",
    outcome:
      "Ticketing for one of Nigeria’s largest developer conferences — 4,000+ attendees.",
    summary:
      "As a frontend engineer on the DevFest Lagos team, I worked on the 2025 ticketing platform and its ticket-selection flow. The hard part wasn’t selling tickets; it was letting one person buy several ticket types, across several days, for several different people — each with their own code.",
    role: "Frontend engineer on the DevFest Lagos team",
    year: 2025,
    stack: ["Next.js", "TypeScript", "Redux"],
    links: { live: "https://tickets.devfestlagos.com/" },
    tier: "featured",
    image: devfestLanding,
    screens: [
      {
        src: "/images/work/devfest-ticket-selection.png",
        alt: "The ticket-selection step: Standard and Pro tabs above a multi-day calendar, with a live order summary",
        width: 2880,
        height: 1558,
      },
      devfestLanding,
    ],
    highlights: {
      problem:
        "One buyer, many tickets: different types, different days, and often for different people.",
      role: "Frontend engineer on the DevFest Lagos team. I built the flow every attendee used to choose tickets and who they were for.",
      challenge:
        "Each ticket is its own object with its own recipient, checked before payment, so one checkout can cover a whole group.",
      outcome: "Powered ticketing for the 2025 conference and its 4,000+ attendees.",
    },
    caseStudy: true,
  },
  {
    slug: "atelier",
    name: "Atelier",
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
    tier: "also",
    image: {
      src: "/images/work/atelier-storefront.jpg",
      alt: "Atelier’s homepage: an autumn collection campaign under a spaced serif wordmark",
      width: 1920,
      height: 1200,
    },
    caseStudy: false,
  },
  {
    slug: "how-nigeria-works",
    name: "Three Arms",
    title: "Three Arms — How Nigeria Works",
    outcome:
      "A 3D explainer of Nigeria’s government where every constitutional claim cites its section.",
    summary:
      "An interactive 3D explainer of Nigeria’s federal government — the three arms, the three tiers, and how a bill becomes law. Each institution is a landmark you can orbit and take apart; unverified facts are marked as such, never guessed.",
    role: "Solo — design, 3D and content",
    year: 2026,
    stack: ["React", "Three.js", "React Three Fiber", "Vite"],
    links: {
      live: "https://nggovt.vercel.app",
      code: "https://github.com/Moyo-Made/how-nigeria-works",
    },
    tier: "also",
    image: {
      src: "/images/work/how-nigeria-works.jpg",
      alt: "Three Arms — a 3D model of the National Assembly on a plinth, with sourced key facts in the side panel",
      width: 1440,
      height: 900,
    },
    caseStudy: false,
  },
  {
    slug: "internconnect",
    name: "InternConnect",
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
      width: 1299,
      height: 731,
    },
    caseStudy: false,
  },
  {
    slug: "go-digital",
    name: "Go-Digital",
    title: "Go-Digital — Insurance Cards",
    outcome:
      "Moved insurance cards into Apple and Google Wallet — a 25% jump in adoption.",
    summary:
      "Laferla’s member cards went from plastic to the phone. I built the frontend and led the Apple Wallet pass integration with the backend developer.",
    role: "Frontend engineer at Laferla",
    team: "With a backend developer",
    year: 2024,
    stack: ["Next.js", "TypeScript", "Redux", "Apple Wallet", "Google Wallet"],
    links: {},
    tier: "also",
    image: {
      src: "/images/work/go-digital.png",
      alt: "Go-Digital digital insurance card platform",
      width: 1305,
      height: 658,
    },
    caseStudy: false,
  },
  {
    slug: "devfest-lagos-2024",
    name: "DevFest Lagos 2024",
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
      width: 2870,
      height: 1552,
    },
    caseStudy: false,
  },
  {
    slug: "mega-league",
    name: "Mega League",
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
    image: {
      src: "/images/work/mega-league.png",
      alt: "Mega League platform",
      width: 1350,
      height: 453,
    },
    caseStudy: false,
  },
  {
    slug: "california-housing-intelligence",
    name: "California Housing Intelligence",
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
      alt: "California Housing Intelligence — a $213,000 prediction for a synthetic block group, with the model’s average error shown underneath",
      width: 1440,
      height: 900,
    },
    caseStudy: false,
  },
  {
    slug: "careerfit",
    name: "CareerFit",
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
      width: 2880,
      height: 1558,
    },
    caseStudy: false,
  },
];
