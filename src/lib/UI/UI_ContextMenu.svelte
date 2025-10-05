<script lang="ts">
  import { contextMenu, hideContextMenu } from '$lib/Stores/Store_ContextMenu';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let menuElement: HTMLElement;

  function handleItemClick(id: string) {
    const state = $contextMenu;
    if (state.onItemSelected) {
      state.onItemSelected(id);
    }
    hideContextMenu();
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuElement && !menuElement.contains(event.target as Node)) {
      hideContextMenu();
    }
  }

  function handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      hideContextMenu();
    }
  }

  if (browser) {
    onMount(() => {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('keydown', handleEscapeKey);
    });

    onDestroy(() => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEscapeKey);
    });
  }
</script>

{#if $contextMenu.isVisible}
  <div
    class="fixed bg-white border border-gray-300 rounded-md shadow-lg py-1 z-50"
    style="left: {$contextMenu.x}px; top: {$contextMenu.y}px;"
    bind:this={menuElement}
  >
    <ul>
      {#each $contextMenu.items as item (item.id)}
        <li>
          <button
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-indigo-500 focus:text-white"
            on:click={() => handleItemClick(item.id)}
          >
            <span class="block truncate">{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
</style>