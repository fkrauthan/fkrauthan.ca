<script lang="ts">
  import ProjectsView from "$lib/components/projects/ProjectsView.svelte";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<ProjectsView activeTechnology={data.activeTechnology} technologies={data.technologies} projects={data.projects} />
