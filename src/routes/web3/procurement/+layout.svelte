<script lang="ts">
  import '$lib/project_Scoped.css';
  import ThemeChooser from '$lib/Customized/Components/Comp_ThemeChooser.svelte';
   import { onMount } from 'svelte';

  onMount(() => {
    const lastVisit = sessionStorage.getItem('visitorLoggedAt');
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > 2 * 60 * 1000) { // 2 minutes
      fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.pathname,
          visitedAt: new Date().toISOString()
        })
      })
        .then(() => sessionStorage.setItem('visitorLoggedAt', now.toString()))
        .catch(err => console.error('Failed to log visitor:', err));
    }
  });
</script>

<svelte:head>
  <!-- Google Font -->
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  .main-layout { display: flex; flex-direction: column; min-height: 100vh; }
  header { position: sticky; top: 0; z-index: 50; box-shadow: 0 2px 5px rgba(0,0,0,0.1); background-color: var(--navbar-bg); }
  .navbar { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1rem; }
  .btn { padding: 0.5rem 1rem; }
  .normal-case { font-size: 2rem; }
  main { padding-top: 100px; }
  body, h1, h2, h3, h4, h5, h6 { font-family: 'Orbitron', sans-serif; }
</style>

<div class="main-layout">
  <header>
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-base-600">
          <span class="text-base-500" style="text-shadow: 2px 2px 4px silver">
            Independent Committee on Infrastructure
          </span>
        </a>
      </div>
      <div class="flex-none">
        <ThemeChooser />
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>
</div>
