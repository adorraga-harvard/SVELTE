<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    kpiCards: null
    };
</script>


<div class="project-kpi-deck">
  {#if props.kpiCards && props.kpiCards.length > 0}
    {#each props.kpiCards as kpi}
    <div class="project-kpi-card">
        <div class="flex items-start justify-between">
          <div>
            <p class="project-kpi-title">{kpi.title}</p>
            <p class="project-kpi-value">{kpi.value}</p>
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-square btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"><li><a>View Details</a></li><li><a>Export</a></li></ul>
          </div>
        </div>
        <div class="text-xs text-base-content/60 mt-2">
          <span class="badge badge-xs {kpi.change > 0 ? 'badge-success' : 'badge-error'}">{kpi.change > 0 ? '▲' : '▼'} {kpi.change > 0 ? kpi.change : kpi.change * -1}%</span> vs last month
        </div>
    </div>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50 col-span-full">No KPI data available.</div>
  {/if}
</div>
