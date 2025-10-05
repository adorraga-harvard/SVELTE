<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    // Props definition
    export let tableName: string;
    export let labelName: string;
    export let bindValue: string | number | undefined = undefined;

    // --- State and Data ---
    interface LookupItem {
        id: string | number;
        name: string;
        description: string;
    }

    let data: LookupItem[] = [];
    let loading = true;
    let error: string | null = null;
    let componentId = `lookup_${tableName}-${Math.random().toString(36).substring(2, 9)}`;

    const dispatch = createEventDispatcher();

    // --- Functions ---
    async function fetchData() {
        loading = true;
        error = null;
        try {
            const fetchUrl = `/sentinel?tableName=${tableName}`;
            console.clear();
            console.log(`[Comp_Lookup: ${tableName}] Fetching data from ${fetchUrl}`);
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data: HTTP status ${response.status}`);
            }

            const jsonResponse = await response.json();

            if (jsonResponse.status === 200 && Array.isArray(jsonResponse.data)) {
                data = jsonResponse.data;
            } else {
                throw new Error("Invalid data format received from server. Check server console for transformation errors.");
            }

        } catch (e: any) {
            console.error(`[Comp_Lookup: ${tableName}] Fetch Error:`, e);
            error = e.message;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchData();
    });

    function handleSelectionChange() {
        const selectedItem = data.find(item => item.id?.toString() === bindValue?.toString());

        dispatch('change', {
            tableName: tableName,
            value: bindValue,
            name: selectedItem?.name
        });
    }

</script>

<div class="py-2 {$$props.class}">

    {#if loading}
        <div class="flex items-center space-x-2">
            <span class="loading loading-spinner loading-sm text-primary"></span>
            <span class="text-sm text-base-content/70">Loading {labelName} data...</span>
        </div>
    {:else if error}
        <div role="alert" class="alert alert-error text-sm py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Data Error: Cannot load {labelName}. {error}</span>
        </div>
    {:else}
        <label for={componentId} class="block text-sm font-medium text-white mb-1">{labelName}</label>
        <select
            id={componentId}
            class="select select-bordered w-full text-blue-600 bg-violet-200"
            bind:value={bindValue}
            on:change={handleSelectionChange}
            required
        >
            <option value="" disabled selected></option>
            {#each data as item (item.id)}
                <option value={item.id} title={item.description}>
                    {item.name}
                </option>
            {/each}
        </select>
    {/if}
</div>