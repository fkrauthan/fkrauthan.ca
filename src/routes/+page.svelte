<script lang="ts">
  import Layout from "$lib/components/Layout.svelte";
  import { person, website } from "$lib/jsonLd";
  import styles from "$lib/styles/index.module.css";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

{#snippet TechnologyListItem(title: string)}
  <li class={[styles.list__item, "xl:pl-3"]}>{title}</li>
{/snippet}

{#snippet headerContent()}
  <div class="flex flex-col justify-center h-full py-12">
    <div class="self-center items-center flex flex-col sm:flex-row w-full md:w-5/6 xl:w-2/3 px-4 sm:px-0">
      <div class="w-full text-center sm:text-left sm:w-1/2 py-12 sm:px-8">
        <h1 class="tracking-wide text-yellow-500 text-2xl mb-6">
          Welcome:{" "}
          <span class="text-gray-800 dark:text-gray-400 font-bold tracking tracking-widest">and hello</span>
        </h1>
        <h2 class="font-bold tracking-widest text-4xl">I speak...</h2>
        <span class={[styles.container, "block font-light text-browngray text-2xl my-6"]}>
          <ul class={styles.list}>
            {@render TechnologyListItem("English")}
            {@render TechnologyListItem("German")}
            {@render TechnologyListItem("Rust")}
            {@render TechnologyListItem("Kotlin/Java")}
            {@render TechnologyListItem("JavaScript")}
            {@render TechnologyListItem("PHP")}
            {@render TechnologyListItem("Kubernetes/Docker")}
          </ul>
        </span>
        <p class="font-bold tracking-widest text-4xl">...what about you!</p>
      </div>
      <div class="w-full sm:w-1/2">
        <img src="/img/fkrauthan-cartoon.jpg" alt="Portrait of Florian Krauthan" class="rounded-full" />
      </div>
    </div>
  </div>
  <div class="flex flex-row w-full justify-center pb-12">
    <a
      href="/about-me"
      class="px-10 py-2 bg-yellow-500 dark:bg-yellow-600 dark:hover:border-red dark:hover:bg-yellow-500 text-center rounded-full shadow-md text-lg hover:bg-yellow-100 hover:border-red mx-2">
      Get to know me
    </a>

    <a
      href="/projects"
      class="px-10 py-2 bg-yellow-500 dark:bg-yellow-600 dark:hover:border-red dark:hover:bg-yellow-500 text-center rounded-full shadow-md text-lg hover:bg-yellow-100 hover:border-red mx-2">
      See what I can do
    </a>
  </div>
{/snippet}

<Layout
  pageTitle="Welcome"
  pageDescription="Florian Krauthan, a Vancouver based software developer, who loves to eat, breathe and sleep technology to make the world a better place."
  jsonLd={[website(), person(data.currentPosition)]}
  {headerContent}
  headerClassName={styles.header}
  hideTopNavigation />
