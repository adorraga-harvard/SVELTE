<script lang="ts">
  export let show = false;
  export let onclose: () => void;

  const ddl = `
-- Table: core_project_preparation
CREATE TABLE core_project_preparation (
    preparation_id SERIAL PRIMARY KEY,
    preparation_description TEXT NOT NULL,
    preparation_submission_dt TIMESTAMP NOT NULL,
    lookup_agency_fk INT REFERENCES lookup_agency(agency_id),
    lookup_preparation_status_fk INT REFERENCES lookup_preparation_status(status_id),
    lookup_preparation_status_dt TIMESTAMP
);
  `;

  const explanations = [
    'preparation_id → Unique ID for each preparation record',
    'preparation_description → Description of the preparation task',
    'preparation_submission_dt → Date/time the preparation was submitted',
    'lookup_agency_fk → References the responsible agency',
    'lookup_preparation_status_fk → References preparation status (approved/pending/etc.)',
    'lookup_preparation_status_dt → Timestamp of the status update'
  ];
</script>

{#if show}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-[80ch] relative animate-fade-in">
      <button class="absolute top-3 right-3 btn btn-sm btn-ghost" on:click={onclose}>×</button>
      <h2 class="text-2xl font-bold mb-4">Preparation Tables</h2>
      <p class="mb-4 text-sm opacity-80">
        Core tables for project preparation, submission, and status tracking.
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
