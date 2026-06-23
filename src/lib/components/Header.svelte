<script lang="ts">
  import clsx from "clsx";
  import type { Snippet } from "svelte";
  import CloseOutline from "~icons/ion/close-outline";
  import MenuOutline from "~icons/ion/menu-outline";

  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import ThemedIcon from "./ThemedIcon.svelte";

  let {
    content,
    headerClassName,
    hideTopNavigation = false,
  }: {
    content?: Snippet;
    headerClassName?: string;
    hideTopNavigation?: boolean;
  } = $props();

  let showMobileMenu = $state(false);
  function onMenuToggle() {
    showMobileMenu = !showMobileMenu;
  }
</script>

{#snippet MenuLink(route: string, title: string)}
  <a
    href={route}
    class="block sm:inline text-gray-800 dark:text-gray-300 dark:hover:text-yellow-400 font-bold hover:text-yellow-600 text-lg sm:text-center w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1">
    {title}
  </a>
{/snippet}

<header class={clsx("header w-full", content && "min-h-screen", "flex flex-col justify-between", headerClassName)}>
  <nav
    class="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-transparent shadow sm:shadow-none">
    <div
      class="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
      <a href="/" class="no-underline h-5 text-2xl font-semibold mb-3">Florian Krauthan</a>
      <ThemeSwitcher class="block sm:hidden" />

      {#if !hideTopNavigation}
        <button
          id="menuBtn"
          class="hamburger block sm:hidden focus:outline-none"
          type="button"
          onclick={onMenuToggle}
          aria-label="Show Menu">
          {#if !showMobileMenu}<ThemedIcon component={MenuOutline} width="28px" height="30px" />{/if}
          {#if showMobileMenu}<ThemedIcon component={CloseOutline} width="28px" height="30px" />{/if}
        </button>
      {/if}
    </div>
    {#if !hideTopNavigation}
      <div
        id="menu"
        class={clsx(
          "w-full pl-5 sm:pl-0 sm:w-auto self-end sm:self-center",
          !showMobileMenu && "hidden",
          "sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0"
        )}>
        {@render MenuLink("/about-me", "About Me")}
        {@render MenuLink("/projects", "Projects")}
        {@render MenuLink("/opensource", "Open-source")}

        <ThemeSwitcher class="hidden sm:block" />
      </div>
    {/if}
    {#if hideTopNavigation}<ThemeSwitcher class="hidden sm:block" />{/if}
  </nav>

  {@render content?.()}
</header>
