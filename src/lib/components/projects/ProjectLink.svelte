<script lang="ts">
  import type { Component } from "svelte";

  import ThemedIcon from "../ThemedIcon.svelte";

  let { href, title, icon }: { href: string; title: string; icon: Component } = $props();
</script>

<a
  {href}
  style="text-decoration: none; width: 34px; height: 34px;"
  class="inline-block border p border-yellow-500/0 rounded-full hover:border-yellow-500/100"
  {title}
  target="_blank"
  rel="noopener noreferrer">
  <ThemedIcon component={icon} width="32px" height="32px" />
</a>
