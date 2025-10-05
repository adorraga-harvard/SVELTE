<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { PageData } from './$types';
  import { providers as resolveProvider } from '../Providers/ProviderResolver';

  export let data: PageData;

  // Let the #key block manage the promise
  let componentPromise: Promise<{ default: ComponentType } | null> | null = null;
</script>

{#key data.slug}
  {@const providerFn = resolveProvider[data.slug]}
  {@const componentPromise = providerFn ? providerFn() : null}

  <div class="w-full">
    {#if componentPromise}
      {#await componentPromise}
        <div class="p-8 text-center">
          <span class="loading loading-lg loading-spinner text-primary"></span>
        </div>
      {:then module}
        {#if module}
          <svelte:component
            this={module.default}
            records={data.records}
            stats={data.stats}
            search={data.search}
            kpis={data.kpis}
          />
        {:else}
          <div class="alert alert-error">
            <span>Error! Provider module was empty for key: '{data.slug}'.</span>
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
        <span>No provider found for this route. Check that slug '{data.slug}' exists in ProviderResolver.ts.</span>
      </div>
    {/if}
  </div>
{/key}