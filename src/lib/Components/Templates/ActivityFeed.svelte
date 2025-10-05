<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    activityItems: []
    };
</script>


<ul class="project-activity-feed">
  {#if props.activityItems && props.activityItems.length > 0}
    {#each props.activityItems as item}
    <li class="project-activity-item">
      <div class="project-activity-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path></svg>
      </div>
      <div>
        <div class="text-sm project-prose" style="max-width: none;">{@html item.description}</div>
        <p class="text-xs text-base-content/60">{item.time}</p>
      </div>
    </li>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50">No recent activity.</div>
  {/if}
</ul>
