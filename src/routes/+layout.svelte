<script lang="ts">
  import Plausible from "$lib/components/Plausible.svelte";
  import type { Snippet } from "svelte";

  import "../app.css";

  let { children }: { children: Snippet } = $props();
</script>

<Plausible />

{@render children()}
