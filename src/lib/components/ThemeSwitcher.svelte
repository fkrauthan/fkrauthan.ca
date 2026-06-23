<script lang="ts">
  import { themeStore } from "$lib/theme.svelte";
  import clsx from "clsx";
  import { onMount } from "svelte";

  let { class: className = undefined }: { class?: string } = $props();

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  function toggleTheme() {
    themeStore.setTheme(themeStore.resolved === "dark" ? "light" : "dark");
  }
</script>

<button aria-label="Toggle Dark Mode" type="button" class={clsx("ml-2 p-3 h-12 w-12", className)} onclick={toggleTheme}>
  {#if mounted}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      class="h-6 w-6 text-gray-800 dark:text-gray-200">
      {#if themeStore.resolved === "dark"}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      {:else}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      {/if}
    </svg>
  {/if}
</button>
