<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import Comp_DataTable from './Comp_DataTable.svelte';
  import Comp_Charting from './Comp_Charting.svelte';
  import Comp_Mapping from './Comp_Mapping.svelte';
  import { fade, scale } from 'svelte/transition';
  import Comp_Aggregator from './Comp_Aggregator.svelte';
  import { page } from '$app/stores';

  const dispatch = createEventDispatcher();

  export let dataSource: any[] = [];
  export let columnName: string = '';
  export let chartType: string = 'bar_v';
  export let aggregationData: {
    candidates: string[]; query: string; selectedCandidate: string | null;
    dataSource: any[] | null;  tableName:string };

  let modal_style: typeof Comp_Charting | typeof Comp_Mapping | null = null;
  let chartVisible = false;
  let isLoading = false;

  // Use a reactive block to inspect the incoming prop
  $: {
    console.log("--- AGGREGATION DATA RECEIVED BY MODAL ---");
    console.log(JSON.stringify(aggregationData, null, 2));
  }

  $: {
    if (Array.isArray(aggregationData.dataSource) && aggregationData.dataSource.length > 0 && aggregationData.selectedCandidate) {
      isLoading = false;
      chartVisible = false;

      const isMapping = /region|province|city|barrio/i.test(aggregationData.selectedCandidate);
      modal_style = isMapping ? Comp_Mapping : Comp_Charting;

      tick().then(() => {
        chartVisible = true;
        isLoading = false;
      });
    } else {
      chartVisible = false;
      modal_style = null;
      isLoading = true;
    }
  }

  async function reRunAggregationQuery(sqlResult: string, candidate: string) {
    isLoading = true;

    const newSQL = `
      SELECT
        ${sqlResult} AS category,
        COUNT(*) AS quantity
      FROM
        (${aggregationData.query})
      GROUP BY
        category;
    `;

    console.log(`NEW SQL to be executed from modal:`, newSQL);

    try {
      const res = await fetch('/sentinel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: newSQL })
      });

      if (!res.ok) throw new Error(`Failed to fetch aggregation data: ${res.status}`);

      const result = await res.json();

      // Update the aggregationData.dataSource with the new data
      aggregationData.dataSource = result.data;
      aggregationData.selectedCandidate = candidate;

    } catch (e: any) {
      console.error(`Re-aggregation failed: ${e.message}`, e);
    } finally {
      isLoading = false;
    }
  }

  function formatColumnName(name: string): string {
    if (!name) return '';

    name = name.replace(/^[*#@]+/, '');
    const parts = name.replace(/([a-z])([A-Z])/g, '$1_$2').split('_').filter(Boolean);
    const words = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
    return words
      .join(' ')
      .replace(/\b(Dayofweek|DayofWeek)\b/, '(Day of Week)')
      .replace(/\b(Monthname|MonthName)\b/, '(Month)')
      .replace(/\b(Hour|Hours)\b/, '(Hour)')
      .replace(/\b(Day|Days)\b/, '(Day)')
      .trim();
  }

  function closeModal() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
  <div
    class="bg-base-100 rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col border border-base-300"
    transition:scale={{ duration: 200 }}
  >

    <div class="p-4 border-b flex justify-between items-center bg-base-300 flex-shrink-0">
      <h2 class="font-extrabold text-3xl">{aggregationData.tableName}</h2>
      <Comp_Aggregator
        groupingCandidates={aggregationData.candidates}
        bind:selectedCandidate={aggregationData.selectedCandidate}
        on:select={e => {
          reRunAggregationQuery(e.detail.sqlResult, e.detail.candidate);
        }}
      />
      <button class="btn btn-sm btn-circle btn-ghost hover:bg-base-200" on:click={closeModal}>✕</button>
    </div>

    <div class="flex flex-grow overflow-hidden relative">
      {#if isLoading}
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
        <div class="flex-[0.65] p-4 overflow-auto border-r border-base-300 flex flex-col gap-4" transition:fade>
          <div class="flex-grow">
            <svelte:component
              this={modal_style}
              title={formatColumnName(aggregationData.selectedCandidate)}
              chartType={chartType}
              data={aggregationData.dataSource}
              dataSource={aggregationData.dataSource}
            />
          </div>
        </div>

        <div class="flex-[0.35] p-2 scale-90 overflow-auto" transition:fade>
          <Comp_DataTable
            tableData={{
              columns: aggregationData.dataSource.length ? Object.keys(aggregationData.dataSource[0]) : [],
              rows: aggregationData.dataSource
            }}
            fontSize="0.7rem"
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .animate-spin { animation: spin 1s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

  .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.05);} }

  .btn-ghost { font-size: 1rem; }
</style>