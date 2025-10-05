<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description",
    listItems: []
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{props.title || 'Item List'}</h2>
    <p class="project-card-description">{props.description || 'Simple list view of records.'}</p>
    <div class="project-card-divider"></div>
    <ul class="divide-y divide-base-200">
      {#if props.listItems && props.listItems.length > 0}
        {#each props.listItems as item}
          <li class="py-3 flex justify-between items-center">
            <div>
              <p class="font-medium">{item.title}</p>
              <p class="text-xs text-base-content/60">{item.subtitle}</p>
            </div>
            <button class="btn btn-xs btn-outline">View</button>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No items to display.</div>
      {/if}
    </ul>
  </div>
</div>
