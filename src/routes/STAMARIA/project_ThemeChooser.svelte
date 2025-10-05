<!--
  This component provides a dropdown menu for users to select a DaisyUI theme.
  It has been refactored to group themes into Light and Dark categories for
  an improved user experience.
-->
<script lang="ts">
	import { Paintbrush } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let currentTheme: string = '';

	function handleThemeChange(theme: string) {
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
			currentTheme = theme;
		}
	}

	// The themes are now categorized for better organization in the UI.
	const themeCategories = [
		{
			name: 'Light Themes',
			themes: [
				'light',
				'cupcake',
				'bumblebee',
				'emerald',
				'corporate',
				'lofi',
				'pastel',
				'wireframe',
				'cmyk',
				'autumn',
				'acid',
				'lemonade',
				'garden',
				'winter',
				'valentine',
				'retro'
			]
		},
		{
			name: 'Dark Themes',
			themes: [
				'dark',
				'synthwave',
				'cyberpunk',
				'halloween',
				'forest',
				'aqua',
				'luxury',
				'dracula',
				'night',
				'coffee',
				'business'
			]
		}
	];

	onMount(() => {
		if (browser) {
			currentTheme = localStorage.getItem('theme') || 'light';
			handleThemeChange(currentTheme);
		}
	});
</script>

<div title="Change Theme" class="dropdown dropdown-end">
	<button type="button" class="btn btn-ghost btn-circle group" aria-label="Change Theme">
		<Paintbrush class="h-5 w-5 stroke-current anim-logo-hover-spin" />
	</button>
	<ul class="dropdown-content bg-base-200 text-base-content rounded-box overflow-y-auto shadow-2xl theme-dropdown">
		<div class="p-3 space-y-4">
			<!-- The outer loop creates the categories -->
			{#each themeCategories as category}
				<div>
					<h3 class="text-sm font-bold tracking-wider uppercase text-base-content/60 mb-2 px-1">
						{category.name}
					</h3>
					<!-- The inner loop creates the 4-column grid for themes -->
					<div class="grid grid-cols-4 gap-2">
						{#each category.themes as theme}
							<button
								class="outline-base-content overflow-hidden rounded-lg text-left border-2 {currentTheme ===
								theme
									? 'border-primary'
									: 'border-transparent'}"
								on:click={() => handleThemeChange(theme)}
							>
								<div
									data-theme={theme}
									class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
								>
									<div class="p-3">
										<div class="flex justify-between items-center">
											<span class="font-bold capitalize text-sm">{theme}</span>
											{#if currentTheme === theme}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24"
													fill="currentColor"
													class="h-4 w-4 shrink-0 text-primary"
												>
													<path
														d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
													/>
												</svg>
											{/if}
										</div>
										<div class="flex gap-1 mt-2">
											<div class="bg-primary w-full h-2 rounded" title="Primary Color"></div>
											<div class="bg-secondary w-full h-2 rounded" title="Secondary Color"></div>
											<div class="bg-accent w-full h-2 rounded" title="Accent Color"></div>
											<div class="bg-neutral w-full h-2 rounded" title="Neutral Color"></div>
										</div>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</ul>
</div>

<style>
	.theme-dropdown {
		margin-top: 0.5rem;
		width: 28rem; /* Adjusted for 4 columns */
		max-height: calc(100vh - 8rem);
	}
</style>

