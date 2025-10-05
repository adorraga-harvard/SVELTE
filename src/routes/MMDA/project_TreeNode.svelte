
<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import * as icons from 'lucide-svelte';
    // This now correctly points to the master project_Config file
	import type { Route } from './project_Config';

	export let node: Route;
	export let basePath: string;
	export let level = 0;

	const isParent = node.children && node.children.length > 0;
	const fullPath = basePath + '/' + node.fs_path;

	$: isActive = $page.url.pathname === fullPath;
	$: isActiveTrail = $page.url.pathname.startsWith(fullPath) && !isActive;
	$: isOpen = $page.url.pathname.startsWith(fullPath);

    function isImgTag(iconString: string) { return iconString.trim().startsWith('<img'); }
</script>

<li class="my-1">
	<a
        href={fullPath}
        class="flex items-center p-2 rounded-lg transition-colors duration-200 {isActiveTrail ? 'bg-primary/20 text-primary' : ''} {isActive ? 'bg-primary text-primary-content font-bold' : 'hover:bg-base-300'}"
        style:padding-left="{1 + (isParent ? 0 : 1.5) * level}rem"
    >
        {#if isImgTag(node.icon)}
            <div class="h-6 w-6 mr-3 flex-shrink-0">{@html node.icon}</div>
        {:else if icons[node.icon]}
            <svelte:component this={icons[node.icon]} class="h-6 w-6 mr-3 flex-shrink-0" />
        {/if}

        <span class="flex-grow font-bold tracking-wide">{node.title}</span>

        {#if isParent}
            <icons.ChevronRight class="h-5 w-5 transition-transform duration-300 {isOpen ? 'rotate-90' : ''}"/>
        {/if}
	</a>
    {#if isParent && isOpen}
        <ul class="pl-4 border-l-2 border-base-300" transition:slide={{ duration: 300 }}>
            {#each node.children as childNode}
                <svelte:self node={childNode} basePath={fullPath} level={level + 1} />
            {/each}
        </ul>
    {/if}
</li>
