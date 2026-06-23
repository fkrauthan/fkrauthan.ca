import { loadOpensourceData } from "$lib/opensource";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await loadOpensourceData();
};
