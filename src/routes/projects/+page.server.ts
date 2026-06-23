import { loadProjectsPage } from "$lib/projectsPage";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await loadProjectsPage();
};
