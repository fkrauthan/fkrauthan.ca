<script lang="ts">
  import { PUBLIC_PLAUSIBLE_ENABLED, PUBLIC_PLAUSIBLE_HOST } from "$env/static/public";

  const enabled = PUBLIC_PLAUSIBLE_ENABLED === "1";

  // The per-site hosted Plausible script auto-initialises and reports events
  // back to its own host (`${host}/api/event`), matching the previous
  // next-plausible configuration.
  const scriptTag = `<script defer src="${PUBLIC_PLAUSIBLE_HOST}/js/pa-axkESUYVPVBXzmkVDK5rw.js"><\/script>`;
</script>

<svelte:head>
  {#if enabled}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html scriptTag}
  {/if}
</svelte:head>
