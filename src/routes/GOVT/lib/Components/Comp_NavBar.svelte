<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AppDefinition } from '$govt/types';

	export let items: AppDefinition[] = [];
	export let activeItem: AppDefinition | null = null;

	const dispatch = createEventDispatcher();

	function handleSelect(item: AppDefinition | null) {
		// alert(item.id)
		dispatch('select', item);
	}
</script>

<nav class="w-full">
	<ul class="flex items-center space-x-1">
		<!-- 1. Dedicated Home Button -->
		<li class="group">
			<button
				type="button"
				on:click={() => handleSelect(null)}
				class="flex flex-col items-center justify-center gap-1 p-2 min-w-[80px] h-full transition-all duration-300 ease-in-out rounded-lg"
				class:text-primary={!activeItem}
				class:font-semibold={!activeItem}
				class:hover:bg-base-200={!!activeItem}
				title="Go to Home"
			>
				<i class="h-8 w-8 flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-8 h-8 anim-logo-hover-spin"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
				</i>
				<span class="text-xs text-center">Home</span>
			</button>
		</li>

		<!-- 2. Dynamic Application/Module Items -->
		{#each items as item}
			{@const isActive = activeItem?.id === item.id}
			<li class="group">
				<button
					type="button"
					on:click={() => handleSelect(item)}
					class="flex flex-col items-center justify-center gap-1 p-2 min-w-[80px] h-full transition-all duration-300 ease-in-out rounded-lg"
					class:text-primary={isActive}
					class:font-semibold={isActive}
					class:hover:bg-base-200={!isActive}
					title={item.name}
				>
					<i class="h-8 w-8 flex items-center justify-center">
						{#if item.icon}
							<span class="anim-logo-hover-spin">{@html item.icon}</span>
						{:else if item.id}
							<img
								src={`/img/${item.id}_LOGO.png`}
								alt={item.name}
								class="h-8 w-8 object-contain anim-logo-hover-spin"
								on:error={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
							/>
						{/if}
					</i>
					<span class="text-xs text-center">{item.id.replaceAll("_", "$")}</span>
				</button>
			</li>
		{/each}
	</ul>
</nav>

