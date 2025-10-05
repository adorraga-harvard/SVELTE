<script lang="ts">
  import './project_Scoped.css';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  import NavBar from './project_NavBar.svelte';
  import ThemeChooser from './project_ThemeChooser.svelte';
  import ProfileMenu from './project_ProfileMenu.svelte';
  import TreeNode from './project_TreeNode.svelte';
  import BreadCrumbs from './project_BreadCrumbs.svelte';

  // --- TYPES ---
  interface NavNode {
    slug: string;
    navTitle: string;
    icon?: string | null;
    children?: NavNode[];
  }

  export let data: {
    targetPath: string;
    friendlyName: string;
    navigation: NavNode[];
  };

  // --- CONSTANTS ---
  const TARGET_NAME = data.targetPath;
  const FULL_NAME = data.friendlyName;
  const navigationTree: NavNode[] = data.navigation ?? [];
  $: basePath = `/${TARGET_NAME}`;

  // --- REACTIVE STATE ---
  $: activeTopLevelNode = navigationTree.find(node =>
    $page.url.pathname.startsWith(`${basePath}/${node.slug}`)
  ) ?? null;

  $: sidebarSourceTree = activeTopLevelNode?.children ?? [];

  let searchTerm = '';

  // --- FUNCTIONS ---
  function filterTree(nodes: NavNode[], term: string): NavNode[] {
    if (!term.trim()) return nodes;
    const lowerTerm = term.toLowerCase();
    return nodes.reduce((acc, node) => {
      const selfMatch = node.navTitle.toLowerCase().includes(lowerTerm);
      const filteredChildren = filterTree(node.children ?? [], term);
      if (selfMatch || filteredChildren.length > 0) {
        acc.push({ ...node, children: filteredChildren });
      }
      return acc;
    }, [] as NavNode[]);
  }

  $: sidebarNodes = filterTree(sidebarSourceTree, searchTerm);

  function countNodes(nodes: NavNode[]): number {
    return nodes.reduce((count, node) => count + 1 + countNodes(node.children ?? []), 0);
  }

  $: totalSidebarNodeCount = countNodes(sidebarSourceTree);

  function handleImageError(event: Event & { currentTarget: HTMLImageElement }) {
    event.currentTarget.onerror = null;
    event.currentTarget.style.display = 'none';
  }
</script>

<div class="drawer lg:drawer-open">
  <input id="main-drawer" type="checkbox" class="drawer-toggle" />

  <!-- MAIN CONTENT -->
  <div class="drawer-content flex flex-col h-screen bg-base-200/50">
    <header class="sticky top-0 z-30 w-full shadow-md bg-base-300/90 backdrop-blur-sm">
      <div class="navbar px-4">
        <div class="navbar-start">
          <label for="main-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <a href={basePath} class="flex items-center gap-2 text-lg font-bold transition-opacity hover:opacity-80 lg:hidden">
            <img src={`/logos/${TARGET_NAME}.png`} alt="{FULL_NAME} Logo" class="h-8 w-8 object-contain" on:error={handleImageError} />
            <span class="hidden md:inline">{FULL_NAME}</span>
          </a>
        </div>

        <div class="navbar-center hidden lg:flex">
          <NavBar links={navigationTree} basePath={basePath} />
        </div>

        <div class="navbar-end gap-2">
          <ThemeChooser />
          <ProfileMenu />
        </div>
      </div>

      {#if activeTopLevelNode}
        <div class="navbar-center px-4 py-0 hidden lg:block border-t border-base-300/50">
          <BreadCrumbs tree={navigationTree} basePath={basePath} />
        </div>
      {/if}
    </header>

    <main class="flex-1 overflow-y-auto project-util-scrollbar">
      <div class="p-4 md:p-6">
        {#key $page.url.pathname}
          <div class="project-anim-fade-in-up" transition:fly={{ y: 20, duration: 300 }}>
            <slot />
          </div>
        {/key}
      </div>
    </main>

    <footer class="sticky bottom-0 z-20 p-2 bg-base-200/60 text-base-content text-center text-sm shadow-inner">
      <p>Copyright © {new Date().getFullYear()} - All rights reserved by Trium-Veritas Tech Solutions</p>
    </footer>
  </div>

  <!-- SIDEBAR -->
  <aside class="drawer-side z-40">
    <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex flex-col w-68 h-full bg-base-100 border-r border-base-300">
      <div class="px-2 py-0">
        <a href={basePath} class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-base-200 transition-colors duration-200">
          <img src={`/logos/${TARGET_NAME}.png`} alt="{FULL_NAME} Logo" class="w-24 h-24 drop-shadow-md rounded-full object-cover" on:error={handleImageError} />
          <span class="text-lg font-bold tracking-tight text-center text-primary">{FULL_NAME}</span>
        </a>
      </div>

      {#if totalSidebarNodeCount > 7}
        <div class="px-4 pb-2">
          <input type="search" placeholder="Search..." class="input input-bordered input-sm w-full" bind:value={searchTerm} />
        </div>
      {/if}

      <ul class="menu text-base-content flex-1 overflow-y-auto project-tree-lines project-util-scrollbar p-4 pt-0">
        {#if activeTopLevelNode}
          {#if sidebarNodes.length > 0}
            <li class="menu-title"><span>{activeTopLevelNode.navTitle}</span></li>
            {#each sidebarNodes as childNode}
              <TreeNode node={childNode}
                        targetPath="{TARGET_NAME}" startOpen={!!searchTerm} variant="lines" />
            {/each}
          {:else if searchTerm}
            <li class="p-4 text-base-content/60">No results found.</li>
          {/if}
        {:else}
          <li class="p-4 text-base-content/60">Select a service.</li>
        {/if}
      </ul>
    </div>
  </aside>
</div>
