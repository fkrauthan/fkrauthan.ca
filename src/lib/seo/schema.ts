// Pure mappers that turn the site's canonical data (resume / profile / projects /
// opensource) into schema.org JSON-LD graphs. Nothing here re-types content that
// is rendered on a page: every literal flows from the data modules below, so a
// change to a skill, job title or project updates both the markup and the
// structured data. The full `Person` node is emitted on `/about-me` only — every
// other page references it by its stable `@id`.
import { EDUCATION, LANGUAGES, PROFILE, SKILL_GROUPS, SOCIAL_LINKS } from "../profile";
import type { CurrentPosition, MarkdownNode, OpensourceProject, ProjectTileData } from "../types";

/** Canonical host — the apex redirects to www, so every `@id`/`url` lives here. */
export const SITE_URL = "https://www.fkrauthan.ca";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const LANG = "en-CA";
const SITE_DESCRIPTION =
  "Florian Krauthan, a Vancouver based software developer, who loves to eat, breathe and sleep technology to make the world a better place.";
const HOME_DESCRIPTION = "Florian Krauthan, a Vancouver based software developer.";
const ABOUT_DESCRIPTION = "Learn more about Florian Krauthan, including background, skills and interests.";

/** Display labels for technology bases that double as schema programmingLanguage. */
const LANGUAGE_LABELS: Record<string, string> = {
  Javascript: "JavaScript",
};

type Node = Record<string, unknown>;

const personRef = (): Node => ({ "@id": PERSON_ID });
const websiteRef = (): Node => ({ "@id": WEBSITE_ID });

/** Absolute URL for a route path; the root keeps its trailing slash. */
function pageUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function languageLabel(base: string): string {
  return LANGUAGE_LABELS[base] ?? base;
}

/** Flatten a markdown AST's first paragraph into a single description string. */
function nodeText(node: MarkdownNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }
  return (node.children ?? []).map(nodeText).join("");
}

function firstParagraphText(root: MarkdownNode): string {
  const paragraph = (root.children ?? []).find(({ type }) => type === "paragraph");
  return nodeText(paragraph ?? root)
    .replace(/\s+/g, " ")
    .trim();
}

function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** The site itself — safe to include on every page; published by the Person. */
function webSiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Florian Krauthan",
    description: SITE_DESCRIPTION,
    inLanguage: LANG,
    publisher: personRef(),
  };
}

function breadcrumbNode(id: string, trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: pageUrl(entry.path),
    })),
  };
}

/**
 * Full Person node, built entirely from the about-me data modules. Emitted on
 * `/about-me` only — the one page where all of this content is visible.
 */
export function personSchema(position: CurrentPosition | null): Node {
  const node: Node = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    url: pageUrl("/about-me"),
    image: `${SITE_URL}/img/fkrauthan.jpg`,
    email: `mailto:${PROFILE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location.city,
      addressRegion: PROFILE.location.region,
      addressCountry: PROFILE.location.country,
    },
    knowsLanguage: LANGUAGES.map(({ language }) => language),
    knowsAbout: [...new Set(SKILL_GROUPS.flatMap((group) => [group.category, ...group.items]))],
    alumniOf: EDUCATION.map(({ institution }) => ({ "@type": "EducationalOrganization", name: institution })),
    sameAs: SOCIAL_LINKS.map(({ url }) => url),
  };

  if (position) {
    node.jobTitle = position.jobTitle;
    const worksFor: Node = { "@type": "Organization", name: position.company };
    if (position.companyUrl) {
      worksFor.url = position.companyUrl;
    }
    node.worksFor = worksFor;
  }

  return node;
}

/** `/` — WebSite + WebPage, with a bare reference to the Person. */
export function homePageGraph(): Node {
  const url = pageUrl("/");
  return graph([
    webSiteNode(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: "Welcome | Florian Krauthan",
      description: HOME_DESCRIPTION,
      isPartOf: websiteRef(),
      about: personRef(),
      primaryImageOfPage: `${SITE_URL}/img/fkrauthan-cartoon.jpg`,
      inLanguage: LANG,
    },
  ]);
}

/** `/about-me` — ProfilePage + the one full Person + breadcrumb. */
export function aboutMeGraph(position: CurrentPosition | null): Node {
  const url = pageUrl("/about-me");
  return graph([
    webSiteNode(),
    {
      "@type": "ProfilePage",
      "@id": `${url}#webpage`,
      url,
      name: "About me | Florian Krauthan",
      description: ABOUT_DESCRIPTION,
      isPartOf: websiteRef(),
      mainEntity: personRef(),
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: LANG,
    },
    personSchema(position),
    breadcrumbNode(`${url}#breadcrumb`, [
      { name: "Home", path: "/" },
      { name: "About me", path: "/about-me" },
    ]),
  ]);
}

