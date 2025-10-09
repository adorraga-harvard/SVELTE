<script lang="ts">
  import { fade } from "svelte/transition";
  import { X as IconX } from "lucide-svelte";

  export let show = false;
  export let onclose: () => void = () => {};
  const close = () => onclose();

  const principles = [
    {
      title: "Data Minimization",
      desc: "Only essential information is collected and stored—citizens’ personal data remain outside procurement ledgers unless strictly necessary."
    },
    {
      title: "Encryption & Access Control",
      desc: "All sensitive datasets are encrypted at rest and in transit, accessible only to authorized agencies under DP Act compliance."
    },
    {
      title: "Selective Transparency",
      desc: "Project-level financials are public, but personal identifiers and security-sensitive details are redacted or tokenized."
    },
    {
      title: "Accountability by Design",
      desc: "Each data access and modification is logged immutably, ensuring traceability of who viewed or altered records."
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

      <h2 class="text-2xl font-bold text-primary mb-2">Data Privacy & Security</h2>
      <p class="opacity-80 mb-4 text-sm">
        Procurement 3.0 aligns with the Data Privacy Act of 2012—balancing open governance with the duty to
        protect personal and strategic information.
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
