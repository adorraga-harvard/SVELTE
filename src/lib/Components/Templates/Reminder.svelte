<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    reminder: null
    };
</script>


<div class="alert alert-info shadow-lg">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 6v.01M12 20h.01M20 12h.01M4 12h.01M12 4h.01M12 20h.01M20 12h.01M4 12h.01" />
  </svg>
  <div>
    <h3 class="font-bold">{props.reminder?.title || 'Reminder'}</h3>
    <div class="text-xs">{props.reminder?.message || 'You have an upcoming schedule or task.'}</div>
  </div>
  <button class="btn btn-sm btn-ghost">Dismiss</button>
</div>
