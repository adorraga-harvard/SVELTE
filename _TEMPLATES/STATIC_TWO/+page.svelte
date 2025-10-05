<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { PageData } from './$types';
  import { providers as resolveProvider } from '../Providers/ProviderResolver';

  export let data: PageData;

  let componentPromise: Promise<{ default: ComponentType } | null> | null = null;

  $: {
    const providerFn = resolveProvider[data.slug];
    componentPromise = providerFn ? providerFn() : null;
  }
</script>

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
          <span>Error! Provider not found for key: '{data.slug}'.</span>
        </div>
      {/if}
    {:catch error}
      <div class="alert alert-error">
        <h3 class="font-bold">Error loading service!</h3>
        <div class="text-xs font-mono mt-2">{error.message}</div>
      </div>
    {/await}
  {:else}
    <div class="alert alert-warning">
      <span>No provider found for this route.</span>
    </div>
  {/if}
</div>
