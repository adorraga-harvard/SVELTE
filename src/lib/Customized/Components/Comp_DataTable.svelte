<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { TableData } from '../../../routes/sentinel/types';
  import TruncatedText from './Comp_TruncatedText.svelte';
  import Comp_MapLocator from './Comp_MapLocator.svelte';
  import { Pencil, ClipboardList, Save, X } from 'lucide-svelte';

  export let tableData: TableData = { columns: [], rows: [] };
  export let isLoading: boolean = false;
  export let error: string | null = null;
  export let notReadyMessage: string = "Please select a database and a table to view its contents.";
  export let fontSize: string | undefined = undefined;

  let searchTerm = '';
  let currentPage = 1;
  let itemsPerPageOptions = [10, 20, 50, 100];
  let itemsPerPage = 20;
  let sortKey: string | null = null;
  let sortDirection: 'asc' | 'desc' = 'asc';

  let editingRowId: number | null = null;
  let editedData: Record<string, any> = {};
  let originalData: Record<string, any> = {};
  let hasChanges = false;
  let draggedColumn: string | null = null;

  let tableWrapperHeight = 0;
  let headerEl: HTMLDivElement;
  let controllerEl: HTMLDivElement;
  let paginationEl: HTMLDivElement;

  let showMap = false;
  let mapCoordinate: string | null = null;

  $: displayColumns = [...tableData.columns];

  // --- Drag & Drop ---
  function handleDragStart(column: string, e: DragEvent) {
    draggedColumn = column;
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', column);
      e.dataTransfer.effectAllowed = 'move';
    }
  }
  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  }
  function handleDrop(targetColumn: string, e: DragEvent) {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumn) return;
    const sourceIndex = displayColumns.indexOf(draggedColumn);
    const targetIndex = displayColumns.indexOf(targetColumn);
    if (sourceIndex !== -1 && targetIndex !== -1) {
      const [movedColumn] = displayColumns.splice(sourceIndex, 1);
      displayColumns.splice(targetIndex, 0, movedColumn);
      displayColumns = displayColumns;
    }
    draggedColumn = null;
  }

  // --- Utilities ---
  function toCamelCase(str: string) {
    return str.split('_').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ');
  }

  function sortTable(key: string) {
    if (sortKey === key) sortDirection = sortDirection === '▼' ? '▲' : '▼';
    else { sortKey = key; sortDirection = '▼'; }
    currentPage = 1;
  }

  function startInlineEdit(row: Record<string, any>) {
    editingRowId = row.id;
    editedData = { ...row };
    originalData = { ...row };
    hasChanges = false;
  }

  function onCellChange(column: string, value: any) {
    editedData = { ...editedData, [column]: value };
    hasChanges = JSON.stringify(editedData) !== JSON.stringify(originalData);
  }

  function saveChanges() {
    console.log('Saving changes:', editedData);
    editingRowId = null;
    editedData = {};
    originalData = {};
    hasChanges = false;
  }

  function cancelEdit() {
    editingRowId = null;
    editedData = {};
    originalData = {};
    hasChanges = false;
  }

  $: if (tableData.rows.length > 0) {
      editingRowId = null;
      editedData = {};
      originalData = {};
      hasChanges = false;
  }

  // --- Filter & Sort ---
  let filteredData: any[] = [];
  let sortedData: any[] = [];
  $: {
    filteredData = tableData.rows.filter(row => {
      if (!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      return Object.values(row).some(v => String(v ?? '').toLowerCase().includes(s));
    });
  }

  $: {
    sortedData = filteredData.slice().sort((a, b) => {
      if (!sortKey) return 0;
      const A = a[sortKey], B = b[sortKey];
      if (A == null) return sortDirection === '▼' ? 1 : -1;
      if (B == null) return sortDirection === '▼' ? -1 : 1;
      if (typeof A === 'string' && typeof B === 'string')
        return sortDirection === '▼' ? A.localeCompare(B) : B.localeCompare(A);
      return sortDirection === '▼' ? (A < B ? -1 : 1) : (A > B ? -1 : 1);
    });
  }

  $: paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  $: visiblePages = (() => {
    const maxButtons = 10;
    const pages = [];
    if (totalPages <= maxButtons) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      pages.push(1);
      const sideButtons = Math.floor(maxButtons / 2) - 1;
      let start = Math.max(2, currentPage - sideButtons);
      let end = Math.min(totalPages - 1, currentPage + sideButtons);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  })();

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) currentPage = page;
  }

  $: if (itemsPerPage) currentPage = 1;
  $: showTableController = tableData.rows.length > 0;
  $: showPagination = totalPages > 1;

  function updateTableHeight() {
    const reservedSpace = 350;
    tableWrapperHeight = Math.max(200, window.innerHeight - reservedSpace);
  }

  onMount(() => {
    updateTableHeight();
    window.addEventListener('resize', updateTableHeight);
    return () => window.removeEventListener('resize', updateTableHeight);
  });

  // --- Map functions ---
  function openMap(coord: string) {
    mapCoordinate = coord;
    showMap = true;
  }
  function closeMap() {
    showMap = false;
    mapCoordinate = null;
  }

  function hasCoordinates(val: any) {
  if (val == null) return false;
  const strVal = String(val);
  return strVal.includes('Latitude') && strVal.includes('Longitude');
}

