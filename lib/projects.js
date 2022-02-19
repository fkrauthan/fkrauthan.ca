import { promises as fs } from "fs";
import path from "path";

import { parseMarkdown } from "./markdown";

const yaml = require("js-yaml");

const dataProjectsPath = path.join(process.cwd(), "data", "projects");
const technologyToSlugMap = {
  "C++": "cpp",
};

function createTechnologySlug(technology) {
  return (technologyToSlugMap[technology] || technology).toLowerCase();
}

function assembleProjectPath(technology, slug) {
  const technologySlug = createTechnologySlug(technology);
  return `${technologySlug}/${slug}`;
}

async function findAllProjects() {
  return (await fs.readdir(dataProjectsPath)).filter((file) => file.endsWith(".md"));
}

function createSummary(markdownAst) {
  const separatorElementPosition = markdownAst.children.findIndex(
    ({ type, value }) => type === "html" && value === "<!--more-->"
  );
  if (separatorElementPosition === -1) {
    return {
      type: "root",
      children: [markdownAst.children.find(({ type }) => type === "paragraph")],
    };
  }

  return {
    type: "root",
    children: markdownAst.children.filter(
      ({ type }, index) => type === "paragraph" && index < separatorElementPosition
    ),
  };
}

async function getProjectData(file) {
  const dataProjectPath = path.join(dataProjectsPath, file);
  const fileContent = await fs.readFile(dataProjectPath, "utf8");

  const [, metaRaw, content] = /^---\n((?:^[^-].+\n)+)---\n?((?:.*\n*)*)$/gm.exec(fileContent);
  const [, , slug] = /^(\d+)-(.+)\.md$/.exec(file);

  const meta = yaml.load(metaRaw);
  const markdown = await parseMarkdown(content);

  return {
    slug,
    technology_slug: createTechnologySlug(meta.technology_base),
    path: assembleProjectPath(meta.technology_base, slug),

    meta: {
      ...meta,
      in_active_development: meta.in_active_development.toLowerCase() === "yes",
    },
    markdown,
    markdown_summary: createSummary(markdown),
  };
}

function sort_projects(projectA, projectB) {
  // if (projectA.meta.in_active_development && !projectB.meta.in_active_development) {
  //   return -1;
  // } else if (!projectA.meta.in_active_development && projectB.meta.in_active_development) {
  //   return 1;
  // }

  const devStartA = new Date(projectA.meta.development_start);
  const devStartB = new Date(projectB.meta.development_start);
  return devStartB - devStartA;
}

export async function loadProjectsData(base_technology_slug = null) {
  const projectFiles = await findAllProjects();
  const data = await Promise.all(projectFiles.map((file) => getProjectData(file)));

  return {
    base_technologies: data
      .map(({ technology_slug, meta: { technology_base } }) => ({
        name: technology_base,
        slug: technology_slug,
      }))
      .filter(({ slug }, index, array) => array.findIndex(({ slug: arraySlug }) => slug === arraySlug) === index),
    projects: data
      .filter(
        ({ technology_slug, meta: { in_active_development } }) =>
          !base_technology_slug ||
          base_technology_slug === technology_slug ||
          (base_technology_slug === "active" && in_active_development) ||
          (base_technology_slug === "past" && !in_active_development)
      )
      .sort(sort_projects),
  };
}
