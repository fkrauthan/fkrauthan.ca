<script lang="ts">
  let { active = false }: { active?: boolean } = $props();
</script>

<span
  class={[
    "text-xs rounded-xl border py-0.5 px-2",
    active && "border-green-600 text-green-600",
    !active && "border-gray-500 text-gray-500",
  ]}>
  {active ? "active" : "past"}
</span>
