<script lang="ts">
  export let providerPath = '';
  export let componentPromise: Promise<any> | null = null;
  export let pageData: { end_point?: string; title?: string; description?: string } | null = null;
  export let visible = false;
</script>

{#if visible}
  <div
    class="fixed bottom-4 right-4 z-50 p-4 bg-base-200 border border-base-300 rounded-lg shadow-xl text-xs font-mono max-w-sm w-72 animate-fade-in"
  >
    <div class="font-bold text-primary mb-2">⚙️ Debug Panel</div>
    <div class="space-y-1">
      <div><span class="text-secondary">providerPath:</span> {providerPath}</div>
      <div><span class="text-secondary">componentPromise:</span> {componentPromise ? 'Promise exists' : 'null'}</div>
      <div><span class="text-secondary">end_point:</span> {pageData?.end_point}</div>
      <div><span class="text-secondary">title:</span> {pageData?.title}</div>
    </div>
  </div>
{/if}
