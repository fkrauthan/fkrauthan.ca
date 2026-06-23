<script lang="ts">
  import { onMount } from "svelte";

  let { isCurrent, days }: { isCurrent: boolean; days: number } = $props();

  let client = $state(false);
  onMount(() => {
    client = true;
  });

  const parts = $derived.by(() => {
    let numYears = Math.floor(days / 365);
    let numMonths = Math.ceil((days % 365) / 30);
    if (numMonths === 12) {
      numYears += 1;
      numMonths = 0;
    }
    return { numYears, numMonths };
  });

  const yrs = $derived(parts.numYears === 1 ? "yr" : "yrs");
  const mos = $derived(parts.numMonths === 1 ? "mo" : "mos");
</script>

<span class="text-gray-700 dark:text-gray-400 pl-3 text-sm"
  >{#if isCurrent && !client}current{/if}{#if !isCurrent || client}{#if parts.numYears > 0}{`${parts.numYears} ${yrs}`}{/if}
    {#if parts.numMonths > 0}{`${parts.numMonths} ${mos}`}{/if}{/if}</span>
