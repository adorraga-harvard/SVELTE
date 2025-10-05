<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  // Import our generic Modal component
  import Modal from '$lib/Components/Comp_Modal.svelte';
  // Import the new Login form component
  import Login from '$lib/Components/Comp_Login.svelte';

  interface NavItem {
    href: string;
    label: string;
  }
  
  export let navItems: NavItem[];
  export let moduleTitle: string;
  export let collapsedTitle: string;

  let username: string | null = null;
  let showLoginModal = false;
  // Initially expanded to give user a better view on lookups load
  let isExpanded = true;
  let timeoutId: NodeJS.Timeout | null = null;

  // Reactively watch for page changes and expand the sidebar
  // This triggers on every navigation event
  $: {
    if (typeof $page !== 'undefined' && $page.url.pathname) {
      isExpanded = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        isExpanded = false;
      }, 2000); // 2 seconds
    }
  }

  // Function to check if a link is the active one
  const isActive = (href: string) => {
    const { pathname } = $page.url;
    return pathname.includes(href);
  };
  
  onMount(() => {
    const storedUsername = localStorage.getItem('ArmyLogin');
    if (storedUsername) {
      username = storedUsername;
    }
  });

  const handleLogin = (event: CustomEvent) => {
    const newUsername = event.detail.username;
    if (newUsername) {
      localStorage.setItem('ArmyLogin', newUsername);
      username = newUsername;
      showLoginModal = false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ArmyLogin');
    username = null;
  };
</script>

<aside 
  class="flex-shrink-0 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-4 shadow-xl border-r border-gray-700 flex flex-col transition-all duration-300 ease-in-out overflow-y-auto"
  class:w-16={!isExpanded}
  class:w-64={isExpanded}
  on:mouseenter={() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    isExpanded = true;
  }}
  on:mouseleave={() => {
    timeoutId = setTimeout(() => {
      isExpanded = false;
    }, 2000); // 2 seconds
  }}>

  <!-- Header Title for expanded state -->
  <div class="mb-8" class:hidden={!isExpanded}>
    <h3 class="text-xl font-bold text-gray-100 border-b border-gray-700 pb-3">
      {moduleTitle}
    </h3>
  </div>
  
  <!-- Vertical Label for collapsed state -->
  <div class="flex flex-grow items-center justify-center p-4" class:hidden={isExpanded}>
    <span class="text-xl font-bold text-green-400 tracking-widest" style="writing-mode: vertical-rl; text-orientation: mixed; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);">
      {collapsedTitle}
    </span>
  </div>
  
  <ul class="flex-grow space-y-3" class:hidden={!isExpanded}>
    {#each navItems as item (item.href)}
      <li>
        <a href={item.href}
           class="group relative flex items-center p-3 rounded-xl font-medium transition-colors duration-200 ease-in-out
                  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
           class:bg-blue-600={isActive(item.href)}
           class:text-white={isActive(item.href)}
           class:text-gray-400={!isActive(item.href)}
           class:shadow-inner={isActive(item.href)}
           aria-current={isActive(item.href) ? 'page' : undefined}>
          
          <div class="flex items-center" class:justify-center={!isExpanded} class:w-full={!isExpanded}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
            <span class="ml-3" class:hidden={!isExpanded}>{item.label}</span>
          </div>

          <span class="absolute inset-y-0 right-0 w-1 bg-blue-500 rounded-lg transform scale-y-0 group-hover:scale-y-100 group-focus:scale-y-100 group-aria-[current=page]:scale-y-100 transition-transform duration-300 ease-in-out"></span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="mt-8 border-t border-gray-700 pt-6">
    {#if username}
      <div class="text-sm text-gray-400 mb-2" class:hidden={!isExpanded}>Logged in as: <strong>{username}</strong></div>
      <button on:click={handleLogout}
        class="group relative w-full flex items-center p-3 rounded-xl font-medium transition-colors duration-200 ease-in-out
              text-red-400 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900">
        <div class="flex items-center" class:justify-center={!isExpanded} class:w-full={!isExpanded}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707a1 1 0 00-1.414 1.414L8.586 12H7a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L10 13.414l3.293 3.293a1 1 0 001.414-1.414L11.414 12l3.293-3.293a1 1 0 00-1.414-1.414L10 10.586l-3.293-3.293z" clip-rule="evenodd" />
          </svg>
          <span class="ml-3" class:hidden={!isExpanded}>Logout</span>
        </div>
      </button>
    {:else}
      <button on:click={() => showLoginModal = true}
        class="group relative w-full flex items-center p-3 rounded-xl font-medium transition-colors duration-200 ease-in-out
              text-green-400 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-900">
        <div class="flex items-center" class:justify-center={!isExpanded} class:w-full={!isExpanded}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span class="ml-3" class:hidden={!isExpanded}>Login</span>
        </div>
      </button>
    {/if}
  </div>
</aside>

<Modal bind:showModal={showLoginModal} title="Login">
  <svelte:fragment slot="description">
    Please enter your name to log in.
  </svelte:fragment>
  <svelte:fragment slot="body">
    <Login on:submit={handleLogin} on:cancel={() => showLoginModal = false} />
  </svelte:fragment>
</Modal>
