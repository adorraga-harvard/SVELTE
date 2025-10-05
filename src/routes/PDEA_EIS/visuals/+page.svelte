<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import Comp_DataTable from '$lib/Customized/Components/Comp_DataTable.svelte';
  import Comp_Modal from '$lib/Customized/Components/Comp_Modal.svelte';
  import Comp_EIS from "$lib/Customized/Components/Comp_EIS.svelte";

  export let data;
  $: schemas = data?.schemas || [];

  let selectedSchema: typeof schemas[0] | undefined;
  let showModal = false;

  let mainDataSource: any = {};
  let chartDataSource: any[] = [];
  let loading = false;
  let error = null;

  let selectedAnalyzeColumn = '';
  let selectedDateOption = '';

  const dateOperations = [
    'As Is', 'Day', 'Day of Week', 'Hour', 'Day / Night',
    'Month', 'Quarter', 'Year'
  ];

  let expandedNodes: Record<string, boolean> = {};

  // --- Update selected schema from URL ---
  $: {
    const tabName = $page.url.searchParams.get('tab');
    if (schemas.length > 0) {
      selectedSchema = schemas.find(s => s.name === tabName);
    }
  }

  // --- Fetch main data source ---
  $: {
    async function fetchData() {
      if (!selectedSchema) {
        mainDataSource = {};
        return;
      }
      loading = true;
      error = null;
      try {
        const response = await fetch(`/PDEA_EIS/visuals?tab=${selectedSchema.name}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        mainDataSource = await response.json();
      } catch (e) {
        error = 'An error occurred while fetching data.';
        console.error(e);
      } finally {
        loading = false;
      }
    }
    fetchData();
  }

  async function fetchChartData(sql: string) {
    chartDataSource = [];
    if (!sql) return;
    loading = true;
    error = null;
    console.log('Fetching chart data:', sql);
    try {
      const encodedQuery = encodeURIComponent(sql);
      const url = `/PDEA_EIS/visuals?sql=${encodedQuery}&tab=${selectedSchema?.name}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to execute query`);
      const result = await response.json();
      chartDataSource = result.dataSource || [];
      if (chartDataSource.length) showModal = true; // Open modal only when data ready
    } catch (e) {
      error = 'Failed to load chart data.';
      console.error("Chart Data Fetch Error:", e);
    } finally {
      loading = false;
    }
  }

  function toCapitalizedCamelCase(s: string) {
    if (!s) return '';
    return s.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  function isDateVariant(col: string) {
    return col.startsWith('*');
  }

  function toggleExpand(col: string) {
    expandedNodes[col] = !expandedNodes[col];
  }

  function handleDateChildClick(col: string, operation: string) {
    selectedAnalyzeColumn = col;
    selectedDateOption = operation;
    generateChartOrMap();
  }

  function handleNodeClick(col: string) {
    if (isDateVariant(col)) toggleExpand(col);
    else {
      selectedAnalyzeColumn = col;
      selectedDateOption = '';
      generateChartOrMap();
    }
  }

  function generateChartOrMap() {
    if (!selectedAnalyzeColumn) return;
    const col = selectedAnalyzeColumn;
    const lowerCol = col.toLowerCase();
    let sql = selectedSchema?.subQuery || '';
    const colName = isDateVariant(col) ? col.slice(1) : col;

    if (isDateVariant(col) && selectedDateOption && selectedDateOption !== 'As Is') {
      let op = selectedDateOption;
      let sortExpr = '';
      if (op === 'Day of Week') {
        op = `CASE strftime('%w', ${colName})
          WHEN '0' THEN 'Sunday' WHEN '1' THEN 'Monday'
          WHEN '2' THEN 'Tuesday' WHEN '3' THEN 'Wednesday'
          WHEN '4' THEN 'Thursday' WHEN '5' THEN 'Friday'
          WHEN '6' THEN 'Saturday' END`;
        sortExpr = `CAST(strftime('%w', ${colName}) AS integer)`;
      } else if (op === 'Month') {
        op = `CASE strftime('%m', ${colName})
          WHEN '01' THEN 'January' WHEN '02' THEN 'February'
          WHEN '03' THEN 'March' WHEN '04' THEN 'April'
          WHEN '05' THEN 'May' WHEN '06' THEN 'June'
          WHEN '07' THEN 'July' WHEN '08' THEN 'August'
          WHEN '09' THEN 'September' WHEN '10' THEN 'October'
          WHEN '11' THEN 'November' WHEN '12' THEN 'December' END`;
        sortExpr = `CAST(strftime('%m', ${colName}) AS integer)`;
      } else if (op === 'Quarter') {
        op = `('Q' || ((cast(strftime('%m', ${colName}) as integer)-1)/3+1))`;
        sortExpr = `((cast(strftime('%m', ${colName}) as integer)-1)/3+1)`;
      } else if (op === 'Day / Night') {
        op = `CASE WHEN cast(strftime('%H', ${colName}) as integer) < 12 THEN 'Day' ELSE 'Night' END`;
        sortExpr = `cast(strftime('%H', ${colName}) as integer)`;
      } else if (op === 'Year') op = sortExpr = `strftime('%Y', ${colName})`;
      else if (op === 'Hour') op = sortExpr = `strftime('%H', ${colName})`;
      else if (op === 'Day') op = sortExpr = `strftime('%d', ${colName})`;

      sql = `SELECT ${op} AS category, COUNT(*) AS quantity, ${sortExpr} AS sort_order
             FROM (\n${sql}\n)
             GROUP BY category, sort_order
             ORDER BY sort_order`;
    } else {
      sql = `SELECT ${colName} AS category, COUNT(*) AS quantity FROM (\n${sql}\n) GROUP BY ${colName}`;
    }

    fetchChartData(sql);
  }

  function handleTabClick(tabName: string) {
    selectedAnalyzeColumn = '';
    selectedDateOption = '';
    chartDataSource = [];
    goto(`/PDEA_EIS/visuals?tab=${tabName}`, { keepFocus: true, noScroll: true, replaceState: true });
  }

  $: dataSource = mainDataSource.dataSource || [];
  $: tableData = {
    columns: dataSource.length ? Object.keys(dataSource[0]) : [],
    rows: dataSource
  };

  let showAnalyzeDropdown = false;
  function toggleDropdown() { showAnalyzeDropdown = !showAnalyzeDropdown; }
  function closeDropdown() { showAnalyzeDropdown = false; }
</script>

<div class="p-4 space-y-2">
<nav class="flex space-x-2 relative z-10">
    {#each schemas as schema}
      <a
        role="tab"
        class="tab tab-custom"
        class:tab-active={selectedSchema?.name === schema.name}
        on:click={() => handleTabClick(schema.name)}
        href="?tab={schema.name}"
        title={schema.topDescription}
      >
        {toCapitalizedCamelCase(schema.name)}
      </a>
    {/each}
  </nav>

  <hr>

  {#if selectedSchema}
    <div class="analyze-section relative p-3 rounded-lg bg-base-200 border border-base-300 shadow-sm" role="region">
      <div class="flex items-center gap-2">
        <button class="analyze-label font-semibold" on:click={toggleDropdown} aria-haspopup="listbox">
          Investigate By:
        </button>
        <div class="relative flex-1 text-sm bg-base-200/60 text-base-content/50">
          <button class="w-full border border-base-300 rounded px-2 py-1 text-left" on:click={toggleDropdown}>
            {selectedAnalyzeColumn
              ? toCapitalizedCamelCase(selectedAnalyzeColumn.replace('*',''))
              : '-- Select Column --'}
          </button>
          {#if showAnalyzeDropdown}
            <ul role="listbox" class="absolute top-full left-0 w-full mt-1 bg-base-100 border border-base-300 rounded max-h-[90vh] overflow-y-auto z-20 shadow-md">
              {#each selectedSchema.columns as col}
                {#if !['remarks','comments','description'].includes(col.toLowerCase())}
                  {#if isDateVariant(col)}
                    <li class="pl-2 mb-0.5 font-light text-base-400 underline">{toCapitalizedCamelCase(col.slice(1))}</li>
                    {#each dateOperations as op}
                      <li>
                        <button
                          role="option"
                          aria-selected="false"
                          class="tree-leaf w-full text-left hover:bg-base-300 p-0.5 rounded cursor-pointer text-sm"
                          on:click={() => { handleDateChildClick(col, op); closeDropdown(); }}>
                          {op}
                        </button>
                      </li>
                    {/each}
                  {:else}
                    <li>
                      <button
                        role="option"
                        aria-selected="false"
                        class="tree-node w-full text-left hover:bg-base-300 p-0.5 rounded cursor-pointer text-sm"
                        on:click={() => { handleNodeClick(col); closeDropdown(); }}>
                        {toCapitalizedCamelCase(col)}
                      </button>
                    </li>
                  {/if}
                {/if}
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>

    <Comp_DataTable
      tableData={tableData}
      isLoading={loading}
      error={error}
      notReadyMessage="Please select a column to begin."
      fontSize="0.6rem"
    />
    {:else}
  <Comp_EIS />

  {/if}
</div>

{#if showModal}
  <Comp_Modal
    dataSource={chartDataSource}
    columnName={toCapitalizedCamelCase(selectedAnalyzeColumn.replace('*',''))}
    on:close={() => showModal = false}
  />
{/if}


<style>
  .tab-custom { border-radius: 0.25rem 0.25rem 0 0; padding: 0.25rem 0.5rem; }
  .tab-active { font-weight: bold; border-bottom: 2px solid; }
  .analyze-section { background-color: var(--base-200); border-radius: 0.5rem 0.5rem 0 0; padding: 0.5rem; margin-bottom: 0.5rem; }
  .tree-node { padding-left: 0.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
  .tree-leaf { padding-left: 1.5rem; cursor: pointer; }
</style>