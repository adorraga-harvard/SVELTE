<script lang="ts">
  export let show = false;
  export let onclose: () => void;
</script>

{#if show}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    on:click={(e) => e.target === e.currentTarget && onclose()}
  >
    <div
      class="bg-base-100 rounded-2xl shadow-xl w-full max-w-[90ch] max-h-[95vh] overflow-y-auto p-6 relative animate-fade-in"
    >
      <button
        class="absolute top-3 right-3 btn btn-sm btn-ghost"
        on:click={onclose}
      >
        ✕
      </button>

      <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-3">
        🧩 Roles Overview & Entities in Procurement Workflow
      </h2>

      <p class="text-accent italic opacity-80 mb-6">
        💡 <b>Who are involved</b> — a concise overview of all participating entities and their system roles in the procurement process.
      </p>

      <div class="space-y-6 text-sm leading-relaxed">
        <!-- FOIA -->
        <div class="bg-base-200 rounded-xl p-4 border-l-4 border-accent shadow-sm">
          <h3 class="text-xl font-bold text-primary mb-1">FOIA (Freedom of Information Authority)</h3>
          <p>
            Acts as the <b>guardian of transparency</b>. Ensures that procurement data, once public, stays
            accessible and verifiable. In the system, FOIA acts as a meta-auditor, confirming that
            documents and logs are immutable and retrievable by citizens.
          </p>
        </div>

        <!-- Submitter -->
        <div class="bg-base-200 rounded-xl p-4 border-l-4 border-primary shadow-sm">
          <h3 class="text-xl font-bold text-primary mb-1">Submitter (Implementing Agency or End-User)</h3>
          <p>
            The <b>starting point</b> of every project. Agencies such as DPWH, DOH, or DepEd create and submit
            project proposals through the digital platform. Once submitted, records are locked for
            integrity and await review or approval.
          </p>
        </div>

        <!-- Mover -->
        <div class="bg-base-200 rounded-xl p-4 border-l-4 border-secondary shadow-sm">
          <h3 class="text-xl font-bold text-secondary mb-1">Mover (Bids and Awards Committee / Approver)</h3>
          <p>
            The <b>decision-making role</b>. Movers approve, award, or advance a project’s stage — such as
            endorsing a project for bidding or awarding a winning contractor. Every move is logged and
            timestamped for full accountability.
          </p>
        </div>

        <!-- Bidder -->
        <div class="bg-base-200 rounded-xl p-4 border-l-4 border-success shadow-sm">
          <h3 class="text-xl font-bold text-success mb-1">Bidder (Supplier / Contractor)</h3>
          <p>
            The <b>participant</b> in the acquisition stage. Bidders submit quotations and compete through
            transparent, digital bidding. Each bid is tied to PhilGEPS publication records and verified
            against eligibility rules.
          </p>
        </div>

        <!-- Auditor -->
        <div class="bg-base-200 rounded-xl p-4 border-l-4 border-error shadow-sm">
          <h3 class="text-xl font-bold text-error mb-1">Auditor (PhilGEPS / COA)</h3>
          <p>
            The <b>oversight authority</b>. Auditors verify project integrity, validate approvals, and confirm
            lawful disbursements. COA handles external auditing, while PhilGEPS acts as a
            system-level registry of published and awarded bids.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
