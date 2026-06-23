<script lang="ts">
  import type { Component } from "svelte";

  import SidebarEntry from "./SidebarEntry.svelte";

  let { IconComponent, title, href }: { IconComponent: Component; title: string; href: string } = $props();
</script>

<SidebarEntry {IconComponent}>
  <a {href} target="_blank" rel="noopener noreferrer" class="hover:text-gray-700">{title}</a>
</SidebarEntry>
