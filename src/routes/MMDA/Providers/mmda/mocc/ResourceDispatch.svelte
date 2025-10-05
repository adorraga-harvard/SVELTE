<script lang="ts">
// Auto-generated for Providers/mmda/mocc/ResourceDispatch.svelte
// Endpoint type(s): map,dashboard
export let data: any;
</script>

<div class="endpoint-container">
  <div class="w-full h-96 rounded-box overflow-hidden shadow-xl">
    <h2 class="text-2xl font-bold mb-4">{data.pageData.title}</h2>
    <p>{data.pageData.description}</p>
    <div id="map" class="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
      🗺️ Interactive Map Placeholder
    </div>
  </div>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">{data.pageData.title}</h2>
    <p>{data.pageData.description}</p>
    <div class="stats shadow w-full">
      <div class="stat">
        <div class="stat-title">Budget Utilization</div>
        <div class="stat-value">72%</div>
      </div>
      <div class="stat">
        <div class="stat-title">Departments Reporting</div>
        <div class="stat-value">18</div>
      </div>
      <div class="stat">
        <div class="stat-title">Alerts</div>
        <div class="stat-value text-error">5 Critical</div>
      </div>
    </div>
  </div>
</div>
