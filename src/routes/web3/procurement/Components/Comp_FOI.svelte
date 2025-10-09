<script lang="ts">
  import { fade } from "svelte/transition";
  import { X as IconX } from "lucide-svelte";

  export let show = false;
  export let onclose: () => void = () => {};
  const close = () => onclose();

  const principles = [
    {
      title: "Universal Access",
      desc: "All citizens have the right to request information on government projects, budgets, and decisions—without need for justification."
    },
    {
      title: "Timely Disclosure",
      desc: "Agencies must respond within a fixed timeframe, ensuring that procurement and spending data remain relevant and actionable."
    },
    {
      title: "Proactive Transparency",
      desc: "Procurement 3.0 automatically publishes key documents—plans, bid results, and audits—reducing dependence on manual FOI requests."
    },
    {
      title: "Public Accountability",
      desc: "Digital ledgers and open dashboards make each transaction traceable from planning to audit, operationalizing the spirit of E.O. No. 2."
    }
  ];
</script>

{#if show}
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
    transition:fade
    role="dialog"
    aria-modal="true"
    onclick={close}
  >
    <div
      class="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-3xl relative animate-fade-in"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        class="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
        onclick={close}
        aria-label="Close"
      >
        <IconX class="w-4 h-4" />
      </button>

      <h2 class="text-2xl font-bold text-primary mb-2">Freedom of Information (FOI)</h2>
      <p class="opacity-80 mb-4 text-sm">
        Under Executive Order No. 2, citizens are empowered to access government data. In Procurement 3.0,
        FOI principles are digitally embedded rather than manually requested.
      </p>

      <div class="space-y-4">
        {#each principles as p}
          <div class="p-4 bg-base-200 rounded-xl border-l-4 border-accent shadow-sm">
            <h3 class="font-semibold text-primary text-lg mb-1">{p.title}</h3>
            <p class="text-sm opacity-80">{p.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fade-in 0.25s ease-out; }
</style>
