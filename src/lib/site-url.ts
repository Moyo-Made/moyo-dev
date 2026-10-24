/**
 * The site's absolute URL, for metadata, the sitemap and JSON-LD. Server-only.
 *
 * Set NEXT_PUBLIC_SITE_URL once there's a custom domain. Until then, Vercel's
 * production URL is used on Vercel builds, and localhost everywhere else.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
