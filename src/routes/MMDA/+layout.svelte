<script lang="ts">
  import './project_Scoped.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { UserCircle, User, LogOut, Paintbrush } from 'lucide-svelte';
  import * as icons from 'lucide-svelte';
  import { config } from './project_Config';
  import DebugOverlay from './DebugOverlay.svelte';

  const mainNavbarLinks = config || [];
  let currentTheme: string = '';
  const themes: string[] = [
    "light","dark","cupcake","bumblebee","emerald","corporate","synthwave",
    "retro","cyberpunk","valentine","halloween","garden","forest","aqua",
    "lofi","pastel","wireframe","luxury","dracula","cmyk","autumn",
    "business","acid","lemonade","night","coffee","winter"
  ];

  function handleThemeChange(theme: string) {
    if (browser) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      currentTheme = theme;
    }
  }

  let showDebug = false;
  let providerPath = '';
  let componentPromise: Promise<any> | null = null;
  let pageData: any = null;

  $: {
    pageData = $page?.data?.pageData || null;
    if (pageData?.end_point) {
      providerPath = pageData.end_point;
    } else {
      providerPath = '';
      componentPromise = null;
    }
  }

  onMount(() => {
    if (browser) {
      currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  });

  function isImgTag(iconString: string) {
    return iconString.trim().startsWith('<img');
  }
</script>

<div class="drawer min-h-screen flex flex-col">
  <input id="main-drawer" type="checkbox" class="drawer-toggle" />

  <!-- Main container: header + content + footer -->
  <div class="drawer-content flex flex-col flex-1 bg-base-200">
    <!-- HEADER -->
    <header class="sticky top-0 z-30 w-full shadow-lg bg-base-100/90 backdrop-blur">
      <div class="navbar px-4 md:px-6">
        <div class="navbar-start">
          <label for="main-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <a href="/MMDA"
            class="outline_me btn btn-ghost text-2xl font-extrabold md:text-2xl font-bold tracking-tight text-primary"
            style="text-shadow: 4px 2px 4px silver">
            Metro Manila Development Authority
          </a>
        </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">
            {#each mainNavbarLinks as link}
              <li>
                <a href={'/MMDA/' + link.fs_path}
                  class="btn btn-ghost group gap-2"
                  class:btn-active={$page.url.pathname.startsWith('/MMDA/' + link.fs_path)}>
                  {#if isImgTag(link.icon)}
                    <div class="h-7 w-7">{@html link.icon}</div>
                  {:else if icons[link.icon]}
                    <svelte:component this={icons[link.icon]} class="h-7 w-7 hover:animate-spin" strokeWidth={2.5} />
                  {/if}
                  <span class="font-bold">{link.navTitle}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div class="navbar-end">
          <!-- Theme Switcher -->
          <div title="Change Theme" class="dropdown dropdown-end">
            <button type="button" class="btn btn-ghost btn-circle group" aria-label="Change Theme">
              <Paintbrush class="h-6 w-6 stroke-current anim-logo-hover-spin" />
            </button>
            <ul class="dropdown-content bg-base-200 text-base-content rounded-box overflow-y-auto shadow-2xl theme-dropdown">
              <div class="grid grid-cols-1 gap-3 p-3">
                {#each themes as theme}
                  <button class="outline-base-content overflow-hidden rounded-lg text-left"
                    on:click={() => handleThemeChange(theme)}>
                    <div data-theme="{theme}" class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                      <div class="grid grid-cols-5 grid-rows-3">
                        <div class="col-span-5 row-span-3 flex items-center gap-2 px-4 py-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            viewBox="0 0 24 24" fill="currentColor"
                            class="{currentTheme === theme ? 'visible' : 'invisible'} h-3 w-3 shrink-0">
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                          </svg>
                          <div class="flex-grow text-sm">{theme}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            </ul>
          </div>

          <!-- User Menu -->
          <div class="dropdown dropdown-end">
            <button type="button" aria-label="User Profile" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full text-primary"><UserCircle class="w-10 h-10" /></div>
            </button>
            <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <li><button type="button" class="w-full justify-start"><User class="w-4 h-4" /> Profile</button></li>
              <li><button type="button" class="w-full justify-start"><LogOut class="w-4 h-4" /> Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT (fills remaining space) -->
    <main class="flex-1 flex flex-col p-4">
      <slot />
    </main>

    <!-- FOOTER (sticky) -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Trium-Veritas Solutions</p>
      </aside>
      <label class="swap swap-rotate">
        <input type="checkbox" bind:checked={showDebug} />
        <div class="swap-on">🟢 ON</div>
        <div class="swap-off">⚪ OFF</div>
      </label>
    </footer>
  </div>

  <!-- DRAWER SIDEBAR -->
  <div class="drawer-side">
    <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <li class="menu-title"><span>Services</span></li>
      {#each mainNavbarLinks as link}
        <li>
          <a href={'/MMDA/' + link.fs_path}>
            <svelte:component this={icons[link.icon]} class="h-6 w-6" /> {link.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>

<!-- Debug overlay floating -->
<DebugOverlay {providerPath} {componentPromise} {pageData} visible={showDebug} />
