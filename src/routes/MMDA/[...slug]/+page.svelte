<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { PageData } from './$types';
  import { providers as resolveProvider } from '../Providers/ProviderResolver';

  export let data: PageData;

  let componentPromise: Promise<{ default: ComponentType } | null> | null = null;
  let providerPath = '';

  // Compute provider path and promise
  $: {
    if (data.pageData?.end_point) {
      providerPath = data.pageData.end_point; // should match ProviderResolver.ts key exactly
      componentPromise = resolveProvider[providerPath]?.() || null;
    } else {
      providerPath = '';
      componentPromise = null;
    }
  }
</script>

<!--&lt;!&ndash; Debug panel &ndash;&gt;-->
<!--<div class="fixed top-0 right-0 z-50 p-4 bg-base-200 border shadow-lg text-xs font-mono max-w-xs">-->
<!--  <div><strong>DEBUG PANEL</strong></div>-->
<!--  <div>providerPath: {providerPath}</div>-->
<!--  <div>componentPromise: {componentPromise ? 'Promise exists' : 'null'}</div>-->
<!--  <div>data.pageData?.end_point: {data.pageData?.end_point}</div>-->
<!--  <div>data.pageData?.title: {data.pageData?.title}</div>-->
<!--</div>-->

<div class="w-full">
  {#if componentPromise}
    {#await componentPromise}
      <div class="p-8 text-center">
        <span class="loading loading-lg loading-spinner text-primary"></span>
      </div>
    {:then module}
      {#if module}
        <svelte:component this={module.default} {data} />
      {:else}
        <div class="alert alert-error">
          <span>Error! Provider not found in resolver for path: {providerPath}</span>
        </div>
      {/if}
    {:catch error}
      <div class="alert alert-error">
        <div>
          <h3 class="font-bold">Error loading service!</h3>
          <div class="text-xs font-mono mt-2">{error.message}</div>
        </div>
      </div>
    {/await}
  {:else if data.pageData}
    <div class="hero rounded-box shadow-2xl bg-base-100">
      <div class="hero-content text-center p-8 md:p-16">
        <div class="max-w-lg">
          <h1 class="text-3xl md:text-4xl font-bold tracking-tighter text-base-content">
            {data.pageData.title}
          </h1>
          <p class="py-6 text-base-content/80 leading-relaxed">
            {data.pageData.description}
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
