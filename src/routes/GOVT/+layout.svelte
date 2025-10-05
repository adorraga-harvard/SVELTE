<script lang="ts">
	import './app.css';
	import { selectedApp } from '$govt/stores';
	import Comp_Header from '$govt/lib/Components/Comp_Header.svelte';
	import { goto } from '$app/navigation';
	import type { AppDefinition } from '$govt/types';

	// The `applications` list is now passed as a `data` prop
	// from the +layout.server.ts file, ensuring it's always available.
	export let data;
	const { applications } = data;

	/**
	 * This function now handles both state and navigation for the main header.
	 */
	function onAppSelect(event: CustomEvent<AppDefinition | null>) {
		const app = event.detail;
		selectedApp.set(app);

		// This logic ensures consistent navigation.
		if (app) {
			// If a specific app is selected, navigate to its page.
			goto(`/GOVT/APPS/${app.id}`);
		} else {
			// If "Home" is selected (app is null), navigate to the main gateway page.
			goto('/GOVT');
		}
	}
</script>

<div id="portal-shell" class="flex flex-col h-screen bg-base-200">
	<header class="flex-shrink-0 z-50">
		<Comp_Header
			items={applications}
			activeItem={$selectedApp}
			on:select={onAppSelect}
			showControls={true}
		>
			<div slot="title" class="font-bold text-lg">GOVERNMENT GATEWAY</div>
		</Comp_Header>
	</header>

	<main class="flex-grow overflow-y-auto">
		<div class="container mx-auto p-4 md:p-6 h-full">
			<slot />
		</div>
	</main>

	<footer class="flex-shrink-0 bg-base-300 text-base-content">
		<div class="container mx-auto px-4 h-12 flex items-center justify-center">
			<p class="text-sm">
				&copy; {new Date().getFullYear()} Republic of the Philippines. All rights reserved.
			</p>
		</div>
	</footer>
</div>

