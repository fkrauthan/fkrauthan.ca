<script lang="ts">
  import type { Component, Snippet } from "svelte";

  import ThemedIcon from "../../ThemedIcon.svelte";

  let { IconComponent, children }: { IconComponent: Component; children?: Snippet } = $props();
</script>

<div class="flex items-center my-3">
  <ThemedIcon component={IconComponent} class="w-6 mr-4" />
  {@render children?.()}
</div>
