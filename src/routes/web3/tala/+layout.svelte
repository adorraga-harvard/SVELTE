<script>
  import './project_Scoped.css';
	import ThemeChooser from '$lib/Customized/Components/Comp_ThemeChooser.svelte';

</script>

<style>
  /* Global styles for the layout */
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>

<div class="main-layout">
  <header>
    <div class="navbar bg-base-100 shadow-xl p-4">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-4xl text-base-600 font-extrabold">
          <span class="text-base-500" style="text-shadow:4px 4px 7px silver">Project TALA</span>
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