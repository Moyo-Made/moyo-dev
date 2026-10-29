/**
 * Technical writing only. Personal essays stay on the general site
 * (moyomade.vercel.app). Newest first; titles and dates do the work.
 */

export interface Note {
  title: string;
  /** ISO date. */
  date: string;
  platform: "Hashnode" | "Medium" | "Substack";
  href: string;
}

export const notes: Note[] = [
  {
    title: "You’ve Seen This in ChatGPT, You Just Didn’t Know the Name",
    date: "2026-05-06",
    platform: "Hashnode",
    href: "https://madevblog.hashnode.dev/you-ve-seen-this-in-chatgpt-you-just-didn-t-know-the-name",
  },
  {
    title: "From UI to AI: Where I Begin",
    date: "2026-05-03",
    platform: "Hashnode",
    href: "https://madevblog.hashnode.dev/from-ui-to-ai-where-i-begin",
  },
  {
    title: "Aim for the Bigger Picture in Tech: It’s More Than Just the Money",
    date: "2024-10-20",
    platform: "Hashnode",
    href: "https://madevblog.hashnode.dev/aim-for-the-bigger-picture-in-tech-its-more-than-just-the-money",
  },
  {
    title: "Masking vs Encryption in JavaScript: A Guide for Secure Data Handling",
    date: "2024-07-11",
    platform: "Medium",
    href: "https://medium.com/@adegbitemoyomade2004/masking-vs-encryption-in-javascript-a-comprehensive-guide-for-secure-data-handling-9c5032326461",
  },
];
