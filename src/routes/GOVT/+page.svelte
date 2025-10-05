<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedApp } from '$govt/stores';
	import Comp_Slot from '$govt/lib/Components/Comp_Slot.svelte';
	import type { AppDefinition } from '$govt/types';

	// The `data` prop is passed automatically from the root +layout.server.ts file.
	// It contains the global list of all applications.
	export let data;
	const { applications } = data;

	/**
	 * This function handles when a user clicks an application card in the Comp_Slot.
	 * It updates the global store and, crucially, tells SvelteKit's router
	 * to navigate to the correct application page.
	 */
	function handleSelectApp(event: CustomEvent<AppDefinition>) {
		const app = event.detail;
		selectedApp.set(app);

		// This is the key line that was likely missing.
		// It performs the client-side navigation to the new URL.
		goto(`/GOVT/APPS/${app.id}`);
	}
</script>

<!--
  This is the content for the main gateway's home screen.
  It renders the Comp_Slot component to display the grid of applications.
-->
<Comp_Slot
	app_title="Your Digital Gateway to Public Service"
	{applications}
	on:selectApp={handleSelectApp}
/>

