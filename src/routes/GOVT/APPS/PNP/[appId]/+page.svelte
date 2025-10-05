<script lang="ts">
	// Svelte and Store imports
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte'; // Corrected: onMount comes from 'svelte'
	import { selectedApp } from '$govt/stores';
	import { page } from '$app/stores';

	// Component, Type, and local Config imports
	import Comp_Slot from '$govt/lib/Components/Comp_Slot.svelte';
	import type { AppDefinition } from '$govt/types';

	// The `data` prop is passed from all parent layouts via the `$page` store.
	// This is guaranteed to be available and removes any race conditions.
	$: ({ currentApp, modules } = $page.data);

	// This `onMount` block solves the state synchronization issue.
	// It runs once when the component lookups loads, ensuring the global store
	// is correctly initialized with this application's data.
	onMount(() => {
		const isAnInternalModule = modules.some((m: AppDefinition) => m.id === $selectedApp?.id);
		if (!isAnInternalModule) {
			selectedApp.set(currentApp);
		}
	});

	// Local state for managing the view and dynamic component loading
	let LoadedModuleComponent: any = null;
	const isLoading = writable(false);
	let isShowingModuleDashboard = true;
	let selectedModuleId: string | null = null;

	// ---- Core Logic: This block determines what to show based on the global store's state ----
	$: {
		const isAnInternalModule = modules.some((m: AppDefinition) => m.id === $selectedApp?.id);

		if (isAnInternalModule) {
			isShowingModuleDashboard = false;
			selectedModuleId = $selectedApp!.id;
		} else {
			isShowingModuleDashboard = true;
			selectedModuleId = null;
		}
	}

	// ---- Dynamic Module Loading ----
	// Using Vite's glob import for robust dynamic imports. The path is relative to the app folder.
	const moduleGlobs = import.meta.glob('../**/MODULES/*/+page.svelte');

	async function loadModuleComponent(appId: string, moduleId: string) {
		isLoading.set(true);
		// Construct the key to find the correct module in the glob import
		const key = `../${appId}/MODULES/${moduleId}/+page.svelte`;
		const loader = moduleGlobs[key];
		try {
			if (!loader) throw new Error(`Module component file not found for: ${key}`);
			const mod = await loader();
			LoadedModuleComponent = mod.default ?? null;
		} catch (err) {
			console.error(`Failed to load module component: ${moduleId}`, err);
			LoadedModuleComponent = null;
		} finally {
			isLoading.set(false);
		}
	}

	// Reactive statement that triggers the loading function
	$: if (selectedModuleId && currentApp) {
		loadModuleComponent(currentApp.id, selectedModuleId);
	} else {
		LoadedModuleComponent = null;
	}

	// ---- Event Handler ----
	function handleModuleSelect(event: CustomEvent<AppDefinition>) {
		selectedApp.set(event.detail);
	}
</script>

<!-- The template no longer needs an `{#if}` block because `currentApp` is guaranteed to exist. -->
<main class="flex-grow overflow-hidden flex flex-col p-4">
	{#if isShowingModuleDashboard}
		<!-- Default View: Shows this application's welcome screen and module selection grid -->
		<div class="flex-grow flex flex-col">
			<div class="text-center mb-8 anim-fade-in-up-scale">
				<h1 class="text-4xl font-bold tracking-tight text-base-content sm:text-4xl"
				style="text-shadow: 4px 4px 10px darkgoldenrod">
					{currentApp?.name}
				</h1>
				{#if currentApp?.description}
					<p	class="mt-6 text-lg leading-8 text-base-content/70 max-w-2xl mx-auto"					>
						{currentApp.description}
					</p>
				{/if}
			</div>

			<Comp_Slot applications={modules} on:selectApp={handleModuleSelect} />
		</div>
	{:else}
		<!-- Module Detail View: Shows the dynamically loaded module component -->
		<div class="anim-fade-in h-full w-full overflow-auto">
			{#if $isLoading}
				<div class="flex justify-center items-center py-12">
					<span class="loading loading-spinner loading-lg text-primary"></span>
				</div>
			{:else if LoadedModuleComponent}
				<svelte:component this={LoadedModuleComponent} />
			{:else}
				<div class="p-8 text-center text-sm text-base-content/60">
					<p>Module could not be loaded. Please try again later.</p>
				</div>
			{/if}
		</div>
	{/if}
</main>

