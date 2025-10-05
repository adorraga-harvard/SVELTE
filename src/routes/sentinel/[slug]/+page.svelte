<script lang="ts">
  import { page } from '$app/stores';
  import { tick } from 'svelte';
  import type { TableData } from '../types';
  import Comp_DataTable from '$lib/Customized/Components/Comp_DataTable.svelte';
  import Comp_Modal from '$lib/Customized/Components/Comp_Modal.svelte';

  export let data;

  let title = '';
  let tableName = '';
  let selectedGroupingCandidate: string | null = null;
  let showDropdown = false;
  let showModal = false;

  let aggregatedData: any[] | null = null;
  let isAggregating = false;

  // Static list of date analysis options
  const dateOperations = [
    'As Is', 'Day', 'Day of Week', 'Hour', 'Day / Night',
    'Month', 'Quarter', 'Year'
  ];

  // Reactive state for data access and status checks
  $: tableData = data.tableData || { columns: [], rows: [] };
  $: rawCandidates = data.groupingCandidates || [];
  $: subQuery = data.finalQuery || '';
  $: pageError = data.error || null;
  $: isLoading = data.tableData === undefined && !data.error;

  // Filter candidate columns
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

  // Initialize selectedGroupingCandidate when the candidates array loads
  $: if (groupingCandidates.length > 0 && selectedGroupingCandidate === null) {
    selectedGroupingCandidate = '';
  }

  // Function to convert snake_case (and prefixed *) to Title Case for display only
  function toTitleCase(str: string) {
    if (!str) return '';
    // Strip prefixes like T1.", * , and quotes
    let cleanedStr = str.replace(/T\d+\."|"|\*/g, '');
    return cleanedStr.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  function isDateVariant(candidate: string) {
    return candidate.startsWith('*');
  }

  // Reactive block to set page title and table name
  $: {
    const slug = $page.url.pathname.split('/').pop();
    if (slug) {
      title = slug.charAt(0).toUpperCase() + slug.slice(1);
      tableName = `core_${slug}`;
    }
  }

  // --- TEMPORAL TRANSFORMATION FUNCTIONS (Mapping to SQLite STRFTIME) ---
  function getTemporalSql(candidate: string, operation: string): string {
    const baseColumn = candidate.replace(/\*|_(AsIs|Day|DayOfWeek|Hour|DayNight|Month|Quarter|Year)$/g, '');
    switch (operation) {
      case 'As Is':
      case 'AsIs':
        return baseColumn;
      case 'Day':
        return `strftime('%d', ${baseColumn})`;
      case 'Day of Week':
      case 'DayOfWeek':
        return `CASE strftime('%w', ${baseColumn})
          WHEN '0' THEN 'Sunday' WHEN '1' THEN 'Monday'
          WHEN '2' THEN 'Tuesday' WHEN '3' THEN 'Wednesday'
          WHEN '4' THEN 'Thursday' WHEN '5' THEN 'Friday'
          WHEN '6' THEN 'Saturday' END`;
      case 'Hour':
        return `strftime('%H', ${baseColumn})`;
      case 'Day / Night':
      case 'DayNight':
        return `CASE WHEN CAST(strftime('%H', ${baseColumn}) AS INTEGER) < 12 THEN 'Day' ELSE 'Night' END`;
      case 'Month':
        return `CASE strftime('%m', ${baseColumn})
          WHEN '01' THEN 'Jan' WHEN '02' THEN 'Feb' WHEN '03' THEN 'Mar'
          WHEN '04' THEN 'Apr' WHEN '05' THEN 'May' WHEN '06' THEN 'Jun'
          WHEN '07' THEN 'Jul' WHEN '08' THEN 'Aug' WHEN '09' THEN 'Sep'
          WHEN '10' THEN 'Oct' WHEN '11' THEN 'Nov' WHEN '12' THEN 'Dec' END`;
      case 'Quarter':
        return `('Q' || ((CAST(strftime('%m', ${baseColumn}) AS INTEGER) - 1) / 3 + 1))`;
      case 'Year':
        return `strftime('%Y', ${baseColumn})`;
      default:
        return baseColumn;
    }
  }

  // --- Client-side logic to fetch aggregated results ---
  async function fetchAggregatedData(candidate: string) {
    isAggregating = true;
    aggregatedData = null;
    pageError = null;

    // Detect if it ends with any of our date operation suffixes
    const matchedOperation = dateOperations.find(op => {
      const opKey = op.replace(/ /g, '');
      return candidate.endsWith(`_${opKey}`);
    });

    let columnForSelect: string;

    if (matchedOperation) {
      const opKey = matchedOperation.replace(/ /g, '');
      const baseCandidate = candidate.replace(new RegExp(`_${opKey}$`), '');
      columnForSelect = getTemporalSql(baseCandidate, matchedOperation);
    } else {
      columnForSelect = candidate;
    }

    // Build aggregation SQL
    const aggregationSQL = `
      SELECT
        ${columnForSelect} AS category,
        COUNT(*) AS quantity
      FROM
        (${subQuery})
      GROUP BY
        ${columnForSelect};
    `;

    console.clear();
    console.log(`SQL to be executed:`, aggregationSQL);

    try {
      const res = await fetch('/sentinel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: aggregationSQL })
      });

      if (!res.ok) throw new Error(`Failed to fetch aggregation data: ${res.status}`);

      const result = await res.json();
      console.log("--- AGGREGATION RESULT FROM SERVER ---", result);

      // ✅ Fix: Wait for reactivity to settle before showing modal
      aggregatedData = result.data;
      await tick();
      showModal = true;
    } catch (e: any) {
      pageError = `Aggregation Failed: ${e.message}`;
      console.error(e);
    } finally {
      isAggregating = false;
    }
  }

  // Event handler for custom menu selection
  function handleSelect(candidate: string) {
    selectedGroupingCandidate = candidate;
    showDropdown = false;
    fetchAggregatedData(candidate);
  }
