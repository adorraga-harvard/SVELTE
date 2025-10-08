<script lang="ts">
  import ThemeChooser from '$lib/Customized/Components/Comp_ThemeChooser.svelte';
  import './project_Scoped.css';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  const dynamicTabs = [
    { id: 'incident', name: 'Incidents' },
    { id: 'asset', name: 'Assets' },
    { id: 'plan', name: 'Plans' },
    { id: 'actor', name: 'Actors' },
    { id: 'product', name: 'Products' }
  ];
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">


<div class="flex flex-col h-screen overflow-hidden">
    <div class="fixed top-0 left-0 z-[25] animate-spin-slow">
        <img src="/logos/AIC.png" width="250" style="opacity: 0.2;" alt="AFP Intelligence Command Logo">
    </div>

    <header class="bg-base-100 text-base-content shadow-lg py-2 px-4 md:px-6 z-20 sticky top-0">
        <div class="container mx-auto flex justify-between items-center max-w-6xl">
            <div class="text-4xl md:text-4xl font-extrabold text-primary flex items-center" style="text-shadow: 2px 2px 6px #ccc;">
                AFP SENTINEL
            </div>
            <nav class="tabs tabs-boxed mx-4 hidden lg:flex">
                <a href="/sentinel" class="tab" class:tab-active={$page.url.pathname === '/sentinel'}>
                    Home
                </a>
                {#each dynamicTabs as tab}
                    <a href="/sentinel/{tab.id}" class="tab" class:tab-active={$page.params.slug === tab.id } data-sveltekit-preload-data="off">
                        {tab.name}
                    </a>
                {/each}
                <a href="/sentinel/lookups" class="tab" class:tab-active={$page.url.pathname === '/sentinel/lookups'}>
                    Lookups
                </a>
            </nav>
            <div class="ml-auto" style="z-index: 30;">
                <ThemeChooser />
            </div>
        </div>
    </header>

    <main class="flex-1 overflow-auto bg-base-200 relative">
        <div class="container mx-auto max-w-[90vw] p-4 h-full relative">
            {#key $page.url.pathname === '/sentinel' || $page.url.pathname === '/sentinel/lookups' ? null : $page.url.pathname}
                <div
                    in:fly={{ x: 100, duration: 400, delay: 50 }}
                    out:fly={{ x: -100, duration: 400 }}
                    class="h-full w-full"
                >
                    <slot />
                </div>
            {/key}
        </div>
    </main>
</div>

<style>
  .animate-spin-slow {
    animation: spin-slow 10s linear infinite;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>