<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  let {
    id = '',
    label = '',
    placeholder = '',
    items = [],
    selectedValue = null,
    inputValue = '', // This will be bound externally
    disabled = false,
    loading = false,
    debounceTime = 300,
    showClearButton = false, // Controls if clear button is shown
  } = $props<{
    id?: string;
    label?: string;
    placeholder?: string;
    items?: Array<{ code: string; name: string }>;
    selectedValue?: { code: string; name: string } | null;
    inputValue?: string;
    disabled?: boolean;
    loading?: boolean;
    debounceTime?: number;
    showClearButton?: boolean;
  }>();

  let showDropdown = $state(false);
  let highlightedIndex = $state(-1);
  let inputElement: HTMLInputElement;
  let searchTimeout: ReturnType<typeof setTimeout>;

  const filteredItems = $derived(
    items.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  $effect(() => {
    if (showDropdown && filteredItems.length > 0) {
      const currentIndex = selectedValue ? filteredItems.findIndex(item => item.code === selectedValue?.code) : -1;
      highlightedIndex = currentIndex !== -1 ? currentIndex : 0;
    } else {
      highlightedIndex = -1;
    }
  });

  $effect(() => {
    if (selectedValue && inputValue !== selectedValue.name) {
      inputValue = selectedValue.name;
    }
  });

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    inputValue = target.value;
    showDropdown = true;
    highlightedIndex = -1;

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      dispatch('input', inputValue);
    }, debounceTime);
  }

  function handleFocus() {
    showDropdown = true;
    if (!inputValue && !items.length) {
       dispatch('input', '');
    }
  }

  function handleBlur(event: FocusEvent) {
    if (event.relatedTarget && (event.relatedTarget as HTMLElement).closest('.combobox-dropdown')) {
      return;
    }
    setTimeout(() => {
      showDropdown = false;
      if (selectedValue && inputValue !== selectedValue.name) {
          inputValue = selectedValue.name;
      }
    }, 100);
  }

  function selectItem(item: { code: string; name: string }) {
    selectedValue = item;
    inputValue = item.name;
    showDropdown = false;
    dispatch('select', selectedValue);
    inputElement.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (filteredItems.length === 0 && event.key !== 'Escape' && event.key !== 'Enter') return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        showDropdown = true;
        highlightedIndex = (highlightedIndex + 1) % filteredItems.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        showDropdown = true;
        highlightedIndex = (highlightedIndex - 1 + filteredItems.length) % filteredItems.length;
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex !== -1 && filteredItems[highlightedIndex]) {
          selectItem(filteredItems[highlightedIndex]);
        } else if (filteredItems.length === 1 && inputValue.toLowerCase() === filteredItems[0].name.toLowerCase()) {
          selectItem(filteredItems[0]);
        } else if (inputValue && !selectedValue) {
          dispatch('input', inputValue);
          showDropdown = false;
          inputElement.blur();
        }
        break;
      case 'Escape':
        event.preventDefault();
        showDropdown = false;
        inputElement.blur();
        break;
      case 'Tab':
        if (showDropdown && highlightedIndex !== -1) {
          selectItem(filteredItems[highlightedIndex]);
        }
        showDropdown = false;
        break;
    }
  }

  $effect(() => {
    if (showDropdown && inputValue) {
        if (filteredItems.length === 0) {
            highlightedIndex = -1;
        } else if (highlightedIndex === -1 || highlightedIndex >= filteredItems.length) {
            highlightedIndex = 0;
        }
    }
  });


  $effect(() => {
    if (showDropdown && highlightedIndex !== -1) {
      requestAnimationFrame(() => {
        const itemElement = document.querySelector(`#${id}-item-${highlightedIndex}`) as HTMLElement;
        if (itemElement) {
          itemElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }
  });

  onMount(() => {
    if (selectedValue) {
      inputValue = selectedValue.name;
    }
  });

  function clearInputAndSelection() {
    inputValue = '';
    selectedValue = null;
    showDropdown = false;
    highlightedIndex = -1;
    dispatch('clear');
    inputElement.focus();
  }
</script>

<div class="combobox-container {disabled ? 'opacity-50 pointer-events-none' : ''}" aria-expanded={showDropdown}>
  <label for="{id}" class="block text-sm font-semibold text-gray-700 mb-1 dark:text-gray-200">
    {label}
  </label>
  <div class="relative w-full">
    <input
      type="text"
      {id}
      class="combobox-input block w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg shadow-sm
             focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out
             dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400
             {showClearButton && inputValue && !loading ? 'pr-9' : ''}"
      bind:this={inputElement}
      bind:value={inputValue}
      {placeholder}
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
      onkeydown={handleKeyDown}
      autocomplete="off"
      aria-autocomplete="list"
      aria-controls="{id}-listbox"
      aria-activedescendant="{highlightedIndex !== -1 ? `${id}-item-${highlightedIndex}` : ''}"
      {disabled}
    />

    {#if loading}
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {:else if showClearButton && inputValue}
      <button
        type="button"
        onclick={e => { e.stopPropagation(); clearInputAndSelection(); }} class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
        aria-label="Clear input"
        title="Clear input"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>

  {#if showDropdown && filteredItems.length > 0}
    <ul
      id="{id}-listbox"
      role="listbox"
      class="combobox-dropdown absolute z-20 mt-1 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-auto
             ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
      transition:fly="{{ y: -10, duration: 150, easing: cubicOut }}"
    >
      {#each filteredItems as item, index (item.code)}
        <li
          id="{id}-item-{index}"
          role="option"
          aria-selected={highlightedIndex === index}
          class="px-4 py-2 cursor-pointer transition-colors duration-150 ease-in-out
                 {highlightedIndex === index
                   ? 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100'
                   : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}"
          onmousedown={() => selectItem(item)}
          onmousemove={() => highlightedIndex = index}
        >
          <span class="block truncate">{item.name}</span>
        </li>
      {/each}
    </ul>
  {:else if showDropdown && inputValue && !loading && filteredItems.length === 0}
    <div
      class="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-xl px-4 py-3 text-gray-500 text-sm text-center
             dark:bg-gray-800 dark:text-gray-400"
      transition:fly="{{ y: -10, duration: 150, easing: cubicOut }}"
    >
      No results found for "<span class="font-semibold text-gray-700 dark:text-gray-300">{inputValue}</span>"
    </div>
  {/if}
</div>

<style>
  .combobox-container {
    margin-bottom: 1.5rem;
  }
  .combobox-input.pr-9 {
    padding-right: 2.25rem; /* 3 * 0.75rem = 2.25rem */
  }
</style>