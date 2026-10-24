import { cacheLife } from "next/cache";
import { site } from "@/data/site";
import { changelog } from "@/data/changelog";

export interface LastShipped {
  name: string;
  href: string;
  /** ISO timestamp, or YYYY-MM when it comes from the changelog fallback. */
  at: string;
}

/** This repo always has the newest push while the site is being built. */
const IGNORED = new Set(["moyo-dev"]);

const user = site.socials.github.split("/").pop();

/**
 * The most recently pushed public repo, for the hero status bar.
 *
 * Fetched at build time and refreshed daily — part of the static page, never
 * a request-time call. If GitHub can't be reached, falls back to the newest
 * "shipped" entry in the changelog so the hero never renders a gap.
 */
export async function getLastShipped(): Promise<LastShipped> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=pushed&per_page=10&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);

    const repos: {
      name: string;
      fork: boolean;
      archived: boolean;
      pushed_at: string;
      html_url: string;
    }[] = await res.json();

    const repo = repos.find(
      (r) => !r.fork && !r.archived && !IGNORED.has(r.name),
    );
    if (repo) {
      return { name: repo.name, href: repo.html_url, at: repo.pushed_at };
    }
  } catch {
    // Fall through to the changelog.
  }

  const entry = changelog.find(
    (c) => c.action === "shipped" && !IGNORED.has(c.name),
  )!;
  return { name: entry.name, href: entry.href ?? site.socials.github, at: entry.month };
}
