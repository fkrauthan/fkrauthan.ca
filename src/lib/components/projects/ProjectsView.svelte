<script lang="ts">
  import { page } from "$app/state";
  import Layout from "$lib/components/Layout.svelte";
  import ProjectTile from "$lib/components/projects/ProjectTile.svelte";
  import TechnologyFilter from "$lib/components/projects/TechnologyFilter.svelte";
  import SectionHeader from "$lib/components/resume/SectionHeader.svelte";
  import { collectionPage } from "$lib/jsonLd";
  import type { BaseTechnology, ProjectTileData } from "$lib/types";

  let {
    activeTechnology,
    technologies,
    projects,
  }: {
    activeTechnology: string;
    technologies: BaseTechnology[];
    projects: ProjectTileData[];
  } = $props();

  function getPageTitle(activeTechnology: string, technologies: BaseTechnology[]): string {
    if (!activeTechnology) {
      return "Projects";
    }

    if (activeTechnology === "active") {
      return "Active - Projects";
    } else if (activeTechnology === "past") {
      return "Past - Projects";
    } else {
      const technology = technologies.find(({ slug }) => slug === activeTechnology);
      return `${technology!.name} - Projects`;
    }
  }

  function getPageDescription(activeTechnology: string, technologies: BaseTechnology[]): string {
    if (!activeTechnology) {
      return "An array of projects done by Florian Krauthan including the full range of development.";
    }

    if (activeTechnology === "active") {
      return "An array of current projects done by Florian Krauthan including the full range of development.";
    } else if (activeTechnology === "past") {
      return "An array of past projects done by Florian Krauthan including the full range of development.";
    } else {
      const technology = technologies.find(({ slug }) => slug === activeTechnology);
      return `An array of projects written in ${technology!.name} developed from start to finish.`;
    }
  }

  let jsonLd = $derived(
    collectionPage({
      name: getPageTitle(activeTechnology, technologies),
      description: getPageDescription(activeTechnology, technologies),
      path: page.url.pathname,
      items: projects.map(({ meta }) => ({
        name: meta.title,
        url: meta.links.website || meta.links.github,
        keywords: [meta.technology_base, ...meta.technologies],
      })),
    })
  );
</script>

<Layout
  pageTitle={getPageTitle(activeTechnology, technologies)}
  pageDescription={getPageDescription(activeTechnology, technologies)}
  {jsonLd}>
  <div class="flex flex-col md:m-12 md:my-8 shadow-2xl">
    <div class="content w-full p-6 sm:p-12">
      <div class="prose dark:prose-invert">
        <SectionHeader title="Projects" />
      </div>

      <blockquote
        class="my-6 p-4 italic border-l-4 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-500 quote">
        <p>
          All projects listed below are hobby projects only. To see some of my freelance work please head over to{" "}
          <a
            href="https://cogindo.net"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
            cogindo.net
          </a>
          .
        </p>
      </blockquote>

      <div class="mt-6 mb-10">
        <TechnologyFilter {technologies} {activeTechnology} />
      </div>

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each projects as { slug, markdown_summary, meta: { title, development_start, in_active_development, technology_base, technologies, links } } (slug)}
          <ProjectTile
            {title}
            summary={markdown_summary}
            developmentStart={development_start}
            isActive={in_active_development}
            {technologies}
            baseTechnology={technology_base}
            {links} />
        {/each}
      </div>
    </div>
  </div>
</Layout>
