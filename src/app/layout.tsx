import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Fonts are self-hosted from npm packages rather than fetched from Google
// Fonts at build time, so a slow connection can't swap in a fallback.
const instrumentSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.tagline,
  authors: [{ name: site.name, url: siteUrl }],
  // Canonical URLs are set per page — one here would be inherited by every
  // route and point them all at the home page.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body id="top" className="flex min-h-full flex-col">
        <a
          href="#main"
          className="label-mono fixed top-2 left-2 z-[60] -translate-y-20 bg-signal px-3 py-2 text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteNav />
        {/* Made inert by SiteNav while the menu is open. */}
        <div id="page" className="flex flex-1 flex-col">
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
