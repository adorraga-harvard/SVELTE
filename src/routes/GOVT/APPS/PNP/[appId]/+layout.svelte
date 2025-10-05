<script lang="ts">
	import { selectedApp } from '$govt/stores';
	import type { AppDefinition } from '$govt/types';
	import Comp_Header from '$govt/lib/Components/Comp_Header.svelte';

	export let data;
	const { currentApp, modules } = data;
	function onHeaderSelect(event: CustomEvent<AppDefinition | null>) {
		const selectedItem = event.detail;

		if (selectedItem === null) {
			// A 'null' detail means "Home". In this context, Home is this application's dashboard.
			// We set the global store to this application's main definition object.
			selectedApp.set(currentApp);
		} else {
			selectedApp.set(selectedItem);
		}
	}
</script>

<div class="flex flex-col h-full rounded-box bg-base-100 shadow-lg">
	<header class="flex-shrink-0 border-b border-base-300">
		<Comp_Header
			items={modules}
			activeItem={$selectedApp}
			on:select={onHeaderSelect}
			showControls={false}
		>
			<div slot="title" class="flex items-center gap-3">
				{#if currentApp?.icon}
					<div class="h-8 w-8">{@html currentApp.icon}</div>
				{:else if currentApp?.id}
					<img
						src={`/img/${currentApp.id}_LOGO.png`}
						alt="{currentApp.name ?? 'App'} Logo"
						class="h-8 w-8 object-contain"
					/>
				{/if}
     		<span class="text-green-500 font-extrabold text-xl">{currentApp?.id ?? 'Application'}</span>
			</div>
		</Comp_Header>
	</header>
	<div class="flex-grow">
		<slot />
	</div>
</div>

