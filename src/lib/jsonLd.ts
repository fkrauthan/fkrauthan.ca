// Helpers to build schema.org JSON-LD structured data for the site.
// All identifiers are absolute under SITE_URL so crawlers can merge the shared
// Person / WebSite entities referenced across pages via their @id.

import { EDUCATION, LANGUAGES, SKILL_GROUPS, SOCIAL_LINKS } from "./profile";
import type { CurrentPosition } from "./types";

export const SITE_URL = "https://www.fkrauthan.ca";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdNode = Record<string, unknown>;

/**
 * Core Person node. Social profiles only — no email/phone in public structured data.
 * Job title and employer are passed in from the resume data so they auto-update.
 */
export function person(position?: CurrentPosition | null): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Florian Krauthan",
    url: SITE_URL,
    image: `${SITE_URL}/img/fkrauthan-cartoon.jpg`,
    sameAs: SOCIAL_LINKS.map((link) => link.url),
  };

  if (position) {
    node.jobTitle = position.jobTitle;
    const worksFor: JsonLdNode = { "@type": "Organization", name: position.company };
    if (position.companyUrl) {
      worksFor.url = position.companyUrl;
    }
    node.worksFor = worksFor;
  }

  return node;
}

/** The site itself, published by the Person. */
export function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Florian Krauthan",
    inLanguage: "en-CA",
    publisher: { "@id": PERSON_ID },
  };
}

/** ProfilePage for the about-me route, with an enriched Person as mainEntity. */
export function profilePage(path: string, position?: CurrentPosition | null): JsonLdNode {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${path}#profilepage`,
    url: `${SITE_URL}${path}`,
    name: "About Florian Krauthan",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      ...person(position),
      alumniOf: EDUCATION.map((entry) => ({
        "@type": "EducationalOrganization",
        name: entry.institution,
      })),
      knowsAbout: [...new Set(SKILL_GROUPS.flatMap((group) => [group.category, ...group.items]))],
      knowsLanguage: LANGUAGES.map((entry) => ({
        "@type": "Language",
        name: entry.language,
      })),
    },
  };
}

export interface CollectionItem {
  name: string;
  url?: string;
  keywords?: string[];
}

/** A CollectionPage wrapping an ItemList of CreativeWorks authored by the Person. */
export function collectionPage(opts: {
  name: string;
  description: string;
  path: string;
  items: CollectionItem[];
}): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${opts.path}#collectionpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, index) => {
        const creativeWork: JsonLdNode = {
          "@type": "CreativeWork",
          name: item.name,
          author: { "@id": PERSON_ID },
        };
        if (item.url) {
          creativeWork.url = item.url;
        }
        if (item.keywords && item.keywords.length > 0) {
          creativeWork.keywords = item.keywords.join(", ");
        }
        return {
          "@type": "ListItem",
          position: index + 1,
          item: creativeWork,
        };
      }),
    },
  };
}

/**
 * Serialize a node (or array of nodes via @graph) into a ready-to-inject
 * `<script type="application/ld+json">` string. Escapes `<` so a literal
 * `</script>` inside any value cannot break out of the tag.
 */
export function serializeJsonLd(data: JsonLdNode | JsonLdNode[]): string {
  const document = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  const json = JSON.stringify(document).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}<\/script>`;
}
