<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<div class="font-light text-lg px-2 mb-12">
  <h2 class="text-xl font-semibold mb-4">{title}</h2>
  {@render children?.()}
</div>
