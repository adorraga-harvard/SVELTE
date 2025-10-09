<script lang="ts">
  export let show = false;
  export let onclose: () => void;

  // Updated DDL — publication originates from preparation
  const ddl = `
-- Table: core_philgeps_publication
CREATE TABLE core_philgeps_publication (
    publication_id SERIAL PRIMARY KEY,
    publication_name TEXT NOT NULL,
    publication_description TEXT,
    publication_dt TIMESTAMP NOT NULL,
    core_project_preparation_fk INT REFERENCES core_project_preparation(preparation_id)
      ON DELETE SET NULL
);
  `;

  const explanations = [
    'publication_id → Unique ID for each PhilGEPS publication.',
    'publication_name → Title or identifier of the published procurement opportunity.',
    'publication_description → Optional descriptive details about the posting.',
    'publication_dt → Official PhilGEPS posting date for transparency.',
    'core_project_preparation_fk → Links this publication to the originating project preparation record (not strictly dependent, just traceable).'
  ];
</script>

{#if show}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-[60ch] relative animate-fade-in">
      <button
        class="absolute top-3 right-3 btn btn-sm btn-ghost"
        on:click={onclose}
        title="Close"
      >
        ×
      </button>

      <h2 class="text-2xl font-bold mb-4 text-primary">
        PhilGEPS Publication Table
      </h2>

      <p class="mb-4 text-sm opacity-80">
        This table stores official <b>PhilGEPS publication</b> details —
        the public-facing records of procurement opportunities that
        originate from approved project preparations.
      </p>

      <pre class="overflow-auto bg-base-200 p-4 rounded-lg text-xs"><code>{ddl}</code></pre>

      <ul class="mt-4 list-disc list-inside text-sm space-y-1">
        {#each explanations as exp}
          <li>{exp}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
