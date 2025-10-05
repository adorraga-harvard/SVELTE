<script lang="ts">
  import { page } from '$app/stores';

  export let navItems: { href: string; label: string }[] = [];
  export let isMobile = false;

  /**
   * A more robust helper function to determine the active link.
   * - The Dashboard (main page) is handled by the logo link in the layout.
   * - Module links are active if the URL starts with their path.
   */
  function isActive(href: string): boolean {
    return $page.url.pathname.startsWith(href);
  }
</script>

<!--
  This is a completely redesigned Navbar component.
  - The critical syntax error has been fixed.
  - It features a new "world-class" pill design that is clean,
    professional, and fully responsive.
-->
<ul
  class:flex={!isMobile}
  class:items-center={!isMobile}
  class:space-x-2={!isMobile}
  class:space-y-1={isMobile}
>
  {#each navItems as item}
    {@const active = isActive(item.href)}
    <li>
      <a
        href={item.href}
        class="block whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 {active ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}"
        aria-current={active ? 'page' : undefined}
      >
        {item.label}
      </a>
    </li>
  {/each}
</ul>
