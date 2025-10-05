<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AppDefinition } from '$govt/types';
	export let app_title: string | undefined = undefined;
	export let applications: AppDefinition[] = [];
	const dispatch = createEventDispatcher();
	function handleSelect(app: AppDefinition) {
		// Dispatch a custom event with the selected app as the payload
		dispatch('selectApp', app);
	}
</script>

<section class="min-h-full anim-fade-in-up-scale pt-2">
	<div class="w-full max-w-6xl mx-auto bg-base-50 rounded-2xl shadow-lg p-2 md:p-10">
		{#if app_title}
			<h1
				class="text-2xl md:text-5xl my-4 font-bold text-primary text-center"
				style="text-shadow: 4px 4px 5px gray"
			>
				{app_title}
			</h1>
		{/if}
		<div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each applications as app}
				<!--
          Refactored from <button> to <div> for better semantics inside a card.
          Added role, tabindex, and keydown for accessibility.
        -->
				<div
					role="button"
					tabindex="0"
					on:click={() => handleSelect(app)}
					on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect(app)}
					class="card group h-full cursor-pointer bg-base-100 shadow-md hover:shadow-xl ring-1 ring-base-300/50 hover:ring-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
				>
					<figure class="px-4 pt-2 h-20 flex items-center justify-center">
						<!-- CORRECTED: Prioritize the SVG icon if it exists -->
						{#if app.icon}
							<!-- This container now centers the SVG, fixing the animation pivot point. -->
							<div
								class="h-16 w-16 text-primary anim-logo-hover-spin flex items-center justify-center"
							>
								{@html app.icon}
							</div>
						{:else}
							<!-- Fallback to the logo image -->
							<img
								src={`/img/${app.id}_LOGO.png`}
								alt="{app.name} Logo"
								class="h-16 w-16 object-contain anim-logo-hover-spin"
								on:error={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
							/>
						{/if}
					</figure>
					<div class="card-body items-center text-center px-4 pt-2 pb-4">
						<h2 class="card-title text-lg font-extrabold">{app.name}</h2>
						{#if app.description}
							<p class="text-sm text-base-content/70 mt-1">{app.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

