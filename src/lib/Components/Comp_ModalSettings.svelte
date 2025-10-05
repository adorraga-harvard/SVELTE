<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { fade, scale } from "svelte/transition";

  export let component: string = "";
  export let settingsSchema: Record<
    string,
    { type: string; label: string; description: string; options?: string[]; default: any }
  > = {};
  export let values: Record<string, any> = {};

  const dispatch = createEventDispatcher();

  function save() {
    localStorage.setItem(`Settings.${component}`, JSON.stringify(values));
    dispatch("save", { component, values });
  }

  function close() {
    dispatch("close");
  }

  onMount(() => {
    // Disable background scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  });
</script>

<!-- Modal Backdrop -->
<div
  class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
  transition:fade
>
  <!-- Modal Box -->
  <div
    class="bg-gradient-to-br from-base-100 via-base-200 to-base-100
           w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-8
           max-h-[90vh] flex flex-col"
    transition:scale={{ duration: 200 }}
  >
    <h3 class="font-bold text-2xl mb-2">{component} Customization</h3>
    <p class="mb-4 text-gray-600">
      Adjust the settings below to customize <span class="font-semibold">{component}</span>.
    </p>

    <!-- Form container scrolls inside modal if overflow -->
    <form class="space-y-6 overflow-y-auto pr-2 flex-1">
      {#each Object.entries(settingsSchema) as [key, field]}
        <div class="form-control w-full">
          {#if field.type === 'select'}
            <label class="label flex flex-col w-full">
              <span class="font-semibold">{field.label}</span>
              <select bind:value={values[key]} class="select select-bordered w-full mt-1">
                {#each field.options as opt}
                  <option value={opt}>{opt}</option>
                {/each}
              </select>
              <span class="text-sm text-gray-500 mt-1">{field.description}</span>
            </label>

          {:else if field.type === 'boolean'}
            <label class="label cursor-pointer flex items-center gap-3">
              <input type="checkbox" bind:checked={values[key]} class="checkbox" />
              <span class="font-semibold">{field.label}</span>
            </label>
            <span class="text-sm text-gray-500 ml-8">{field.description}</span>

          {:else if field.type === 'list'}
            <label class="label flex flex-col w-full">
              <span class="font-semibold">{field.label}</span>
              <textarea
                bind:value={values[key]}
                class="textarea textarea-bordered w-full mt-1"
                rows="4"
              ></textarea>
              <span class="text-sm text-gray-500 mt-1">{field.description}</span>
            </label>

          {:else}
            <label class="label flex flex-col w-full">
              <span class="font-semibold">{field.label}</span>
              <input
                type="text"
                bind:value={values[key]}
                class="input input-bordered w-full mt-1"
              />
              <span class="text-sm text-gray-500 mt-1">{field.description}</span>
            </label>
          {/if}
        </div>
      {/each}
    </form>

    <!-- Modal Actions -->
    <div class="mt-6 flex justify-end gap-4">
      <button type="button" class="btn btn-primary" on:click={save}>Save</button>
      <button type="button" class="btn" on:click={close}>Close</button>
    </div>
  </div>
</div>
