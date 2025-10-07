<script lang="ts">
  import { page } from '$app/stores';
  import { tick } from 'svelte';
  import type { TableData } from '../types';
  import Comp_DataTable from '$lib/Customized/Components/Comp_DataTable.svelte';
  import Comp_Modal from '$lib/Customized/Components/Comp_Modal.svelte';
  import Comp_Aggregator from '$lib/Customized/Components/Comp_Aggregator.svelte';

  export let data;

  let title = '';
  let tableName = '';
  let selectedGroupingCandidate: string | null = null;
  let showModal = false;

  let modalDataSource: any[] | null = null;
  let isAggregating = false;

  const dateOperations = [
    'As Is', 'Day', 'Day of Week', 'Hour', 'Day / Night',
    'Month', 'Quarter', 'Year'
  ];

  $: tableData = data.tableData || { columns: [], rows: [] };
  $: rawCandidates = data.groupingCandidates || [];
  $: subQuery = data.finalQuery || '';
  $: pageError = data.error || null;
  $: isLoading = data.tableData === undefined && !data.error;

  $: groupingCandidates = rawCandidates.filter(candidate => {
    const slug = $page.url.pathname.split('/').pop();
    return (
      !candidate.endsWith('_id') &&
      !candidate.endsWith('_id_ref') &&
      candidate.indexOf('summary') === -1 &&
      candidate.indexOf('description') === -1 &&
      candidate !== `${slug}_name`
    );
  });

  $: {
    const slug = $page.url.pathname.split('/').pop();
    if (slug) {
      title = slug.charAt(0).toUpperCase() + slug.slice(1);
      tableName = `core_${slug}`;
    }
  }

  $: aggregationData = {
    candidates: groupingCandidates,
    query: subQuery,
    selectedCandidate:  selectedGroupingCandidate,
    tableName: tableName.replace("core_","").toUpperCase()+"S",
    dataSource: modalDataSource
  };

  async function runAggregationQuery(sqlResult: string, candidate: string) {
    isAggregating = true;
    modalDataSource = null;
    pageError = null;

    const newSQL = `
      SELECT
        ${sqlResult} AS category,
        COUNT(*) AS quantity
      FROM
        (${subQuery})
      GROUP BY
        category;
    `;

    console.clear();
    console.log(`SQL to be executed:`, newSQL);

    try {
      const res = await fetch('/sentinel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: newSQL })
      });

      if (!res.ok) throw new Error(`Failed to fetch aggregation data: ${res.status}`);

      const result = await res.json();
      modalDataSource = result.data;
      selectedGroupingCandidate = candidate;
    } catch (e: any) {
      pageError = `Aggregation Failed: ${e.message}`;
      console.error(e);
    } finally {
      isAggregating = false;
    }
  }

  function handleAggregationSelect(event: CustomEvent<{ sqlResult: string; candidate: string }>) {
    console.log(`Value captured from Aggregator:`, event.detail);
    runAggregationQuery(event.detail.sqlResult, event.detail.candidate);
    showModal = true;
  }

  $: {
    if (showModal && aggregationData) {
      console.log("--- AGGREGATION DATA BEING PASSED TO MODAL ---");
      console.log(JSON.stringify(aggregationData, null, 2));
    }
  }
</script>

<div class="card bg-base-100 shadow-xl p-8 h-full space-y-4">
  <div class="flex justify-between items-center relative z-20">
    <h2 class="card-title text-2xl text-primary">SENTINEL {title.toUpperCase()}S</h2>

    <Comp_Aggregator
      groupingCandidates={groupingCandidates}
      bind:selectedCandidate={selectedGroupingCandidate}
      on:select={handleAggregationSelect}
    />
  </div>

  {#if isLoading}
    <div class="p-6 text-center text-lg text-gray-500">Loading initial table data...</div>
  {:else if pageError}
    <div class="alert alert-error shadow-lg">
      <span>Error: {pageError}</span>
    </div>
  {:else if tableData && tableData.rows && tableData.rows.length > 0}
    <Comp_DataTable {tableData} fontSize=".7em" />
  {:else}
    <div class="alert alert-info shadow-lg">
      <span>No data available for this table.</span>
    </div>
  {/if}
</div>

{#if showModal && modalDataSource}
  <Comp_Modal
    dataSource={modalDataSource}
    columnName={selectedGroupingCandidate}
    aggregationData={aggregationData}
    on:close={() => (showModal = false)}
  />
{/if}

<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ params, fetch }) => {
    const slug = params.slug;
    const tableName = `core_${slug}`;

    try {
      const res = await fetch(`/sentinel/${slug}`);

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const errorMessage = errorBody.error || `HTTP error! Status: ${res.status}`;
        throw new Error(errorMessage);
      }

      const result = await res.json();

      if (result.tableData && result.groupingCandidates) {
        return result;
      } else {
        throw new Error('Invalid or incomplete data structure received from server.');
      }
    } catch (e: any) {
      console.error(`[LOAD ERROR] Failed to fetch data for ${tableName}:`, e.message);
      return {
        error: e.message,
        tableData: { columns: [], rows: [] },
        groupingCandidates: [],
        subQuery: ''
      };
    }
  };
</script>