import { loadCurrentPosition } from "$lib/resume";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    currentPosition: await loadCurrentPosition(),
  };
};
