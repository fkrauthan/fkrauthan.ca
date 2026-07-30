<script lang="ts">
  import { PUBLIC_PLAUSIBLE_ENABLED } from "$env/static/public";

  const enabled = PUBLIC_PLAUSIBLE_ENABLED === "1";
</script>

<svelte:head>
  {#if enabled}
    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://t.cogindo.net/js/pa-axkESUYVPVBXzmkVDK5rw.js"></script>
    <script>
      ((window.plausible =
        window.plausible ||
        function () {
          (plausible.q = plausible.q || []).push(arguments);
        }),
        (plausible.init =
          plausible.init ||
          function (i) {
            plausible.o = i || {};
          }));
      plausible.init({
        endpoint: "https://t.cogindo.net/api/event",
      });
    </script>
  {/if}
</svelte:head>
