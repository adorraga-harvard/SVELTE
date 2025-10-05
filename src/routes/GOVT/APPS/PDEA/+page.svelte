<script lang="ts">
	// Svelte and Store imports
	import { onMount } from 'svelte'; // Correctly imported from 'svelte'
	import { writable } from 'svelte/store';
	import { selectedApp } from '$govt/stores';
	import { page } from '$app/stores';

	// Component, Type, and local Config imports
	import Comp_Slot from '$govt/lib/Components/Comp_Slot.svelte';
	import type { AppDefinition } from '$govt/types';
	import { applications as modules } from './config';

	// Reactive variable to hold this application's details.
	// It's sourced from the parent layout's `load` function via the `$page` store.
	$: thisApp = $page.data.currentApp;

	// This `onMount` block solves the state synchronization issue.
	onMount(() => {
		const isAnInternalModule = modules.some((m) => m.id === $selectedApp?.id);
		if (!isAnInternalModule) {
			selectedApp.set(thisApp);
		}
	});

	// Local state for managing the view and dynamic component loading
	let LoadedModuleComponent: any = null;
	const isLoading = writable(false);
	let isShowingModuleDashboard = true;
	let selectedModuleId: string | null = null;

	// ---- Core Logic: This block determines what to show based on the global store's state ----
	$: {
		const isAnInternalModule = modules.some((m) => m.id === $selectedApp?.id);

		if (isAnInternalModule) {
			isShowingModuleDashboard = false;
			selectedModuleId = $selectedApp!.id;
		} else {
			isShowingModuleDashboard = true;
			selectedModuleId = null;
		}
	}

	// ---- Dynamic Module Loading ----
	const moduleGlobs: Record<string, () => Promise<any>> = import.meta.glob('./MODULES/*/+page.svelte');

	async function loadModuleComponent(moduleId: string) {
		isLoading.set(true);
		const key = `./MODULES/${moduleId}/+page.svelte`;
		const loader = moduleGlobs[key];
		try {
			if (!loader) throw new Error(`Module component file not found for ID: ${moduleId}`);
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
	$: if (selectedModuleId) {
		loadModuleComponent(selectedModuleId);
	} else {
		LoadedModuleComponent = null;
	}

	// ---- Event Handler ----
	function handleModuleSelect(event: CustomEvent<AppDefinition>) {
		selectedApp.set(event.detail);
	}
</script>

<!-- The template no longer needs an `{#if thisApp}` block because `thisApp` is guaranteed to exist. -->
<main class="flex-grow overflow-hidden flex flex-col p-4">
	{#if isShowingModuleDashboard}
		<!-- Default View: Shows this application's welcome screen and module selection grid -->
		<div class="flex-grow flex flex-col">
			<div class="text-center mb-8 anim-fade-in-up-scale">
				<b class="text-2xl font-bold tracking-tight text-base-content sm:text-4xl"
				style="text-shadow: 2px 2px 10px  ;">
					{thisApp?.name}
				</b>
				{#if thisApp?.description}
					<p class="mt-6 text-lg leading-8 text-base-content/70 max-w-2xl mx-auto">
						{thisApp.description}
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

