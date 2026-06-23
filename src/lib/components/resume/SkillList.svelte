<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<li>
  <div>{title}</div>
  <p>{@render children?.()}</p>
</li>
