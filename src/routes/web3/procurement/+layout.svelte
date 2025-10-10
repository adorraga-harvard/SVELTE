<script lang="ts">
  import '$lib/project_Scoped.css';
  import ThemeChooser from '$lib/Customized/Components/Comp_ThemeChooser.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const lastVisit = sessionStorage.getItem('visitorLoggedAt');
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > 2 * 60 * 1000) {
      // Log visitor once every 2 minutes
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
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: var(--navbar-bg);
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
  }

  .normal-case {
    font-size: 2rem;
  }

  /* 🚫 Removed padding-top so content sits directly below header */
  main {
    padding-top: 0;
    margin-top: 0;
  }

  /* Font family */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Orbitron', sans-serif;
  }
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

    <!-- Banner -->
    <section
      class="text-center bg-gradient-to-br from-primary to-accent text-primary-content shadow-xl pb-4 pt-0"
    >
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
        Procurement 3.0: A Transparent Philippines
      </h1>
      <p class="max-w-3xl mx-auto text-lg opacity-90 mt-2 mb-2">
        <b>A national vision powered by Web3.</b><br />
        Reimagining how infrastructure is planned, funded, and delivered with
        transparency, efficiency, and citizen trust.
      </p>
    </section>
  </header>

  <main>
    <slot />
  </main>
</div>
