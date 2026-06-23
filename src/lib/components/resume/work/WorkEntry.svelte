<script lang="ts">
  import { calculateDaysWorked } from "$lib/dateUtils";
  import type { ResumeRole } from "$lib/types";
  import EarthOutline from "~icons/ion/earth-outline";

  import ThemedIcon from "../../ThemedIcon.svelte";
  import DaysWorked from "./DaysWorked.svelte";
  import RoleTimeline from "./RoleTimeline.svelte";

  let {
    company,
    website,
    isCurrent,
    roles,
  }: {
    company: string;
    website: string | null;
    isCurrent: boolean;
    roles: ResumeRole[];
  } = $props();

  function calculateTotalDaysWorked(roles: ResumeRole[]): number {
    return roles.reduce((acc, { startDate, endDate }) => {
      const start = startDate ? new Date(startDate) : new Date();
      const end = endDate ? new Date(endDate) : new Date();

      return acc + calculateDaysWorked(start, end);
    }, 0);
  }

  const daysWorked = $derived(calculateTotalDaysWorked(roles));
</script>

<div>
  <h3>
    {company}
    {#if website}
      <a href={website} target="_blank" rel="noreferrer nofollow" title={`${company} Website`}
        ><ThemedIcon component={EarthOutline} width="18px" height="18px" style="display: inline;" /></a>
    {/if}
    <DaysWorked days={daysWorked} {isCurrent} />
  </h3>

  <RoleTimeline {roles} />
</div>