</script>

<!-- ====================== -->
<!-- MAIN PAGE LAYOUT -->
<!-- ====================== -->
<div class="card bg-base-100 shadow-xl p-8 h-full space-y-4">
  <!-- HEADER ROW -->
  <div class="flex justify-between items-center relative z-20">
    <h2 class="card-title text-2xl text-primary">SENTINEL {title.toUpperCase()}S</h2>

    <div class="relative w-72">
      <label for="investigate-button" class="text-sm font-medium text-base-content/70 whitespace-nowrap">
        Investigate on:
      </label>

      <button
        id="investigate-button"
        class="btn btn-sm btn-outline btn-block mt-1 justify-start text-left"
        on:click={() => showDropdown = !showDropdown}
      >
        {selectedGroupingCandidate ? toTitleCase(selectedGroupingCandidate) : 'Select Dimension'}
      </button>

      {#if showDropdown}
        <div
          class="absolute right-0 w-full mt-1 bg-base-100 border border-base-300 rounded shadow-2xl max-h-[70vh] overflow-y-auto z-50"
          on:mouseleave={() => showDropdown = false}
        >
          <ul class="p-2 space-y-1" role="menu">
            {#each groupingCandidates as candidate}
              {#if isDateVariant(candidate)}
                <li class="font-bold text-base-content/80 p-1 border-b border-base-200" role="presentation">
                  {toTitleCase(candidate)}
                </li>
                {#each dateOperations as operation}
                  <li role="presentation">
                    <button
                      class="pl-4 cursor-pointer hover:bg-base-200 rounded text-sm text-base-content/70 w-full text-left"
                      on:click={() => handleSelect(`${candidate}_${operation.replace(/ /g, '')}`)}
                      role="menuitem"
                      tabindex="0"
                    >
                      {operation}
                    </button>
                  </li>
                {/each}
              {:else}
                <li role="presentation">
                  <button
                    class="p-1 cursor-pointer hover:bg-primary hover:text-primary-content rounded font-medium text-sm w-full text-left"
                    on:click={() => handleSelect(candidate)}
                    role="menuitem"
                    tabindex="0"
                  >
                    {toTitleCase(candidate)}
                  </button>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>

  <!-- MAIN CONTENT -->
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

<!-- ====================== -->
<!-- MODAL CONNECTION -->
<!-- ====================== -->
{#if showModal && aggregatedData}
  <Comp_Modal
    dataSource={aggregatedData}
    columnName={selectedGroupingCandidate}
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
