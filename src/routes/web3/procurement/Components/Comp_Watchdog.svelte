<script lang="ts">
  import { fade } from "svelte/transition";
  import { X as IconX } from "lucide-svelte";

  // Props: control visibility
  export let show = false;
  export let onclose: () => void = () => {};

  // Helper to close modal
  const close = () => onclose();

  // Mission-critical milestones that are publicly logged
  const milestones = [
    {
      title: "Project Approval",
      desc: "Confirms that the project has passed planning and funding clearance by oversight bodies such as NEDA and DBM."
    },
    {
      title: "Bid Award Notice",
      desc: "Records the final award of the contract through PhilGEPS, ensuring transparent contractor selection."
    },
    {
      title: "Implementation Kickoff",
      desc: "Marks the official start of construction or rollout, committing the agency and contractor to timelines."
    },
    {
      title: "Final Acceptance & Audit",
      desc: "Captures COA-verified project completion and performance audit for accountability."
    }
  ];

  // Notes on the vetting process
  const vetting = [
    "Only key irreversible milestones are logged — avoiding overload while ensuring accountability.",
    "Milestone data is hashed and timestamped on a permissioned public ledger.",
    "Updates are validated by multi-agency nodes (e.g., DepDEV, DBM, COA) to prevent unilateral alteration."
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
      <!-- CLOSE BUTTON -->
      <button
        class="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
        onclick={close}
        aria-label="Close"
      >
        <IconX class="w-4 h-4" />
      </button>

      <!-- HEADER -->
      <h2 class="text-2xl font-bold text-primary mb-2">Digital Watchdog Milestones</h2>
      <p class="opacity-80 mb-4 text-sm">
        The following milestones are logged immutably to ensure public transparency and institutional accountability.
      </p>

      <!-- MILESTONE LIST -->
      <div class="space-y-4">
        {#each milestones as m}
          <div class="p-4 bg-base-200 rounded-xl border-l-4 border-accent shadow-sm">
            <h3 class="font-semibold text-primary text-lg mb-1">{m.title}</h3>
            <p class="text-sm opacity-80">{m.desc}</p>
          </div>
        {/each}
      </div>

      <!-- VETTING SECTION -->
      <div class="mt-6 border-t border-base-300 pt-4">
        <h3 class="font-semibold text-accent mb-2">Vetting Process</h3>
        <ul class="space-y-2 text-sm opacity-80">
          {#each vetting as note}
            <li>{note}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.25s ease-out;
  }
</style>
