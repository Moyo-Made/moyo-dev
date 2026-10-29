import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Turbopack's on-disk cache kept serving the previous globals.css after
    // it changed, both in `next dev` and on Vercel, where the cache is
    // restored between deploys. The site compiles in seconds, so every run
    // starts fresh instead.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Case studies are imported from src/content/work, not used as routes, so
// pageExtensions stays at its default. Plugins are named as strings so
// Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
