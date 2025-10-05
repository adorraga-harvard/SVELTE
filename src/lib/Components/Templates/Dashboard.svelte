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
    kpiCards: null,
    activityItems: []
    };
</script>


<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">{props.title || 'Dashboard'}</h1>
    <p class="project-card-description">{props.description || 'Your central hub for services and notifications.'}</p>
  </div>
  
  <div class="project-kpi-deck">
    {#if props.kpiCards && props.kpiCards.length > 0}
      {#each props.kpiCards as kpi}
      <div class="project-kpi-card">
        <div class="flex items-start justify-between">
          <div><p class="project-kpi-title">{kpi.title}</p><p class="project-kpi-value">{kpi.value}</p></div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-square btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"><li><a>View Details</a></li><li><a>Export</a></li></ul>
          </div>
        </div>
        <div class="text-xs text-base-content/60 mt-2"><span class="badge badge-xs {kpi.change > 0 ? 'badge-success' : 'badge-error'}">{kpi.change > 0 ? '▲' : '▼'} {kpi.change > 0 ? kpi.change : kpi.change * -1}%</span> vs last month</div>
      </div>
      {/each}
    {:else}
      <div class="text-center p-8 text-base-content/50 col-span-full">No KPI data available.</div>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 project-card">
      <div class="project-card-body">
        <h2 class="card-title">Key Metrics Over Time</h2>
        <div class="project-chart-container">
          <svg class="w-48 h-48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 17L8.4 9.5L12.75 14.5L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80" /><path d="M15 4H21V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80"/></svg>
        </div>
      </div>
    </div>
    <div class="project-card">
      <div class="project-card-body">
        <h2 class="card-title">Recent Activity</h2>
        <div class="mt-4">
          <ul class="project-activity-feed">
            {#if props.activityItems && props.activityItems.length > 0}
              {#each props.activityItems as item}
              <li class="project-activity-item">
                <div class="project-activity-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path></svg></div>
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
        </div>
      </div>
    </div>
  </div>
</div>
