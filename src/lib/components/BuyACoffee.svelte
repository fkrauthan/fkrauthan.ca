<script lang="ts">
  import Cafe from "~icons/ion/cafe";

  import ThemedIcon from "./ThemedIcon.svelte";
</script>

<a href="https://www.buymeacoffee.com/fkrauthan" target="_blank" rel="noopener noreferrer">
  <div
    class="absolute z-20 bg-yellow-400 dark:bg-yellow-700 dark:hover:bg-yellow-600 top-28 left-0 p-1 sm:p-2 text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 shadow-lg rounded-r hover:bg-yellow-200">
    <div class="hidden sm:block">Buy me</div>
    <div class="text-center pt-2">
      <ThemedIcon component={Cafe} darkColor="#D1D5DBFF" class="inline-block" width="25px" height="25px" />
    </div>
  </div>
</a>
