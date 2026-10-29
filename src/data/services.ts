/**
 * What a client can hire for. Each offer carries one line of evidence from
 * shipped work, so none of it is a promise on its own. `href` points at the
 * evidence where it's on the site.
 */
export const services: {
  title: string;
  body: string;
  example: string;
  href?: string;
}[] = [
  {
    title: "Product development",
    body: "Turning a defined product idea into a working web application, from the data model to the screens people use.",
    example: "Social Shake, built end to end for a client.",
    href: "/work/social-shake",
  },
  {
    title: "SaaS feature development",
    body: "Building features, dashboards, integrations and workflows inside a product that already has users.",
    example: "Apple and Google Wallet passes at Laferla; logistics dashboards at Straqa.",
  },
  {
    title: "Frontend engineering",
    body: "Interfaces that are fast, accessible and easy to maintain, built with React, Next.js and TypeScript.",
    example: "The DevFest Lagos 2024 site, where accessibility went from 82% to 96%.",
  },
  {
    title: "AI-powered features",
    body: "Adding AI to a product where it solves a real problem for users, with the cost and the failures handled.",
    example: "Gixel’s campaign generation, with OpenAI, Gemini and Replicate behind it.",
    href: "/work/gixel",
  },
];
