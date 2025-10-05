<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from '../../../../.svelte-kit/types/src/routes';
  import type { TableData } from '../types';
  import Comp_DataTable from '$lib/Customized/Components/Comp_DataTable.svelte';

  export let data: PageData;

  let selectedTable = '';
  let tableData: TableData = { columns: [], rows: [] };
  let isLoading = false;
  let error: string | null = null;

  let tableWrapperHeight = 0;
  let headerEl: HTMLDivElement;

  // Group and sort tables for the dropdown
  $: groups = data.tables ? {
    'Lookups': data.tables.filter(t => t.startsWith('lookup_')).sort(),
    'Core Data (POI & Drugs)': data.tables.filter(t => t.startsWith('poi_') || t.startsWith('drugs_')).sort(),
    'Enforcement (Operations, Cases & Legal)': data.tables.filter(t => t.startsWith('operations_') || t.startsWith('cases_') || t.startsWith('legal_')).sort(),
    'Others': data.tables.filter(t => !(t.startsWith('lookup_') || t.startsWith('poi_') || t.startsWith('drugs_') || t.startsWith('operations_') || t.startsWith('cases_') || t.startsWith('legal_'))).sort()
  } : null;

  async function fetchTableData() {
    if (!selectedTable) return;
    isLoading = true;
    tableData = { columns: [], rows: [] };
    error = null;

    try {
      const response = await fetch(`/PDEA_EIS/table/${selectedTable}?dbType=sqlite`);
      if (!response.ok) throw new Error(await response.text() || `HTTP ${response.status}`);
      tableData = await response.json();
      updateTableHeight();
    } catch (e: any) {
      error = e?.message ?? String(e);
    } finally {
      isLoading = false;
    }
  }

  function updateTableHeight() {
    const headerHeight = headerEl?.offsetHeight ?? 0;
    const reservedSpace = 350; // leave space for header, controls, pagination + padding
    tableWrapperHeight = Math.max(200, window.innerHeight - reservedSpace);
  }

  $: if (selectedTable) {
    fetchTableData();
  }

  onMount(() => {
    updateTableHeight();
    window.addEventListener('resize', updateTableHeight);
    return () => window.removeEventListener('resize', updateTableHeight);
  });
</script>

<div class="p-6 space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="form-control">
      <label for="dbTypeSelect" class="label font-semibold">Select Database</label>
      <select id="dbTypeSelect" class="select select-bordered w-full" value="sqlite" disabled>
        <option value="sqlite">SQLite (Local)</option>
      </select>
    </div>

    <div class="form-control">
      <label for="tableSelect" class="label font-semibold">Select Table</label>
      <select id="tableSelect" bind:value={selectedTable} class="select select-bordered w-full"
              disabled={!data.tables || data.tables.length === 0}>
        {#if groups}
          {#each Object.entries(groups) as [groupName, groupTables]}
            {#if groupTables.length > 0}
              <optgroup label={groupName}>
                {#each groupTables as table}
                  <option value={table}>{table}</option>
                {/each}
              </optgroup>
            {/if}
          {/each}
        {/if}
      </select>
    </div>
  </div>

  <Comp_DataTable
    tableData={tableData}
    isLoading={isLoading}
    error={error}
    notReadyMessage="Please select a database and a table to view its contents."
  />

</div>