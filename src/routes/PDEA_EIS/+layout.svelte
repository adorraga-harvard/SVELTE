<script lang="ts">
  import ThemeChooser from './project_ThemeChooser.svelte';
  import './project_Scoped.css';
  import { page } from '$app/stores';

  $: currentPath = $page.url.pathname;
  const basePath = '/PDEA_EIS';

  // Custom transition function removed to fix duplication bug.
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">


<div class="flex flex-col h-screen overflow-hidden">
  <!-- Header -->

<header class="bg-base-100 text-base-content shadow-lg py-2 px-4 md:px-6 z-20">
    <div class="container mx-auto flex justify-between items-center max-w-6xl">
      <div class="text-4xl md:text-4xl font-extrabold text-pink-600 flex items-center" style="text-shadow: 2px 2px 6px grey;">
        <img src="/logos/PDEA.png" alt="" width="60" class="mr-2"> PDEA
      </div>
      <nav class="tabs tabs-boxed">
        <a
          href="{basePath}/explorer"
          role="tab"
          class="tab"
          class:tab-active={currentPath.startsWith(`${basePath}/explorer`)}
        >
          Explorer
        </a>
        <a
          href="{basePath}/visuals"
          role="tab"
          class="tab"
          class:tab-active={currentPath.startsWith(`${basePath}/visuals`)}
        >
          Executive Information System
        </a>
      </nav>

      <div class="ml-auto">
        <ThemeChooser />
      </div>
    </div>
  </header>
  <!-- Main Content (scrollable area) -->
  <main class="flex-1 overflow-auto bg-base-200">
    <div class="container mx-auto max-w-6xl p-4">
      <!-- The slot should be called once, without complex transition logic that causes element duplication. -->
      <slot />
    </div>
  </main>
</div>