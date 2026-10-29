/**
 * The site's absolute URL, for metadata, the sitemap and JSON-LD. Server-only.
 *
 * moyomade.me redirects to www.moyomade.me (Vercel → Domains), so www is the
 * address that actually serves pages and the one canonical URLs must name.
 * To make the bare domain canonical instead, flip that redirect in Vercel
 * first, then change this one line.
 */
const productionUrl = "https://www.moyomade.me";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? productionUrl
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
