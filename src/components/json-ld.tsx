import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

/**
 * Person + WebSite structured data, so search engines know who the site is
 * about. `<` is escaped so no string in the data can close the script tag.
 */
export function PersonJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    alternateName: site.shortName,
    jobTitle: site.role,
    description: site.description,
    url: siteUrl,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    knowsAbout: [...new Set(projects.flatMap((p) => p.stack))],
    sameAs: Object.values(site.socials),
  };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        url: siteUrl,
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
