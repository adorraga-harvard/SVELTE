<script lang="ts">
import type { PageData } from './$types';
import TreeNode from '../project_TreeNode.svelte';


import * as icons from 'lucide-svelte';
export let data: PageData;
$: sidebarTree = data.sidebarTree;
$: sidebarTitle = data.sidebarTitle;
$: breadcrumbs = data.breadcrumbs;
$: basePath = data.basePath;
</script>
<div class="container mx-auto flex flex-grow flex-col p-4 md:p-6 md:flex-row gap-8 w-full">
<aside class="w-full md:w-80 md:flex-shrink-0 self-stretch">
<div class="bg-gradient-to-b from-base-100 to-base-200/60 rounded-box shadow-xl p-4 sticky top-24 border border-base-300/50 h-full flex flex-col">
<h2 class="px-2 text-xl font-bold tracking-tight text-primary pb-2 mb-4 border-b border-base-300/50">{sidebarTitle}</h2>
<ul class="menu flex-grow overflow-y-auto">
{#each sidebarTree as node (basePath + '/' + node.fs_path)}
<TreeNode {node} {basePath} />
{/each}
</ul>
</div>
</aside>
<div class="flex-grow w-full flex flex-col min-w-0">
<div class="text-sm breadcrumbs mb-6">
<ul>
{#each breadcrumbs as crumb, i}
<li>
{#if i === breadcrumbs.length - 1}
<span class="btn btn-ghost btn-xs opacity-70 cursor-default gap-2">
{#if crumb.icon && icons[crumb.icon]}<svelte:component this={icons[crumb.icon]} class="h-5 w-5" />{/if}
{crumb.text}
</span>
{:else}
<a href={crumb.href} class="btn btn-ghost btn-xs group gap-2">
{#if crumb.icon && icons[crumb.icon]}<svelte:component this={icons[crumb.icon]} class="h-5 w-5" />{/if}
{crumb.text}
</a>
{/if}
</li>
{/each}
</ul>
</div>
<div class="flex-grow flex-1 w-full"><slot /></div>
</div>
</div>
