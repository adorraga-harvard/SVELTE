<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AppDefinition } from '$govt/types';
	import Comp_NavBar from './Comp_NavBar.svelte';
	import Comp_ThemeChooser from './Comp_ThemeChooser.svelte';

	export let items: AppDefinition[] = [];
	export let activeItem: AppDefinition | null = null;
	// This prop now defaults to true and controls extra UI elements.
	export let showControls = true;

	const dispatch = createEventDispatcher();

	function handleSelect(event: CustomEvent<AppDefinition | null>) {
		dispatch('select', event.detail);
	}

	function handleThemeChange(event: CustomEvent<string>) {
		dispatch('themeChange', event.detail);
	}
</script>

<div class="navbar bg-base-100/80 backdrop-blur-sm shadow-md px-4">
	<div class="navbar-start">
		<!-- The title is now passed in via a named slot for flexibility -->
		<slot name="title">
			<!-- Default title content can go here if needed -->
		</slot>
	</div>

	<div class="navbar-center hidden lg:flex">
		<Comp_NavBar {items} {activeItem}
					 on:select={handleSelect}
		/>
	</div>

	<div class="navbar-end">
		{#if showControls}
			<Comp_ThemeChooser on:themeChange={handleThemeChange} />
			<!-- Other controls can be added here -->
		{/if}
	</div>
</div>
