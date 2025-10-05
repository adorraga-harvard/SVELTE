<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import GlobalSettingsModal from '$lib/Components/Comp_ModalSettings.svelte';
  import {BreadCrumbsSettings, BreadCrumbsSettings as schema} from './project_BreadCrumbs.ts';

  export let tree: {
    slug: string;
    navTitle: string;
    icon?: string | null;
    children?: any[];
  }[] = [];

  export let basePath: string = '';

  // --- Default settings ---
  let settings = {
    variant: schema.variant.default,
    colors: schema.colors.default,
    clickableLast: schema.clickableLast.default,
    emphasizeLast: schema.emphasizeLast.default
  };

  // --- Load persisted settings ---
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('Settings.BreadCrumbs');
    if (saved) {
      try {
        settings = { ...settings, ...JSON.parse(saved) };
      } catch (err) {
        console.warn('Invalid Settings.BreadCrumbs JSON', err);
      }
    }
  }

  // --- Modal state ---
  let showModal = false;

  function handleSave(newValues: Record<string, any>) {
    settings = { ...settings, ...newValues };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('Settings.BreadCrumbs', JSON.stringify(settings));
    }
    showModal = false;
  }

  // --- Helpers ---
  function joinPath(...parts: (string | undefined | null)[]) {
    const cleaned = parts
      .filter(Boolean)
      .map((p) => String(p).replace(/^\/+|\/+$/g, ''))
      .filter(Boolean);
    return '/' + cleaned.join('/');
  }

  function normalizeForCompare(path: string) {
    return path.replace(/\/+$/g, '').toLowerCase();
  }

  function findTrail(
    nodes: typeof tree,
    targetPath: string,
    trail: { href: string; navTitle: string }[] = []
  ): { href: string; navTitle: string }[] | null {
    for (const node of nodes) {
      const fullHref = joinPath(basePath, node.slug);
      const newTrail = [...trail, { href: fullHref, navTitle: node.navTitle }];

      if (normalizeForCompare(fullHref) === normalizeForCompare(targetPath)) {
        return newTrail;
      }

      if (node.children) {
        const found = findTrail(node.children, targetPath, newTrail);
        if (found) return found;
      }
    }
    return null;
  }

  const breadcrumbs = derived(page, ($page) => {
    const currentPath = $page.url.pathname || '/';
    const trail = findTrail(tree, currentPath);
    return trail ?? [];
  });

  function getColor(i: number): string {
    if (settings.variant === 'cycle') {
      return settings.colors[i % settings.colors.length];
    }
    if (settings.variant === 'fixed') {
      return settings.colors[Math.min(i, settings.colors.length - 1)];
    }
    if (settings.variant === 'mono') {
      return settings.colors[0];
    }
    return '';
  }
</script>

<nav class="breadcrumbs text-sm" aria-label="Breadcrumb">
  <ul class="flex flex-wrap gap-1">
    {#each $breadcrumbs as crumb, i}
      <li>
        {#if i < $breadcrumbs.length - 1 || settings.clickableLast}
          <a
            href={encodeURI(crumb.href)}
            class={`hover:underline ${getColor(i)}`}
          >
            {crumb.navTitle}
          </a>
        {:else}
          <!-- Last crumb opens modal -->
          <button
            type="button"
            on:click={() => (showModal = true)}
            class={`${
              settings.emphasizeLast ? 'font-bold text-lg' : 'font-medium'
            } ${getColor(i)} underline`}
          >
            {crumb.navTitle}
          </button>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

{#if showModal}
  <h2>Modal should appear!</h2>
  <GlobalSettingsModal
    component="BreadCrumbs"
    settingsSchema={schema}
    values={settings}
    on:save={(e) => handleSave(e.detail)}
    on:close={() => (showModal = false)}
  />
{/if}
