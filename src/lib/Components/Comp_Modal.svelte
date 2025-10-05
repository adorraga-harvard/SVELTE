<!-- src/lib/components/Modal.svelte -->
<script lang="ts">
  export let showModal: boolean;
  export let title: string;
</script>

{#if showModal}
<div class="fixed inset-0 bg-black/40 overflow-y-auto h-full w-full z-[100] flex justify-center items-center">
  <div class="relative w-full max-w-lg p-6 my-8 mx-auto shadow-xl rounded-xl bg-white transform transition-all duration-300 scale-100">
    <div>
      <div class="text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            <slot name="description" />
          </p>
        </div>
      </div>
      <slot name="body" />
    </div>
  </div>
</div>
{/if}
