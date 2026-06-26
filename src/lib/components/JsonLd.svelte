<script lang="ts">
  // Renders a single `application/ld+json` script into the document head. `<` is
  // escaped to `<` so a value containing a closing script tag cannot break
  // out of the tag (XSS-safe serialization). This is the only place `{@html}` is
  // used for JSON-LD.
  let { schema }: { schema: Record<string, unknown> } = $props();

  const json = $derived(JSON.stringify(schema).replace(/</g, "\\u003c"));
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
