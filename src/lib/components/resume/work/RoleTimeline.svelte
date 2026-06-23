<script lang="ts">
  import { calculateDaysWorked } from "$lib/dateUtils";
  import type { ResumeRole } from "$lib/types";

  import SkillListItem from "../SkillListItem.svelte";
  import DaysWorked from "./DaysWorked.svelte";

  import styles from "./RoleTimeline.module.css";

  let { roles }: { roles: ResumeRole[] } = $props();

  function formatDate(dateRaw?: string | null): string {
    if (!dateRaw) {
      return "Present";
    }

    const date = new Date(dateRaw);
    const formatter = new Intl.DateTimeFormat("en", { month: "short" });

    return `${formatter.format(date)} ${date.getFullYear()}`;
  }
</script>

{#snippet Role(role: ResumeRole, showDaysWorked: boolean)}
  {@const daysWorked = calculateDaysWorked(role.startDate, role.endDate)}
  <li>
    <h4>
      {role.position}
      {#if showDaysWorked}<DaysWorked days={daysWorked} isCurrent={!role.endDate} />{/if}
    </h4>
    <small>
      {#if role.location}{role.location} &bull;
      {/if}
      {formatDate(role.startDate)} - {formatDate(role.endDate)}
    </small>

    <p>{role.summary}</p>

    <div class="mb-2.5">
      {#each role.technologies ?? [] as technology}
        <SkillListItem title={technology} />
      {/each}
    </div>
  </li>
{/snippet}

<div class={styles.timeline}>
  <ul>
    {#each roles as role}
      {@render Role(role, roles.length > 1)}
    {/each}
  </ul>
</div>
