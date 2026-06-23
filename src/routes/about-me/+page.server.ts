import { deriveCurrentPosition, loadResumeData } from "$lib/resume";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const resume = await loadResumeData();
  return {
    ...resume,
    currentPosition: deriveCurrentPosition(resume),
  };
};
