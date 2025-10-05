<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    timeline: null
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Timeline</h2>
    <div class="relative border-l-2 border-base-200 ml-4">
      {#if props.timeline && props.timeline.length > 0}
        {#each props.timeline as step}
          <div class="mb-8 ml-4">
            <div class="absolute w-3 h-3 bg-primary rounded-full -left-[7px] mt-1.5"></div>
            <h3 class="font-semibold">{step.title}</h3>
            <p class="text-sm text-base-content/70">{step.description}</p>
            <p class="text-xs text-base-content/50">{step.time}</p>
          </div>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No timeline data available.</div>
      {/if}
    </div>
  </div>
</div>
