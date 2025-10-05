<script lang="ts">
    import Comp_Lookup from '$lib/Customized/Components/Comp_Lookup.svelte';
    import { fly } from 'svelte/transition';

    const lookupDefinitions = [
        { id: 'actor_types', name: 'Actor Types', tableName: 'lookup_actor_types', color: 'bg-indigo-600', description: 'Classifies the type of actors, such as individuals or groups.' },
        { id: 'asset_types', name: 'Asset Types', tableName: 'lookup_asset_types', color: 'bg-teal-600', description: 'Defines categories for critical infrastructure and locations.' },
        { id: 'regions', name: 'Regions', tableName: 'lookup_regions', color: 'bg-sky-600', description: 'Provides a standardized list of geographic regions in the Philippines.' },
        { id: 'threat_levels', name: 'Threat Levels', tableName: 'lookup_threat_levels', color: 'bg-red-600', description: 'Categorizes the severity of a threat, from low to critical.' },
        { id: 'classifications', name: 'Classifications', tableName: 'lookup_classifications', color: 'bg-purple-600', description: 'Determines the security classification level of an intelligence product.' },
        { id: 'plan_statuss', name: 'Plan Status', tableName: 'lookup_plan_statuss', color: 'bg-orange-600', description: 'Tracks the current status of an operational or collection plan.' },
        { id: 'sources', name: 'Sources', tableName: 'lookup_sources', color: 'bg-blue-600', description: 'Defines the origin of raw intelligence, e.g., HUMINT, OSINT.' },
        { id: 'requirements', name: 'Requirements', tableName: 'lookup_requirements', color: 'bg-green-600', description: 'Specifies the intelligence needs or priorities for an operation.' },
        { id: 'collection_methods', name: 'Collection Methods', tableName: 'lookup_collection_methods', color: 'bg-pink-600', description: 'Lists the different methods used for intelligence collection.' },
        { id: 'impact_levels', name: 'Impact Levels', tableName: 'lookup_impact_levels', color: 'bg-yellow-600', description: 'Measures the potential impact of an incident or event.' },
        { id: 'user_roles', name: 'User Roles', tableName: 'lookup_user_roles', color: 'bg-gray-600', description: 'Defines the roles and permissions for system users.' },
        { id: 'task_statuss', name: 'Task Status', tableName: 'lookup_task_statuss', color: 'bg-cyan-600', description: 'Tracks the status of an intelligence task.' }
    ];

    const lookupData = new Map();
    let toastMessage = '';
    let previousValues = new Map();

    function handleLookupChange(event: CustomEvent<{ tableName: string, value: string | number, name: string }>) {
        const { tableName, value, name } = event.detail;

        const prevData = previousValues.get(tableName) || { name: 'no value' };
        const definition = lookupDefinitions.find(d => d.tableName === tableName);

        if (value) {
            lookupData.set(tableName, { value, name });
            previousValues.set(tableName, { value, name });
        } else {
            lookupData.delete(tableName);
            previousValues.delete(tableName);
        }

        const description = definition.description;
        toastMessage = `Table: ${definition.name}\nDescription: ${description}\nFrom: ${prevData.name}\nTo: ${name || 'no value'}`;
    }

    $: if (toastMessage) {
        setTimeout(() => {
            toastMessage = '';
        }, 5000);
    }

    $: anyLookupSelected = lookupDefinitions.some(lookup => lookupData.has(lookup.tableName));
</script>

<div class="p-4 rounded-box shadow-xl bg-base-100">
    <h2 class="text-2xl font-bold text-base-content mb-3 border-b border-warning/50 pb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-warning" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10h16v4H4zM4 4h16v4H4zM4 16h16v4H4z"></path></svg>
        SENTINEL Lookups (Predicate Vocabulary)
    </h2>
    <p class="text-sm text-base-content/80 mb-4">
        The <b>Predicate Vocabulary</b> is the backbone of the SENTINEL system. It standardizes key terms and concepts, ensuring that all data entries are uniform and unambiguous. This prevents miscommunication and allows for <b>intelligent queries</b> that can cross-reference data seamlessly. By selecting a predicate from the lists below, you can see its corresponding unique ID and name. This is the exact process that allows for:
    </p>

    <ul class="list-disc list-inside space-y-1 text-sm text-base-content/90 mb-4">
        <li><b>Standardized Data Entry:</b> Data is entered consistently across all units and users.</li>
        <li><b>Intelligent Queries:</b> Users can build powerful searches like, "Show me all <b>Incidents</b> (subject) related to <b>Insurgent Activity</b> (predicate) in the past 30 days."</li>
        <li><b>Decision Making:</b> Commanders are presented with clear, actionable intelligence based on a shared understanding of terms.</li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {#each lookupDefinitions as lookup}
            <div class={`card shadow-md p-2 transition-colors duration-300 ${lookup.color}`}>
                <Comp_Lookup
                    tableName={lookup.tableName}
                    labelName={lookup.name}
                    on:change={(e) => handleLookupChange(e)}
                />
            </div>
        {/each}
    </div>

    {#if anyLookupSelected}
        <div class="mt-4" transition:fly={{ y: 20, duration: 300 }}>
            <h3 class="text-lg font-semibold mb-2 text-base-content">Live Data Output:</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {#each lookupDefinitions as lookup}
                    {#if lookupData.has(lookup.tableName)}
                        <div class="stat text-white p-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105" class:bg-neutral={!lookup.color} class:bg-red-500={lookup.color === 'bg-red-600'} class:bg-orange-500={lookup.color === 'bg-orange-600'} class:bg-yellow-500={lookup.color === 'bg-yellow-600'} class:bg-lime-500={lookup.color === 'bg-lime-600'} class:bg-green-500={lookup.color === 'bg-green-600'} class:bg-emerald-500={lookup.color === 'bg-emerald-600'} class:bg-teal-500={lookup.color === 'bg-teal-600'} class:bg-cyan-500={lookup.color === 'bg-cyan-600'} class:bg-sky-500={lookup.color === 'bg-sky-600'} class:bg-blue-500={lookup.color === 'bg-blue-600'} class:bg-indigo-500={lookup.color === 'bg-indigo-600'} class:bg-violet-500={lookup.color === 'bg-violet-600'} class:bg-purple-500={lookup.color === 'bg-purple-600'} class:bg-fuchsia-500={lookup.color === 'bg-fuchsia-600'} class:bg-pink-500={lookup.color === 'bg-pink-600'} class:bg-rose-500={lookup.color === 'bg-rose-600'} class:bg-stone-500={lookup.color === 'bg-stone-600'} class:bg-gray-500={lookup.color === 'bg-gray-600'}>
                            <div class="stat-title text-white/80">{lookup.name}</div>
                            <div class="stat-value text-lg truncate">{lookupData.get(lookup.tableName).value || 'N/A'}</div>
                            <div class="stat-desc text-white/80">{lookupData.get(lookup.tableName).name || 'N/A'}</div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

    {#if toastMessage}
        <div class="toast toast-end z-50">
            <div class="alert alert-info">
                <pre>{toastMessage}</pre>
            </div>
        </div>
    {/if}
</div>