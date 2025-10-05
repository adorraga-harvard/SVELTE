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
    report: null
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{props.title || 'Generated Report'}</h2>
    <p class="project-card-description">{props.description || 'Structured report summary.'}</p>
    <div class="project-card-divider"></div>
    {#if props.report}
      <div class="project-prose max-w-none">
        <h3 class="font-bold">{props.report.title}</h3>
        <p class="text-sm text-base-content/60">{props.report.date}</p>
        <div class="divider"></div>
        <p>{@html props.report.body}</p>
      </div>
      <div class="mt-4 flex justify-end">
        <button class="btn btn-sm btn-primary">Export PDF</button>
      </div>
    {:else}
      <div class="text-center p-8 text-base-content/50">No report data available.</div>
    {/if}
  </div>
</div>
