<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import * as icons from 'lucide-svelte';

  // --- TYPE DEFINITION ---
  interface NavNode {
    slug: string;
    navTitle: string;
    icon?: string | null;
    children?: NavNode[];
  }

  // --- PROPS ---
  export let node: NavNode;
  export let level = 0;
  export let variant: 'default' | 'compact' | 'minimal' | 'lines' = 'default';
  export let startOpen = false;
  export let targetPath: string; // <-- new prop from YAML

  // --- PATH LOGIC ---
  $: hrefForThisNode = `/${targetPath}/${node.slug}`;
  $: isParent = node.children && node.children.length > 0;

  $: isActive = $page.url.pathname === hrefForThisNode;
  $: isActiveTrail = $page.url.pathname.startsWith(hrefForThisNode) && !isActive;
  $: isOpen = startOpen || $page.url.pathname.startsWith(hrefForThisNode);

  // --- STYLING LOGIC ---
  let paddingClasses = '';
  let stateClasses = '';
  let iconSizeClasses = '';
  let ulClasses = '';

  $: {
    switch (variant) {
      case 'compact':
        paddingClasses = 'py-1 px-2';
        break;
      case 'lines':
        paddingClasses = 'py-2 pl-3';
        break;
      default:
        paddingClasses = 'p-2';
        break;
    }
    const classes = [];
    if (isActiveTrail) {
      if (variant !== 'lines') classes.push('bg-primary/20');
      classes.push('text-primary');
    }
    if (isActive) {
      classes.push('bg-primary', 'text-primary-content', 'font-bold');
    } else {
      classes.push('hover:bg-base-300');
    }
    stateClasses = classes.join(' ');
    iconSizeClasses = variant === 'compact' ? 'h-4 w-4' : 'h-5 w-5';
    ulClasses = variant !== 'lines' ? 'pl-4 border-l-2 border-primary/20' : '';
  }

  function isImageFile(iconString: string | undefined | null): boolean {
    if (!iconString) return false;
    return /\.(jpg|jpeg|png|svg|webp)$/i.test(iconString);
  }
</script>

<li class:tree-lines={variant === 'lines'}>
  <a
    href={hrefForThisNode}
    class="flex items-center rounded-lg transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary {paddingClasses} {stateClasses}"
    style:padding-left="{variant !== 'lines' ? 1 + (isParent ? 0 : 1.5) * level : null}rem"
  >
    {#if node.icon && variant !== 'minimal'}
      <div
        class:mr-3={variant === 'default'}
        class:mr-2={variant !== 'default'}
        class="relative z-10 flex-shrink-0 bg-base-100"
      >
        {#if isImageFile(node.icon)}
          <img src={`/images/${node.icon}`} alt={node.navTitle} class="transition-transform group-hover:animate-spin {iconSizeClasses}" />
        {:else if icons[node.icon]}
          <svelte:component this={icons[node.icon]} class="transition-transform group-hover:animate-spin {iconSizeClasses}" />
        {:else}
          <icons.HelpCircle class="text-base-content/30 {iconSizeClasses}" />
        {/if}
      </div>
    {/if}

    <span class="flex-grow tracking-wide" class:font-medium={variant !== 'compact'} class:text-sm={variant === 'compact'}>
      {node.navTitle}
    </span>

    {#if isParent}
      <icons.ChevronRight class="flex-shrink-0 w-5 h-5 transition-transform duration-300 {isOpen ? 'rotate-90' : ''}" />
    {/if}
  </a>

  {#if isParent && isOpen}
    <ul class="transition-all {ulClasses}" transition:slide={{ duration: 250 }}>
      {#each node.children as childNode}
        <svelte:self node={childNode} level={level + 1} {variant} {startOpen} {targetPath} />
      {/each}
    </ul>
  {/if}
</li>
