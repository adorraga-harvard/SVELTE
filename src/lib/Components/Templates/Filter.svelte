<script lang="ts">
  /**
   * Props are now defined as individual exports for better reliability.
   */

  export let customClass: string = "";

  // This default will now be respected even if the parent component
  // doesn't pass a 'filter' prop.
  export let filter: {
    search?: string;
    category?: string;
    status?: string;
    categories?: string[];
  } = {
    search: '',
    category: '',
    status: '',
    categories: []
  };

  // Ensure filter is never null/undefined if passed explicitly as such.
  // This line adds extra safety.
  $: filter = filter || { categories: [] };

</script>

<div class="project-card {customClass}">
  <div class="project-card-body space-y-4">
    <h2 class="card-title">Filter Records</h2>
    <form class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="label"><span class="label-text">Search</span></label>
        <input type="text" placeholder="Type keyword..." class="input input-bordered w-full" bind:value={filter.search} />
      </div>
      <div>
        <label class="label"><span class="label-text">Category</span></label>
        <select class="select select-bordered w-full" bind:value={filter.category}>
          <option disabled selected>Choose category</option>
          {#each filter.categories || [] as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="label"><span class="label-text">Status</span></label>
        <select class="select select-bordered w-full" bind:value={filter.status}>
          <option disabled selected>Choose status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Archived</option>
        </select>
      </div>
    </form>
    <div class="flex justify-end gap-2">
      <button class="btn btn-sm btn-outline">Reset</button>
      <button class="btn btn-sm btn-primary">Apply</button>
    </div>
  </div>
</div>