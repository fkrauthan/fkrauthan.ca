import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

import { parseMarkdown } from "./markdown";
import type { MarkdownNode, Project, ProjectsData } from "./types";

const dataProjectsPath = path.join(process.cwd(), "data", "projects");
const technologyToSlugMap: Record<string, string> = {
  "C++": "cpp",
};

function createTechnologySlug(technology: string): string {
  return (technologyToSlugMap[technology] || technology).toLowerCase();
}

function assembleProjectPath(technology: string, slug: string): string {
  const technologySlug = createTechnologySlug(technology);
  return `${technologySlug}/${slug}`;
}

async function findAllProjects(): Promise<string[]> {
  return (await fs.readdir(dataProjectsPath)).filter((file) => file.endsWith(".md"));
}

function createSummary(markdownAst: MarkdownNode): MarkdownNode {
  const children = markdownAst.children ?? [];
  const separatorElementPosition = children.findIndex(({ type, value }) => type === "html" && value === "<!--more-->");
  if (separatorElementPosition === -1) {
    return {
      type: "root",
      children: [children.find(({ type }) => type === "paragraph")].filter(Boolean) as MarkdownNode[],
    };
  }

  return {
    type: "root",
    children: children.filter(({ type }, index) => type === "paragraph" && index < separatorElementPosition),
  };
}

async function getProjectData(file: string): Promise<Project> {
  const dataProjectPath = path.join(dataProjectsPath, file);
  const fileContent = await fs.readFile(dataProjectPath, "utf8");

  const { content, data: meta } = matter(fileContent);
  const [, , slug] = /^(\d+)-(.+)\.md$/.exec(file) as RegExpExecArray;

  const markdown = await parseMarkdown(content);

  return {
    slug,
    technology_slug: createTechnologySlug(meta.technology_base),
    path: assembleProjectPath(meta.technology_base, slug),

    meta: {
      ...meta,
      links: meta.links ?? {},
      in_active_development: String(meta.in_active_development).toLowerCase() === "yes",
    } as Project["meta"],
    markdown,
    markdown_summary: createSummary(markdown),
  };
}

function sort_projects(projectA: Project, projectB: Project): number {
  // if (projectA.meta.in_active_development && !projectB.meta.in_active_development) {
  //   return -1;
  // } else if (!projectA.meta.in_active_development && projectB.meta.in_active_development) {
  //   return 1;
  // }

  const devStartA = new Date(projectA.meta.development_start);
  const devStartB = new Date(projectB.meta.development_start);
  return devStartB.getTime() - devStartA.getTime();
}

export async function loadProjectsData(base_technology_slug: string | null = null): Promise<ProjectsData> {
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
