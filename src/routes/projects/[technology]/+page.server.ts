import { loadProjectsData } from "$lib/projects";
import { loadProjectsPage } from "$lib/projectsPage";

import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return await loadProjectsPage(params.technology);
};

export const entries: EntryGenerator = async () => {
  const data = await loadProjectsData();

  return [
    ...data.base_technologies.map(({ slug }) => ({ technology: slug })),
    { technology: "active" },
    { technology: "past" },
  ];
};

export const prerender = true;
