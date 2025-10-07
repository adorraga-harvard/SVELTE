<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let groupingCandidates: string[] = [];
  export let selectedCandidate: string | null = null;
  export let subQuery: string = '';

  let showDropdown = false;
  let isLoading = false;

  const dateOperations = [
    { key: 'AsIs', name: 'As Is', title: 'Displays the original date and time.' },
    { key: 'Day', name: 'Day', title: 'Groups data by day of the month (1-31).' },
    { key: 'DayOfWeek', name: 'Day of Week', title: 'Groups data by the day of the week (e.g., Sunday, Monday).' },
    { key: 'Hour', name: 'Hour', title: 'Groups data by the hour of the day (00-23).' },
    { key: 'DayNight', name: 'Day / Night', title: 'Groups data into two categories: Day (AM) and Night (PM).' },
    { key: 'Month', name: 'Month', title: 'Groups data by the month (e.g., Jan, Feb).' },
    { key: 'Quarter', name: 'Quarter', title: 'Groups data by the quarter of the year (Q1, Q2, etc.).' },
    { key: 'Year', name: 'Year', title: 'Groups data by the year.' }
  ];

  function cleanLabel(str: string) {
    if (!str) return '';
    const cleaned = toTitleCase(str).replace(/ Name$| Name_Ref$| Name_Ref_Ref$/g, '').trim();
    return cleaned;
  }

  function toTitleCase(str: string) {
    if (!str) return '';
    let cleanedStr = str.replace(/T\d+\."|"|\*/g, '');
    return cleanedStr.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  function isDateVariant(candidate: string) {
    return candidate.startsWith('*');
  }

  function getTemporalSql(candidate: string, operation: string): string {
    const baseColumn = candidate.replace(/\*|_(AsIs|Day|DayOfWeek|Hour|DayNight|Month|Quarter|Year)$/g, '');
    switch (operation) {
      case 'AsIs':
        return `"${baseColumn}"`;
      case 'Day':
        return `strftime('%d', "${baseColumn}")`;
      case 'DayOfWeek':
        return `CASE strftime('%w', "${baseColumn}")
          WHEN '0' THEN 'Sunday' WHEN '1' THEN 'Monday'
          WHEN '2' THEN 'Tuesday' WHEN '3' THEN 'Wednesday'
          WHEN '4' THEN 'Thursday' WHEN '5' THEN 'Friday'
          WHEN '6' THEN 'Saturday' END`;
      case 'Hour':
        return `strftime('%H', "${baseColumn}")`;
      case 'DayNight':
        return `CASE WHEN CAST(strftime('%H', "${baseColumn}") AS INTEGER) < 12 THEN 'Day' ELSE 'Night' END`;
      case 'Month':
        return `CASE strftime('%m', "${baseColumn}")
          WHEN '01' THEN 'Jan' WHEN '02' THEN 'Feb' WHEN '03' THEN 'Mar'
          WHEN '04' THEN 'Apr' WHEN '05' THEN 'May' WHEN '06' THEN 'Jun'
          WHEN '07' THEN 'Jul' WHEN '08' THEN 'Aug' WHEN '09' THEN 'Sep'
          WHEN '10' THEN 'Oct' WHEN '11' THEN 'Nov' WHEN '12' THEN 'Dec' END`;
      case 'Quarter':
        return `('Q' || ((CAST(strftime('%m', "${baseColumn}") AS INTEGER) - 1) / 3 + 1))`;
      case 'Year':
        return `strftime('%Y', "${baseColumn}")`;
      default:
        return `"${baseColumn}"`;
    }
  }

  async function handleButtonClick(candidate: string, operationKey: string | null = null) {
    showDropdown = false;
    let selectedCandidateKey = candidate;
    let newSqlResult = '';

    if (isDateVariant(candidate) && operationKey) {
      selectedCandidateKey = `${candidate}_${operationKey}`;
      newSqlResult = getTemporalSql(candidate, operationKey);
    } else {
      newSqlResult = `"${candidate}"`;
    }

    dispatch('select', { sqlResult: newSqlResult, candidate: selectedCandidateKey });
  }
</script>

<div class="flex items-center gap-2 relative w-72">
  <label for="analyze-button" class="text-sm font-medium text-base-content/70 whitespace-nowrap">
    Analyze By:
  </label>

  <button
    id="analyze-button"
    class="btn btn-sm btn-outline flex-grow justify-between text-left"
    on:click={() => showDropdown = !showDropdown}
    disabled={isLoading}
  >
    {#if isLoading}
      <span class="loading loading-spinner"></span>
    {:else}
      {selectedCandidate ? cleanLabel(selectedCandidate) : 'Select Dimension'}
    {/if}
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </button>

  {#if showDropdown}
    <div
      class="absolute right-0 w-full mt-1 top-full bg-base-100 border border-base-300 rounded shadow-2xl max-h-[70vh] overflow-y-auto z-50"
      on:mouseleave={() => showDropdown = false}
      transition:fade
    >
      <ul class="p-2 space-y-1" role="menu">
        {#each groupingCandidates as candidate}
          {#if isDateVariant(candidate)}
            <li class="font-bold text-base-content/80 p-1 border-b border-base-200" role="presentation">
              {cleanLabel(candidate)}
            </li>
            {#each dateOperations as operation}
              <li role="presentation">
                <button
                  class="pl-4 cursor-pointer hover:bg-base-200 rounded text-sm text-base-content/70 w-full text-left"
                  on:click={() => handleButtonClick(candidate, operation.key)}
                  role="menuitem"
                  tabindex="0"
                  title={operation.title}
                >
                  {operation.name}
                </button>
              </li>
            {/each}
          {:else}
            <li role="presentation">
              <button
                class="p-1 cursor-pointer hover:bg-primary hover:text-primary-content rounded font-medium text-sm w-full text-left"
                on:click={() => handleButtonClick(candidate)}
                role="menuitem"
                tabindex="0"
              >
                {cleanLabel(candidate)}
              </button>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
</div>