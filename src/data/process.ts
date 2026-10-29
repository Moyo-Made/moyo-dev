/**
 * "How I work" — five steps, each shown on one project (Social Shake) so the
 * section reads as a story, not a list of virtues. Every example is backed
 * by the Social Shake case study.
 */
export const steps = [
  {
    title: "Understand the problem",
    body: "Find the real requirement under the stated one, before writing any code.",
    example:
      "It was pitched as a UGC marketplace. The real problem was trust: someone always had to go first.",
  },
  {
    title: "Agree the scope",
    body: "Decide what the first release has to get right, and what can wait.",
    example:
      "Writing a brief was the hardest moment for brands, so it became four short steps with a live cost estimate.",
  },
  {
    title: "Build it properly",
    body: "Usability, performance and maintainability are part of the work, not a later phase.",
    example:
      "Videos up to 100MB go up in 1MB chunks, because a single request on Vercel can’t carry them.",
  },
  {
    title: "Test, refine, ship",
    body: "Make sure the product keeps its promises once real people use it.",
    example:
      "Payment webhooks are recorded as they arrive, so one delivered twice is skipped, not processed again.",
  },
  {
    title: "Keep everyone informed",
    body: "Clear updates in plain language, and a written record of what I’d change next.",
    example:
      "The write-up ends with what I’d fix: card holds expire after about a week, so long projects should charge up front.",
  },
];
