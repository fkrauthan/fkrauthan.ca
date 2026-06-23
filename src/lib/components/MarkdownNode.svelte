<script lang="ts">
  import type { MarkdownNode } from "$lib/types";

  import Self from "./MarkdownNode.svelte";

  let { node }: { node: MarkdownNode } = $props();

  const children = $derived(node.children ?? []);

  const handledTypes = [
    "root",
    "paragraph",
    "emphasis",
    "heading",
    "text",
    "strong",
    "blockquote",
    "list",
    "link",
    "listItem",
    "inlineCode",
  ];

  $effect(() => {
    if (!handledTypes.includes(node.type)) {
      console.warn("Unhandled node type", node);
    }
  });
</script>

{#if node.type === "root"}
  {#each children as child}<Self node={child} />{/each}
{:else if node.type === "paragraph"}
  <p>
    {#each children as child}<Self node={child} />{/each}
  </p>
{:else if node.type === "emphasis"}
  <em
    >{#each children as child}<Self node={child} />{/each}</em>
{:else if node.type === "heading"}
  <svelte:element this={`h${node.depth ?? 2}`}>
    {#each children as child}<Self node={child} />{/each}
  </svelte:element>
{:else if node.type === "text"}
  {node.value}
{:else if node.type === "strong"}
  <strong
    >{#each children as child}<Self node={child} />{/each}</strong>
{:else if node.type === "blockquote"}
  <blockquote
    class="my-6 p-4 italic border-l-4 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-500 quote">
    {#each children as child}<Self node={child} />{/each}
  </blockquote>
{:else if node.type === "list"}
  <ul>
    {#each children as child}<Self node={child} />{/each}
  </ul>
{:else if node.type === "link"}
  {#if node.url?.startsWith("/")}
    <a href={node.url} class="hover:text-gray-400 font-normal"
      >{#each children as child}<Self node={child} />{/each}</a>
  {:else}
    <a href={node.url} target="_blank" rel="noreferrer" class="hover:text-gray-400 font-normal"
      >{#each children as child}<Self node={child} />{/each}</a>
  {/if}
{:else if node.type === "listItem"}
  <li>
    {#each children as child}<Self node={child} />{/each}
  </li>
{:else if node.type === "inlineCode"}
  <code>{node.value}</code>
{:else}
  {#each children as child}<Self node={child} />{/each}
{/if}
