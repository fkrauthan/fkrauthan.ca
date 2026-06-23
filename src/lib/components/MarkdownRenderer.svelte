<script lang="ts">
  import type { MarkdownNode } from "$lib/types";

  import Node from "./MarkdownNode.svelte";

  let { ast }: { ast: MarkdownNode } = $props();
</script>

<Node node={ast} />