</script>

<div id="table-container" style={fontSize ? `--table-font-size: ${fontSize};` : ''}>
  <div bind:this={controllerEl} class="{showTableController ? '' : 'hidden'} flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
    <div class="relative w-full md:w-1/2">
      <input type="text" placeholder="Search all fields..." bind:value={searchTerm}
             class="input input-bordered w-80 pl-10 mb-2 pr-2"/>
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
        </svg>
      </span>
    </div>

    <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs">
      <div class="flex items-center gap-1">
        <label class="font-medium text-xs">Items per page:</label>
        <select bind:value={itemsPerPage} class="select select-bordered w-20">
          {#each itemsPerPageOptions as size}
            <option value={size}>{size}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  {#if isLoading}<div class="p-6 text-center">Loading data...</div>
  {:else if error}<div class="alert alert-error">{error}</div>{/if}

  {#if tableData.rows.length > 0}
    <div class="overflow-x-auto overflow-y-auto bg-base-100" style="max-height:{tableWrapperHeight}px;">
      <table class="table table-zebra w-full">
        <thead bind:this={headerEl} class="sticky top-0 z-10 bg-base-200 font-extrabold dark:bg-base-300 uppercase tracking-wide">
          <tr>
            <th class="w-10"></th>
            {#each displayColumns as column (column)}
              <th class="cursor-pointer select-none"
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(column, e)}
                  on:dragover={(e) => handleDragOver(e)}
                  on:drop={(e) => handleDrop(column, e)}
                  on:dragend={() => (draggedColumn = null)}
                  on:contextmenu={(e) => { e.preventDefault(); sortTable(column); }}>
                {toCamelCase(column)}
                {#if sortKey === column} ({sortDirection}) {/if}
              </th>
            {/each}
          </tr>
        </thead>

        <tbody>
          {#each paginatedData as row}
            <tr class="hover:outline hover:outline-4 hover:outline-lime-400">
              <td>
                {#if editingRowId === row.id}
                  <div class="flex gap-2">
                    {#if hasChanges}
                      <button class="btn btn-sm btn-circle btn-success" on:click={saveChanges}><Save size={16}/></button>
                      <button class="btn btn-sm btn-circle btn-warning" on:click={cancelEdit}><X size={16}/></button>
                    {/if}
                  </div>
                {:else}
                  <div class="relative group">
                    <div class="w-10 h-10 flex items-center justify-center cursor-pointer">
                      <div class="flex gap-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                        <button class="btn btn-sm btn-circle btn-ghost" on:click={() => startInlineEdit(row)}><Pencil size={16}/></button>
                        <button class="btn btn-sm btn-circle btn-ghost"><ClipboardList size={16}/></button>
                      </div>
                    </div>
                  </div>
                {/if}
              </td>

              {#each displayColumns as column}
                <td>
                  {#if editingRowId === row.id}
                    <input type="text" class="input input-bordered input-sm w-full"
                           value={editedData[column] ?? ''}
                           on:input={(e) => onCellChange(column, e.currentTarget.value)}/>
                  {:else if hasCoordinates(row[column])}
                    <div class="flex items-center gap-2">
                      {row[column]}
                      <button class="badge badge-success btn-xs" on:click={() => openMap(row[column])}>Map</button>
                    </div>
                  {:else if typeof row[column] === 'string' && row[column].length > 100}
                    <TruncatedText text={row[column]} />
                  {:else}
                    {row[column] ?? ''}
                  {/if}
                </td>
              {/each}
            </tr>
          {:else}
            <tr>
              <td colspan={tableData.columns.length + 1} class="text-center">No matching records</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else if !isLoading && !error}
    <div class="alert alert-info">{notReadyMessage}</div>
  {/if}

  <div bind:this={paginationEl} class="{showPagination ? '' : 'hidden'} flex justify-center gap-2 mt-4">
    <button class="btn btn-sm" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
    {#each visiblePages as page}
      {#if page === '...'}
        <span class="btn btn-sm btn-disabled">...</span>
      {:else}
        <button class="btn btn-sm {currentPage === page ? 'btn-active' : ''}" on:click={() => goToPage(page)}>{page}</button>
      {/if}
    {/each}
    <button class="btn btn-sm" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
  </div>

  {#if showMap && mapCoordinate}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" on:click={closeMap} transition:fade></div>
      <div class="bg-base-100 p-4 rounded shadow-lg relative w-[90%] h-[80%] z-10" transition:fly={{y:20,duration:250}}>
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" on:click={closeMap}>✕</button>
        <Comp_MapLocator grid-coordinate={mapCoordinate} />
      </div>
    </div>
  {/if}
</div>

<style>
  .table tbody { font-size: var(--table-font-size, inherit); }
  .table thead { font-size: calc(var(--table-font-size, 1rem) * 1.2); }
</style>