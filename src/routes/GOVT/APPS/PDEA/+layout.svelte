<script lang="ts">
	import { page } from '$app/stores';
	import { selectedApp } from '$govt/stores';
	import type { AppDefinition } from '$govt/types';
	// This generic import gets the list of modules for the current application.
	import { applications as modules } from './config';
	import Comp_Header from '$govt/lib/Components/Comp_Header.svelte';

	// The `data` prop is passed automatically from the +layout.server.ts file.
	// It is guaranteed to exist before this component renders.
	export let data;
	const { currentApp } = data;

	/**
	 * This function handles clicks from the header within this application.
	 * It updates the single global store to reflect the user's selection.
	 */
	function onHeaderSelect(event: CustomEvent<AppDefinition | null>) {
		const selectedItem = event.detail;

		if (selectedItem === null) {
			// A 'null' detail means "Home". In this context, Home is this application's dashboard.
			// We set the global store to this application's main definition object.
			selectedApp.set(currentApp);
		} else {
			// A specific module was selected.
			selectedApp.set(selectedItem);
		}
	}
</script>

<!-- The root div is now a flex container that will fill the available height. -->
<div class="flex flex-col h-full rounded-box bg-base-100 shadow-lg">
	<!-- 1. The Application Header -->
	<!-- The `sticky` class makes the header stick to the top of its scrolling container. -->
	<header class="sticky top-0 z-40 flex-shrink-0 border-b border-base-300 bg-base-100/80 backdrop-blur-sm">
		<Comp_Header items={modules} activeItem={$selectedApp} on:select={onHeaderSelect} showControls={false}>
		</Comp_Header>
	</header>

	<!-- 2. The Main Content Area -->
	<!-- `flex-grow` makes this div fill the remaining space. -->
	<!-- `overflow-y-auto` makes ONLY this div scrollable, which allows the header above it to be sticky. -->
	<div class="flex-grow overflow-y-auto">
		<slot />
	</div>
</div>

