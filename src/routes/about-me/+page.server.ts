import { loadResumeData } from "$lib/resume";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await loadResumeData();
};
