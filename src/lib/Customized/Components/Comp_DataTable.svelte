<script lang="ts">
  import { onMount } from 'svelte';
  import type { TableData } from '../../../routes/sentinel/types';
  import TruncatedText from './Comp_TruncatedText.svelte';
  import { Pencil, ClipboardList, Save, X } from 'lucide-svelte';

  // --- PROPS ---
  export let tableData: TableData = { columns: [], rows: [] };
  export let isLoading: boolean = false;
  export let error: string | null = null;
  export let notReadyMessage: string = "Please select a database and a table to view its contents.";
  export let fontSize: string | undefined = undefined;

  // --- INTERNAL STATE & LOGIC ---
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
  let draggedColumn: string | null = null; // State for the column being dragged

  let tableWrapperHeight = 0;
  let headerEl: HTMLDivElement;
  let controllerEl: HTMLDivElement;
  let paginationEl: HTMLDivElement;

  // CRITICAL: Local, reactive array for columns that we can reorder
  $: displayColumns = [...tableData.columns];

  // --- Drag and Drop Logic ---

  function handleDragStart(column: string, e: DragEvent) {
    draggedColumn = column;
    if (e.dataTransfer) {
      // Set the column name as the transfer data
      e.dataTransfer.setData('text/plain', column);
      // Give visual feedback by showing a copy of the header being dragged
      e.dataTransfer.effectAllowed = 'move';
    }
  }

  function handleDragOver(e: DragEvent) {
    // Allows us to drop the element
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  }

  function handleDrop(targetColumn: string, e: DragEvent) {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumn) return;

    const sourceIndex = displayColumns.indexOf(draggedColumn);
    const targetIndex = displayColumns.indexOf(targetColumn);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      // 1. Remove column from source position
      const [movedColumn] = displayColumns.splice(sourceIndex, 1);

      // 2. Insert column into target position
      displayColumns.splice(targetIndex, 0, movedColumn);

      // Re-trigger Svelte's reactivity manually since we mutated the array
      displayColumns = displayColumns;
    }
    draggedColumn = null;
  }
  // --- End Drag and Drop Logic ---


  function toCamelCase(str: string) {
    return str
      .split('_')
      .map(w => w[0]?.toUpperCase() + w.slice(1))
      .join(' ');
  }

  function sortTable(key: string) {
    if (sortKey === key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    else { sortKey = key; sortDirection = 'asc'; }
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

  // Reset editing state when the table data changes
  $: if (tableData.rows.length > 0) {
      editingRowId = null;
      editedData = {};
      originalData = {};
      hasChanges = false;
  }

  let filteredData: any[] = [];
  let sortedData: any[] = [];
  $: {
    if (tableData && tableData.rows) {
      filteredData = tableData.rows.filter(row => {
        if (!searchTerm) return true;
        const s = searchTerm.toLowerCase();
        return Object.values(row).some(v => String(v ?? '').toLowerCase().includes(s));
      });
    } else {
      filteredData = [];
    }
  }

  $: {
    if (filteredData) {
      sortedData = filteredData.slice().sort((a, b) => {
        if (!sortKey) return 0;
        const A = a[sortKey], B = b[sortKey];
        if (A == null) return sortDirection === 'asc' ? 1 : -1;
        if (B == null) return sortDirection === 'asc' ? -1 : 1;
        if (typeof A === 'string' && typeof B === 'string')
          return sortDirection === 'asc' ? A.localeCompare(B) : B.localeCompare(A);
        return sortDirection === 'asc' ? (A < B ? -1 : 1) : (A > B ? -1 : 1);
      });
    } else {
      sortedData = [];
    }
  }

  $: paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  $: visiblePages = (() => {
    const maxButtons = 10;
    const pages = [];

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const sideButtons = Math.floor(maxButtons / 2) - 1;
      let start = Math.max(2, currentPage - sideButtons);
      let end = Math.min(totalPages - 1, currentPage + sideButtons);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return [...new Set(pages)];
  })();

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) currentPage = page;
  }

  $: if (itemsPerPage) {
    currentPage = 1;
  }

  $: showTableController = tableData.rows.length > 0;
  $: showPagination = totalPages > 1;

  function updateTableHeight() {
    const headerHeight = headerEl?.offsetHeight ?? 0;
    const controllerHeight = controllerEl?.offsetHeight ?? 0;
    const paginationHeight = paginationEl?.offsetHeight ?? 0;
    const reservedSpace = 350;
    tableWrapperHeight = Math.max(200, window.innerHeight - reservedSpace);
  }

  onMount(() => {
    updateTableHeight();
    window.addEventListener('resize', updateTableHeight);
    return () => window.removeEventListener('resize', updateTableHeight);
  });
