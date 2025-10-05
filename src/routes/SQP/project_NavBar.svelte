<script lang="ts">
  import { page } from '$app/stores';
  import * as icons from 'lucide-svelte';

  // --- TYPE ---
  export interface NavNode {
    slug: string;
    navTitle: string;
    icon?: string | null;
    children?: NavNode[];
  }

  // --- PROPS ---
  export let links: NavNode[] = [];
  export let variant: 'tabs' | 'pills' = 'tabs';
  export let basePath = '';

  // --- DYNAMIC STYLING ---
  let itemClasses = '';
  $: {
    const count = links?.length ?? 0;
    itemClasses = count > 6 ? 'px-2 text-sm'
      : count > 4 ? 'px-3'
      : 'px-4';
  }

  // --- PATH NORMALIZER ---
  const normalizePath = (path: string) => `/${path}`.replace(/\/+/g, '/');

  // --- ICON CHECK ---
  const isImageFile = (icon?: string | null) =>
    !!icon && /\.(jpg|jpeg|png|svg|webp)$/i.test(icon);

  // --- RENDER ICON COMPONENT ---
  const renderIcon = (link: NavNode) => {
    if (!link.icon) return null;

    if (isImageFile(link.icon)) {
      return `<img src="/images/${link.icon}" alt="${link.navTitle}" class="h-5 w-5 transition-transform group-hover:animate-spin" />`;
    } else if (icons[link.icon]) {
      return icons[link.icon];
    } else {
      return icons.HelpCircle;
    }
  };
</script>

<!-- --- RENDER LINKS --- -->
{#if variant === 'tabs'}
  <div class="tabs tabs-boxed">
    {#each links as link (link.slug)}
      {@const linkPath = normalizePath(`${basePath}/${link.slug}`)}
      <a
        href={linkPath}
        class="tab tab-lg group gap-2 {itemClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        class:tab-active={$page.url.pathname.startsWith(linkPath)}
      >
        {#if link.icon}
          {#if isImageFile(link.icon)}
            <img src={`/images/${link.icon}`} alt={link.navTitle} class="h-5 w-5 transition-transform group-hover:animate-spin" />
          {:else if icons[link.icon]}
            <svelte:component this={icons[link.icon]} class="h-5 w-5 transition-transform group-hover:animate-spin" />
          {:else}
            <icons.HelpCircle class="h-5 w-5 text-base-content/30" />
          {/if}
        {/if}
        <span class="font-medium">{link.navTitle}</span>
      </a>
    {/each}
  </div>
{:else if variant === 'pills'}
  <div class="flex items-center justify-center gap-2">
    {#each links as link (link.slug)}
      {@const linkPath = normalizePath(`${basePath}/${link.slug}`)}
      <a
        href={linkPath}
        class="btn btn-ghost group gap-2 rounded-full {itemClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-base-100 focus-visible:ring-primary"
        class:btn-active={$page.url.pathname.startsWith(linkPath)}
      >
        {#if link.icon}
          {#if isImageFile(link.icon)}
            <img src={`/images/${link.icon}`} alt={link.navTitle} class="h-5 w-5 transition-transform group-hover:animate-spin" />
          {:else if icons[link.icon]}
            <svelte:component this={icons[link.icon]} class="h-5 w-5 transition-transform group-hover:animate-spin" />
          {:else}
            <icons.HelpCircle class="h-5 w-5 text-base-content/30" />
          {/if}
        {/if}
        <span class="font-medium">{link.navTitle}</span>
      </a>
    {/each}
  </div>
{/if}
