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
    datasets: []
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{props.title || 'Open Data Catalog'}</h2>
    <p class="project-card-description">{props.description || 'Browse and download raw datasets.'}</p>
    <div class="project-card-divider"></div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr><th>Dataset</th><th>Format</th><th>Last Updated</th><th></th></tr>
        </thead>
        <tbody>
          {#if props.datasets && props.datasets.length > 0}
            {#each props.datasets as ds}
              <tr>
                <td>{ds.name}</td>
                <td>{ds.format}</td>
                <td>{ds.updated}</td>
                <td><a class="btn btn-xs btn-outline" href={ds.url} download>Download</a></td>
              </tr>
            {/each}
          {:else}
            <tr><td colspan="4" class="text-center p-8 text-base-content/50">No datasets published yet.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
