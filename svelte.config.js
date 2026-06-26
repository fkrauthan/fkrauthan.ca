import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),

  kit: {
    adapter: adapter({
      pages: "out",
      assets: "out",
      fallback: "404.html",
      precompress: true,
      strict: true,
    }),
    alias: {
      $assets: "src/assets",
    },
  },
};

export default config;
