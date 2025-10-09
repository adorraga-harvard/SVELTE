<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  interface Visitor {
    ip: string;
    page: string;
    visitedAt: string;
  }

  let visitors = writable<Visitor[]>([]);
  let error: string | null = null;

  onMount(async () => {
    try {
      const res = await fetch('/api/visitors');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      visitors.set(data);
    } catch (err) {
      console.error('Failed to load visitor data.', err);
      error = 'Failed to load visitor data.';
    }
  });
</script>

<style>
  /* No JS here! Only CSS */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
  th {
    background-color: #f3f3f3;
  }
  tr:hover {
    background-color: #f9f9f9;
  }
</style>

<section class="max-w-6xl mx-auto p-4 mt-6">
  <h1 class="text-3xl font-bold mb-4">Visitor Log</h1>

  {#if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <table class="table-auto">
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Page Visited</th>
          <th>Visited At (UTC)</th>
        </tr>
      </thead>
      <tbody>
        {#each $visitors as v}
          <tr>
            <td>{v.ip}</td>
            <td>{v.page}</td>
            <td>{new Date(v.visitedAt).toLocaleString()}</td>
          </tr>
        {/each}
        {#if $visitors.length === 0}
          <tr>
            <td colspan="3" class="text-center">No visitors logged yet.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  {/if}
</section>
