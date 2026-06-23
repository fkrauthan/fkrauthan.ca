<script lang="ts">
  import type { MarkdownNode, ProjectLinks } from "$lib/types";
  import GlobeOutline from "~icons/ion/globe-outline";
  import LogoGithub from "~icons/ion/logo-github";

  import ActivePill from "../ActivePill.svelte";
  import MarkdownRenderer from "../MarkdownRenderer.svelte";
  import ProjectLink from "./ProjectLink.svelte";

  let {
    title,
    summary,
    developmentStart,
    isActive,
    baseTechnology,
    technologies,
    links,
  }: {
    title: string;
    summary: MarkdownNode;
    developmentStart: string;
    isActive: boolean;
    baseTechnology: string;
    technologies: string[];
    links: ProjectLinks;
  } = $props();

  const startYear = $derived(new Date(developmentStart).getFullYear());
  const github = $derived(links.github);
  const website = $derived(links.website);
</script>

{#snippet TechnologyItem(label: string)}
  <span class="rounded-xl bg-gray-300 dark:bg-gray-800 px-3 whitespace-nowrap mx-0.5 text-xs py-0.5">{label}</span>{" "}
{/snippet}

<div class="block rounded-md border p-5 bg-gray-50 dark:border-0 dark:bg-neutral-900 flex flex-col">
  <div class="flex justify-between mb-3">
    <div class="prose dark:prose-invert">
      <h3 style="margin-bottom: 0;">
        {title} <sup class="text-sm text-gray-500 dark:text-gray-400">{baseTechnology}</sup>
      </h3>
      <small>Started {startYear}</small>
    </div>
    <div>
      <ActivePill active={isActive} />
    </div>
  </div>

  <div class="prose dark:prose-invert">
    <MarkdownRenderer ast={summary} />
  </div>

  <div class="flex-1"></div>
  <div class="mt-5 flex-none">
    <div class="flex-none">
      <div class="flex">
        <div class="flex-1 self-center" style="min-height: 32px;">
          {@render TechnologyItem(baseTechnology)}
          {#each technologies as technology}
            {@render TechnologyItem(technology)}
          {/each}
        </div>
        <div class="flex-none self-end">
          {#if website}
            <ProjectLink href={website} title={`${title} Project Website`} icon={GlobeOutline} />
          {/if}
          {#if github}
            <ProjectLink href={github} title={`${title} GitHub`} icon={LogoGithub} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