</script>

<div id="table-container" style={fontSize ? `--table-font-size: ${fontSize};` : ''}>
  <div
    id="tableController"
    bind:this={controllerEl}
    class="{showTableController ? '' : 'hidden'} flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4"
>
    <div class="relative w-full md:w-1/2">
       <input
          type="text"
          placeholder="Search all fields..."
          bind:value={searchTerm}
          class="input input-bordered w-full pl-10 pr-2"
       />
       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
       </span>
    </div>

    <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs">
       <div class="flex items-center gap-1">
          <label for="itemsPerPageSelect" class="font-medium text-xs">Items per page:</label>
          <select id="itemsPerPageSelect" bind:value={itemsPerPage} class="select select-bordered w-20">
             {#each itemsPerPageOptions as size}
                <option value={size}>{size}</option>
             {/each}
          </select>
       </div>
       <div class="hidden">
          Showing {filteredData.length} of {tableData.rows.length} entries
       </div>
    </div>
</div>

  {#if isLoading}
    <div class="p-6 text-center">Loading data...</div>
  {:else if error}
    <div class="alert alert-error">{error}</div>
  {/if}

  {#if tableData.rows.length > 0}
    <div class="overflow-x-auto overflow-y-auto bg-base-100" style="max-height:{tableWrapperHeight}px;">
      <table class="table table-zebra w-full">
        <thead bind:this={headerEl} class="sticky top-0 z-10 bg-base-200 font-extrabold dark:bg-base-300 uppercase tracking-wide">
          <tr>
            <th class="w-10"></th>
            {#each displayColumns as column (column)}
              <th class="cursor-pointer transition-all duration-100 ease-in-out select-none"
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(column, e)}
                  on:dragover={(e) => handleDragOver(e)}
                  on:drop={(e) => handleDrop(column, e)}
                  on:dragend={() => (draggedColumn = null)}
              >
                {toCamelCase(column)}
                {#if sortKey === column}
                  ({sortDirection})
                {/if}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each paginatedData as row}
            <tr class="hover:bg-base-200">
                <td>
                    {#if editingRowId === row.id}
                        <div class="flex gap-2">
                            {#if hasChanges}
                                <button class="btn btn-sm btn-circle btn-success" on:click={saveChanges} title="Save Changes">
                                    <Save size={16} />
                                </button>
                                <button class="btn btn-sm btn-circle btn-warning" on:click={cancelEdit} title="Cancel/Revert">
                                    <X size={16} />
                                </button>
                            {/if}
                        </div>
                    {:else}
                        <div class="relative group">
                             <div class="w-10 h-10 flex items-center justify-center cursor-pointer">
                                 <div class="flex gap-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                                     <button class="btn btn-sm btn-circle btn-ghost" on:click={() => startInlineEdit(row)} title="Inline Edit">
                                         <Pencil size={16} />
                                     </button>
                                     <button class="btn btn-sm btn-circle btn-ghost" title="Form Edit">
                                         <ClipboardList size={16} />
                                     </button>
                                 </div>
                             </div>
                         </div>
                    {/if}
                </td>
              {#each displayColumns as column}
                <td>
                  {#if editingRowId === row.id}
                      <input type="text"
                             class="input input-bordered input-sm w-full"
                             value={editedData[column] ?? ''}
                             on:input={(e) => onCellChange(column, e.currentTarget.value)}
                      />
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

  <div id="pagination" bind:this={paginationEl} class="{showPagination ? '' : 'hidden'} flex justify-center gap-2 mt-4">
    <button class="btn btn-sm" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
    {#each visiblePages as page}
      {#if page === '...'}
        <span class="btn btn-sm btn-disabled">...</span>
      {:else}
        <button class="btn btn-sm {currentPage === page ? 'btn-active' : ''}" on:click={() => goToPage(page as number)}>
          {page}
        </button>
      {/if}
    {/each}
    <button class="btn btn-sm" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
  </div>
</div>

<style>
  .table tbody {
    font-size: var(--table-font-size, inherit);
  }

  .table thead {
    font-size: var(--table-header-font-size, 1.25rem);
  }

  .table thead {
    font-size: calc(var(--table-font-size, 1rem) * 1.2);
  }
</style>