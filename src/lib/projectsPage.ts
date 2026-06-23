import { loadProjectsData } from "./projects";
import type { ProjectsPageData } from "./types";

export async function loadProjectsPage(technology?: string): Promise<ProjectsPageData> {
  const data = await loadProjectsData(technology ?? null);

  return {
    technologies: data.base_technologies,
    projects: data.projects.map(
      ({
        slug,
        markdown_summary,
        meta: { title, development_start, in_active_development, technology_base, technologies, links = {} },
      }) => ({
        slug,
        markdown_summary,
        meta: {
          title,
          development_start,
          in_active_development,
          technology_base,
          technologies,
          links,
        },
      })
    ),

    activeTechnology: technology || "",
  };
}
