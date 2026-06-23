<script lang="ts">
  import { themeStore } from "$lib/theme.svelte";
  import { onMount } from "svelte";
  import type { Component } from "svelte";

  let {
    component: Icon,
    lightColor = "#000000",
    darkColor = "#ffffff",
    class: className = undefined,
    ...innerProps
  }: {
    component: Component;
    lightColor?: string;
    darkColor?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  const color = $derived(!mounted ? lightColor : themeStore.resolved === "dark" ? darkColor : lightColor);

  const width = $derived((innerProps.width as string) ?? "22px");
  const height = $derived((innerProps.height as string) ?? "22px");
</script>

<div style="width: {width}; height: {height}; display: inline-block;" class={className}>
  <Icon {color} {...innerProps} />
</div>
