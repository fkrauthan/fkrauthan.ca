<script lang="ts">
  import Layout from "$lib/components/Layout.svelte";
  import MarkdownRenderer from "$lib/components/MarkdownRenderer.svelte";
  import ProjectLink from "$lib/components/projects/ProjectLink.svelte";
  import SectionHeader from "$lib/components/resume/SectionHeader.svelte";
  import { opensourceCollectionGraph } from "$lib/seo/schema";
  import styles from "$lib/styles/opensource.module.css";
  import type { MarkdownNode } from "$lib/types";
  import LogoGithub from "~icons/ion/logo-github";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let jsonLd = $derived(
    opensourceCollectionGraph({
      name: "Open-source | Florian Krauthan",
      description:
        "An assortment of Opensource contributions made by Florian Krauthan to improve and fix cool opensource apps and libraries.",
      projects: data.projects,
    })
  );
</script>

{#snippet Project(
  title: string,
  markdown: MarkdownNode,
  github: string | undefined,
  baseTechnology: string,
  technologies: string[]
)}
  {@const finalTitle = title.replace("/", " / ")}
  <div class="p-4 rounded-md border bg-gray-50 dark:border-0 dark:bg-neutral-900">
    <div class="flex justify-between">
      <div class="prose dark:prose-invert">
        <h3 style="margin-bottom: 0;">
          {#if github}
            <a href={github} style="text-decoration: none;" target="_blank" rel="noopener noreferrer">{finalTitle}</a>
          {:else}
            <span>{finalTitle}</span>
          {/if}
        </h3>
        <small>
          {#each [baseTechnology, ...technologies] as technology, index}
            <span
              >{#if index > 0}{", "}{/if}{technology}</span>
          {/each}
        </small>
      </div>
      <div class="pl-2">
        {#if github}
          <ProjectLink href={github} title={`${finalTitle} GitHub`} icon={LogoGithub} />
        {/if}
      </div>
    </div>

    <div class={`prose dark:prose-invert ${styles.markdown} mt-3`}>
      <MarkdownRenderer ast={markdown} />
    </div>
  </div>
{/snippet}

<Layout
  pageTitle="Open-source"
  pageDescription="An assortment of Opensource contributions made by Florian Krauthan to improve and fix cool opensource apps and libraries."
  {jsonLd}>
  <div class="flex flex-col md:m-12 md:my-8 shadow-2xl">
    <div class="content w-full p-6 sm:p-12">
      <div class="prose dark:prose-invert">
        <SectionHeader title="Open-source Contributions" />
      </div>

      <blockquote
        class="my-6 p-4 italic border-l-4 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-500 quote">
        <p>The following page lists a couple of my open-source contributions over the years.</p>
      </blockquote>

      <div class="mb-10">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
          {#each data.projects as { slug, markdown, meta: { title, link_github, technology_base, technologies } } (slug)}
            {@render Project(title, markdown, link_github, technology_base, technologies)}
          {/each}
        </div>
      </div>
    </div>
  </div>
</Layout>
