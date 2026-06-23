<script lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";

  import BuyACoffee from "./BuyACoffee.svelte";
  import Header from "./Header.svelte";

  let {
    children,
    pageTitle,
    pageDescription,
    headerContent,
    headerClassName,
    hideTopNavigation = false,
  }: {
    children?: Snippet;
    pageTitle: string;
    pageDescription: string;
    headerContent?: Snippet;
    headerClassName?: string;
    hideTopNavigation?: boolean;
  } = $props();
</script>

<svelte:head>
  <meta name="robots" content="index, follow" />

  <title>{pageTitle} | Florian Krauthan</title>
  <meta name="description" content={pageDescription} />

  <meta property="og:url" content={page.url.pathname} />
  <meta property="og:title" content={`${pageTitle} | Florian Krauthan`} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Florian Krauthan" />
  <meta property="og:locale" content="en_CA" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />

  <link rel="me" href="https://mastodon.cogindo.net/@fkrauthan" />
</svelte:head>

<Header content={headerContent} {headerClassName} {hideTopNavigation} />
{#if children}<main>{@render children()}</main>{/if}

<BuyACoffee />
