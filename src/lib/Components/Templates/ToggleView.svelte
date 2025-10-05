<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description",
    tableRecords: []
    };
</script>


<div>
  <div class="flex justify-between items-center mb-4">
    <div>
      <h2 class="project-card-title">{props.title || 'Records'}</h2>
      <p class="project-card-description">{props.description || 'Toggle between table and grid views.'}</p>
    </div>
    <div class="swap swap-rotate btn btn-ghost btn-sm">
      <input type="checkbox" on:change={() => { const el = document.getElementById('view-container'); el.classList.toggle('is-grid-view'); el.classList.toggle('is-table-view'); }} />
      <svg class="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V13A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0-1,1v10a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5ZM20,12a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V13A1,1,0,0,0,20,12ZM16.36,17l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,16.36,17ZM19,4a1,1,0,0,0-1,1v10a1,1,0,0,0,2,0V5A1,1,0,0,0,19,4Z"/></svg>
      <svg class="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,18h4V14H10V18ZM4,18h4V14H4V18ZM4,12h4V8H4V12ZM10,12h4V8H10V12ZM16,6V18h4V6H16ZM10,6h4V2H10V6ZM4,6h4V2H4V6Z"/></svg>
    </div>
  </div>
  <div id="view-container" class="is-table-view">
    <div class="view-table project-card">
        <div class="project-card-body">
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead><tr><th>Control No.</th><th>Applicant / Business</th><th>Date Filed</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {#if props.tableRecords && props.tableRecords.length > 0}
                            {#each props.tableRecords as record}
                            <tr class="hover">
                                <td><span class="font-mono">{record.controlNo}</span></td>
                                <td><div class="flex items-center space-x-3"><div class="avatar"><div class="mask mask-squircle w-12 h-12"><img src={record.applicant.avatar} alt="Avatar" /></div></div><div><div class="font-bold">{record.applicant.name}</div><div class="text-sm opacity-50">{record.applicant.location}</div></div></div></td>
                                <td>{record.dateFiled}</td>
                                <td><span class="badge {record.status.badge}">{record.status.label}</span></td>
                                <th><button class="btn btn-ghost btn-xs">details</button></th>
                            </tr>
                            {/each}
                        {:else}
                            <tr><td colspan="5" class="text-center p-8 text-base-content/50">No records found.</td></tr>
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="view-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#if props.tableRecords && props.tableRecords.length > 0}
        {#each props.tableRecords as record}
          <div class="project-card text-center">
              <div class="project-card-body items-center">
                  <div class="avatar"><div class="w-16 rounded-full"><img src={record.applicant.avatar} /></div></div>
                  <h3 class="font-bold mt-2">{record.applicant.name}</h3>
                  <p class="text-sm opacity-60">{record.applicant.location}</p>
                  <span class="badge {record.status.badge} mt-2">{record.status.label}</span>
              </div>
          </div>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50 md:col-span-2 lg:col-span-3">No records to display in grid view.</div>
      {/if}
    </div>
  </div>
</div>