/** Pick the right CreativeWork type for one of my own projects from its data. */
function projectItemNode(project: ProjectTileData): Node {
  const { title, development_start, in_active_development, technology_base, links } = project.meta;
  const website = links.website;
  const github = links.github;
  const isPlayStore = !!website && website.includes("play.google.com");

  const node: Node = {
    name: title,
    description: firstParagraphText(project.markdown_summary),
    programmingLanguage: languageLabel(technology_base),
    datePublished: String(new Date(development_start).getFullYear()),
    creativeWorkStatus: in_active_development ? "Active" : "Archived",
    author: personRef(),
  };

  if (isPlayStore) {
    node["@type"] = "MobileApplication";
    node.operatingSystem = "Android";
    node.downloadUrl = website;
    if (github) {
      node.codeRepository = github;
    }
    return node;
  }

  if (website) {
    node.url = website;
  }
  if (github) {
    node.codeRepository = github;
  }

  if (website && github) {
    node["@type"] = ["WebApplication", "SoftwareSourceCode"];
  } else if (website) {
    node["@type"] = "WebApplication";
  } else if (github) {
    node["@type"] = "SoftwareSourceCode";
  } else {
    node["@type"] = "CreativeWork";
  }

  return node;
}

function itemListNode(id: string, items: Node[], ordered: boolean): Node {
  return {
    "@type": "ItemList",
    "@id": id,
    ...(ordered ? { itemListOrder: "https://schema.org/ItemListOrderDescending" } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
  };
}

/** `/projects` (and its technology filters) — CollectionPage + ItemList of my work. */
export function projectsCollectionGraph(opts: {
  path: string;
  name: string;
  description: string;
  breadcrumb: { name: string; path: string }[];
  projects: ProjectTileData[];
}): Node {
  const url = pageUrl(opts.path);
  const listId = `${url}#projectlist`;
  return graph([
    webSiteNode(),
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: opts.name,
      description: opts.description,
      isPartOf: websiteRef(),
      about: personRef(),
      mainEntity: { "@id": listId },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: LANG,
    },
    breadcrumbNode(`${url}#breadcrumb`, opts.breadcrumb),
    itemListNode(listId, opts.projects.map(projectItemNode), true),
  ]);
}

/** One upstream project I contributed to — I'm the contributor, not the author. */
function contributionNode(project: OpensourceProject): Node {
  const { title, link_github, technology_base } = project.meta;
  const node: Node = {
    "@type": "SoftwareSourceCode",
    name: title,
    description: firstParagraphText(project.markdown),
    programmingLanguage: languageLabel(technology_base),
    contributor: personRef(),
  };
  if (link_github) {
    node.codeRepository = link_github;
  }
  return node;
}

/** `/opensource` — same shape as projects, but upstream projects I contributed to. */
export function opensourceCollectionGraph(opts: {
  name: string;
  description: string;
  projects: OpensourceProject[];
}): Node {
  const url = pageUrl("/opensource");
  const listId = `${url}#contriblist`;
  return graph([
    webSiteNode(),
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: opts.name,
      description: opts.description,
      isPartOf: websiteRef(),
      about: personRef(),
      mainEntity: { "@id": listId },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: LANG,
    },
    breadcrumbNode(`${url}#breadcrumb`, [
      { name: "Home", path: "/" },
      { name: "Open Source", path: "/opensource" },
    ]),
    itemListNode(listId, opts.projects.map(contributionNode), false),
  ]);
}
