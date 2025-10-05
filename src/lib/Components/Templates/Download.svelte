<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    files: null
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Download Center</h2>
    <ul class="divide-y divide-base-200">
      {#if props.files && props.files.length > 0}
        {#each props.files as file}
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium">{file.name}</p>
              <p class="text-xs text-base-content/60">{file.type} • {file.size} • {file.date}</p>
            </div>
            <a class="btn btn-sm btn-outline" href={file.url} download>
              Download
            </a>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No downloadable files available.</div>
      {/if}
    </ul>
  </div>
</div>
