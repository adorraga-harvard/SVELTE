<script lang="ts">
    import * as Mock from '$lib/DataSources/DS_MockDataSource';

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    tableRecords: []
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <div class="flex items-center space-x-6">
      <div class="avatar online">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="/avatars/stock-{Mock.R_NUM(1, 8)}.jpg" alt="User Profile" />
        </div>
      </div>
      <div>
        <h1 class="text-2xl font-bold">{Mock.randomName()}</h1>
        <p class="text-base-content/70">Citizen ID: {Mock.R_NUM(1000, 9999)}-{Mock.R_NUM(1000, 9999)}</p>
        <div class="flex space-x-2 mt-2">
          <div class="badge badge-success gap-1">PinoyID Verified</div>
          <div class="badge badge-info">Good Taxpayer</div>
        </div>
      </div>
    </div>
    <div class="project-card-divider"></div>
    <div class="tabs tabs-boxed">
      <a class="tab tab-active">Linked Services</a>
      <a class="tab">Activity Log</a>
      <a class="tab">Account Settings</a>
    </div>
    <div class="py-4">
      <h3 class="font-bold text-lg">My Active Permits & Licenses</h3>
      <div class="overflow-x-auto mt-4">
        <table class="table w-full">
          <thead><tr><th>Control No.</th><th>Applicant / Business</th><th>Date Filed</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {#if props.tableRecords && props.tableRecords.length > 0}
              {#each props.tableRecords as record}
              <tr class="hover">
                <td><span class="font-mono">{record.controlNo}</span></td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar"><div class="mask mask-squircle w-12 h-12"><img src={record.applicant.avatar} alt="Avatar" /></div></div>
                    <div><div class="font-bold">{record.applicant.name}</div><div class="text-sm opacity-50">{record.applicant.location}</div></div>
                  </div>
                </td>
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
</div>
