<script lang="ts">
  import { page } from "$app/state";
  import { SITE_URL } from "$lib/seo/schema";
  import type { Snippet } from "svelte";

  import BuyACoffee from "./BuyACoffee.svelte";
  import Header from "./Header.svelte";
  import JsonLd from "./JsonLd.svelte";

  let {
    children,
    pageTitle,
    pageDescription,
    headerContent,
    headerClassName,
    hideTopNavigation = false,
    jsonLd,
    canonical,
  }: {
    children?: Snippet;
    pageTitle: string;
    pageDescription: string;
    headerContent?: Snippet;
    headerClassName?: string;
    hideTopNavigation?: boolean;
    jsonLd?: Record<string, unknown>;
    /**
     * Canonical route path. Defaults to the current page (self-referencing);
     * filtered/duplicate views pass the path they should consolidate into.
     */
    canonical?: string;
  } = $props();

  const canonicalUrl = $derived(`${SITE_URL}${canonical ?? page.url.pathname}`);
</script>

<svelte:head>
  <meta name="robots" content="index, follow" />

  <title>{pageTitle} | Florian Krauthan</title>
  <meta name="description" content={pageDescription} />

  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={`${pageTitle} | Florian Krauthan`} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Florian Krauthan" />
  <meta property="og:locale" content="en_CA" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />

  <link rel="me" href="https://mastodon.cogindo.net/@fkrauthan" />
</svelte:head>

{#if jsonLd}
  <JsonLd schema={jsonLd} />
{/if}

<Header content={headerContent} {headerClassName} {hideTopNavigation} />
{#if children}<main>{@render children()}</main>{/if}

<BuyACoffee />
