<script lang="ts">
  import type { BaseTechnology } from "$lib/types";
  import clsx from "clsx";

  let {
    technologies,
    activeTechnology = "",
  }: {
    technologies: BaseTechnology[];
    activeTechnology?: string;
  } = $props();
</script>

{#snippet TechnologyFilterOption(slug: string, name: string)}
  {@const isActive = slug === activeTechnology}
  {@const urlSuffix = !slug ? "" : `/${slug}`}
  <li class="inline-block">
    <a
      href={`/projects${urlSuffix}`}
      class={clsx(
        "block text-center px-4 py-1 text-lg",
        "rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-500",
        isActive && "bg-yellow-300 dark:bg-yellow-600"
      )}>
      {name}
    </a>
  </li>
{/snippet}

{#snippet Separator()}
  <li class="inline-block">
    <div class="text-center px-2 py-1 text-lg text-gray-400">&bull;</div>
  </li>
{/snippet}

<div class="text-center">
  <ul class="space-x-4">
    {@render TechnologyFilterOption("", "All")}

    {@render Separator()}

    {@render TechnologyFilterOption("active", "Active")}
    {@render TechnologyFilterOption("past", "Past")}

    {@render Separator()}

    {#each technologies as { slug, name }}
      {@render TechnologyFilterOption(slug, name)}
    {/each}
  </ul>
</div>
