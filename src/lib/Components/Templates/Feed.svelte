<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    feedItems: []
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Live Feed</h2>
    <ul class="project-activity-feed">
      {#if props.feedItems && props.feedItems.length > 0}
        {#each props.feedItems as item}
          <li class="project-activity-item">
            <div class="project-activity-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
            </div>
            <div>
              <p class="text-sm">{@html item.message}</p>
              <p class="text-xs text-base-content/60">{item.time}</p>
            </div>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No feed items yet.</div>
      {/if}
    </ul>
  </div>
</div>
