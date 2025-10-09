<script lang="ts">
  export let show = false;
  export let onclose: () => void;

  const ddl = `
-- Table: core_project_acquisition_bidding
CREATE TABLE core_project_acquisition_bidding (
    bidding_id SERIAL PRIMARY KEY,
    bidding_description TEXT NOT NULL,
    bidding_start_dt TIMESTAMP NOT NULL,
    bidding_status_dt TIMESTAMP,
    core_philgeps_publication_fk INT REFERENCES core_philgeps_publication(publication_id),
    lookup_bidding_status_fk INT REFERENCES lookup_bidding_status(status_id),
    lookup_bidding_type_fk INT REFERENCES lookup_bidding_type(type_id)
);

-- Table: core_project_acquisition_bidder
CREATE TABLE core_project_acquisition_bidder (
    bidder_id SERIAL PRIMARY KEY,
    bidder_amount NUMERIC NOT NULL,
    bidder_submit_dt TIMESTAMP NOT NULL,
    core_contractor_bidder_fk INT REFERENCES core_contractor_bidder(bidder_id),
    core_project_acquisition_bidding_fk INT REFERENCES core_project_acquisition_bidding(bidding_id)
);

-- Table: core_contractor_bidder
CREATE TABLE core_contractor_bidder (
    bidder_id SERIAL PRIMARY KEY,
    bidder_name TEXT NOT NULL,
    bidder_address TEXT,
    bidder_details TEXT
);
  `;

  const explanations = [
    'bidding_id → Unique ID for each acquisition bidding session',
    'bidding_description → Description or title of the bidding project',
    'bidding_start_dt → Date and time when bidding officially opens',
    'bidding_status_dt → Timestamp of latest bidding status update',
    'core_philgeps_publication_fk → Links to the PhilGEPS publication entry that announced this bidding',
    'lookup_bidding_status_fk → Reference to current status (open/closed/awarded/etc.)',
    'lookup_bidding_type_fk → Reference to bidding type (public, limited, negotiated, etc.)',
    'bidder_id → Unique ID for each bidder’s bid submission',
    'bidder_amount → Financial bid offered by the contractor',
    'bidder_submit_dt → Timestamp when the bid was officially submitted',
    'core_contractor_bidder_fk → Links to contractor’s company information',
    'core_project_acquisition_bidding_fk → Links each bid to its parent bidding session',
    'bidder_name/address/details → Core identity and profile of the contractor'
  ];
</script>

{#if show}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div
      class="bg-base-100 rounded-2xl shadow-xl w-full max-w-[90ch] relative animate-fade-in overflow-y-auto max-h-[95vh] p-6"
    >
      <button class="absolute top-3 right-3 btn btn-sm btn-ghost" on:click={onclose}>×</button>
      <h2 class="text-2xl font-bold mb-4">Acquisition Tables</h2>
      <p class="mb-4 text-sm opacity-80">
        Core tables defining the acquisition bidding process and its participating bidders.
        Each PhilGEPS publication can have one or more bidding sessions, and each bidding session can have multiple bidders.
      </p>
      <pre class="overflow-auto bg-base-200 p-4 rounded-lg"><code>{ddl}</code></pre>
      <ul class="mt-4 list-disc list-inside text-sm space-y-1">
        {#each explanations as exp}
          <li>{exp}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
