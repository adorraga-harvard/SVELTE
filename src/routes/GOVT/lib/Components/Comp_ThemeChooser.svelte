<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// The list of themes remains the same
	const themes = [
		"light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
		"synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
		"forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
		"luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
		"night", "coffee", "winter", "dim", "nord", "sunset",
	];

	let selectedTheme = 'retro';

	let dropdownContainer;
	let dropdownDirection = 'dropdown-bottom';

	onMount(() => {
		const savedTheme = localStorage.getItem('daisyui-theme');
		if (savedTheme && themes.includes(savedTheme)) {
			selectedTheme = savedTheme;
		}

		if (dropdownContainer) {
			const rect = dropdownContainer.getBoundingClientRect();
			const isBottomHalf = rect.top > window.innerHeight / 2;

			if (isBottomHalf) {
				dropdownDirection = 'dropdown-top';
			}
		}
	});

	$: if (browser) {
		document.documentElement.setAttribute('data-theme', selectedTheme);
		localStorage.setItem('daisyui-theme', selectedTheme);
	}

    const formatThemeName = (theme) => theme.charAt(0).toUpperCase() + theme.slice(1);
</script>

<div bind:this={dropdownContainer} class="dropdown dropdown-end {dropdownDirection}">
	<!-- This trigger already has role="button", which is correct. -->
	<div tabindex="0" role="button" class="btn btn-ghost btn-sm gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l1.414-1.414M2.986 18.788a3.75 3.75 0 0 1 0-5.304l1.414-1.414m11.314 8.486a3.75 3.75 0 0 0 0-5.304l-1.414-1.414m1.414-1.414a3.75 3.75 0 0 0-5.304 0l-1.414 1.414m-4.242-4.242a3.75 3.75 0 0 0-5.304 0l-1.414 1.414" /></svg>
		<span class="text-sm">{formatThemeName(selectedTheme)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 ml-1 opacity-60"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
	</div>

	<!--
    *** THE FIX IS HERE ***
    - The `tabindex="0"` has been removed from this div.
    - This element is a container for the buttons and should not be a focusable stop itself.
  -->
	<div
		class="dropdown-content z-[1] p-3 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300"
	>
		<div class="grid grid-cols-2 gap-2">
			{#each themes as themeName}
				<button
					class="text-left text-sm p-2 rounded-lg transition-all duration-200"
					class:outline={selectedTheme === themeName}
					class:outline-primary={selectedTheme === themeName}
					class:outline-2={selectedTheme === themeName}
					on:click={() => {
						selectedTheme = themeName;
						if (document.activeElement instanceof HTMLElement) {
							document.activeElement.blur();
						}
					}}
					data-theme={themeName}
				>
					<div class="font-bold">{formatThemeName(themeName)}</div>
					<div class="flex gap-1 mt-1">
						<div class="bg-primary rounded w-4 h-2"></div>
						<div class="bg-secondary rounded w-4 h-2"></div>
						<div class="bg-accent rounded w-4 h-2"></div>
						<div class="bg-neutral rounded w-4 h-2"></div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
