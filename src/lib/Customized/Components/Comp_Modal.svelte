<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import Comp_DataTable from './Comp_DataTable.svelte';
  import { fade, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let dataSource: any[] = [];
  export let columnName: string = '';
  export let bridgeName: string = '';
  export let chartType: string = 'bar_v';

  // internal states
  let modal_style: any = null;
  let chartVisible = false;
  let isLoading = true;

  // Lazy load component only when dataSource is ready
  $: if (Array.isArray(dataSource) && dataSource.length > 0 && columnName) {
    (async () => {
      isLoading = true;
      chartVisible = false;

      const isMapping = /location|region|province|city|barrio/i.test(columnName);
      console.log(`[Modal] Lazy loading ${isMapping ? 'Mapping' : 'Charting'} component for ${columnName}`);

      const module = await import(isMapping ? './Comp_Mapping.svelte' : './Comp_Charting.svelte');
      modal_style = module.default;

      await tick();
      chartVisible = true;
      isLoading = false;
    })();
  } else {
    chartVisible = false;
    modal_style = null;
    isLoading = true;
  }

  function formatColumnName(name: string): string {
  if (!name) return '';

  // Remove leading symbols like '*'
  name = name.replace(/^[*#@]+/, '');

  // Split into parts by underscores or camelCase
  const parts = name
    .replace(/([a-z])([A-Z])/g, '$1_$2') // split camelCase
    .split('_')
    .filter(Boolean);

  // Capitalize first letter of each word
  const words = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());

  // Optional: convert special suffixes like 'DayofWeek' => '(Day of Week)'
  const formatted = words
    .join(' ')
    .replace(/\b(Dayofweek|DayofWeek)\b/, '(Day of Week)')
    .replace(/\b(Monthname|MonthName)\b/, '(Month)')
    .replace(/\b(Hour|Hours)\b/, '(Hour)')
    .replace(/\b(Day|Days)\b/, '(Day)')
    .trim();

  return formatted;
}


  function closeModal() {
    dispatch('close');
  }
</script>

<!-- Overlay -->
<div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
  <div
    class="bg-base-100 rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col border border-base-300"
    transition:scale={{ duration: 200 }}
  >
    <!-- Header -->
    <div class="p-4 border-b flex justify-between items-center bg-base-300 flex-shrink-0">
      <h3 class="text-xl font-extrabold tracking-wide text-primary">
        {columnName ? formatColumnName(columnName) : 'Loading...'}
      </h3>
      <button class="btn btn-sm btn-circle btn-ghost hover:bg-base-200" on:click={closeModal}>✕</button>
    </div>

    <!-- Body -->
    <div class="flex flex-grow overflow-hidden relative">

      {#if isLoading}
        <!-- Elegant Loading Screen -->
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-base-200/80 z-20">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
          </div>
          <p class="text-sm font-medium text-base-content/70 animate-pulse">Preparing your visualization...</p>
        </div>
      {/if}

      {#if chartVisible && modal_style}
        <!-- Left: Chart or Map -->
        <div class="flex-[0.65] p-4 overflow-auto border-r border-base-300" transition:fade>
          <svelte:component
            this={modal_style}
            data={dataSource}
            groupingColumn={columnName}
            title={columnName}
            chartType={chartType}
          />
        </div>

        <!-- Right: DataTable -->
        <div class="flex-[0.35] p-2 scale-90 overflow-auto" transition:fade>
          <Comp_DataTable
            tableData={{
              columns: dataSource.length ? Object.keys(dataSource[0]) : [],
              rows: dataSource
            }}
            fontSize="0.7rem"
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  .btn-ghost { font-size: 1rem; }
</style>
