<script lang="ts">
  export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description",
    tableRecords: [],
    totalRecords: 0
  };
</script>

<div class="project-card {props.customClass}">
  <div class="project-card-body">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h2 class="project-card-title">{props.title || 'Data Records'}</h2>
        <p class="project-card-description">{props.description || 'Manage and review all relevant records.'}</p>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Filters Dropdown -->
        <div class="dropdown dropdown-end">
          <button class="btn btn-outline btn-sm normal-case">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M6 8h12M9 12h6"/>
            </svg>
            Filters
          </button>
          <div class="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-72 mt-2">
            <div class="form-control w-full">
              <label class="label flex flex-col w-full">
                <span class="label-text">Filter by Status</span>
                <select class="select select-bordered select-sm mt-1">
                  <option>Any Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </label>
            </div>
            <button class="btn btn-primary btn-sm mt-4 w-full">Apply Filters</button>
          </div>
        </div>

        <!-- Add New -->
        <button class="btn btn-primary btn-sm normal-case flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add New
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Control No.</th>
            <th>Applicant / Business</th>
            <th>Date Filed</th>
            <th>Status</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if props.tableRecords && props.tableRecords.length > 0}
            {#each props.tableRecords as record}
              <tr class="hover">
                <td><span class="font-mono text-primary font-semibold">{record.controlNo}</span></td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img src={record.applicant.avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{record.applicant.name}</div>
                      <div class="text-sm opacity-50">{record.applicant.location}</div>
                    </div>
                  </div>
                </td>
                <td>{record.dateFiled}</td>
                <td>
                  <span class="badge {record.status.badge} font-medium">{record.status.label}</span>
                </td>
                <td class="text-right">
                  <div class="dropdown dropdown-left">
                    <button class="btn btn-ghost btn-circle btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01"/>
                      </svg>
                    </button>
                    <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><button class="w-full text-left">View</button></li>
                      <li><button class="w-full text-left">Edit</button></li>
                    </ul>
                  </div>
                </td>
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan="5" class="text-center p-8 text-base-content/50">
                No records found.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm">
      <div class="text-base-content/70">
        Showing <span class="font-bold">1-10</span> of <span class="font-bold">{props.totalRecords}</span> results
      </div>
      <div class="join">
        <button class="join-item btn btn-sm">«</button>
        <button class="join-item btn btn-sm btn-active">1</button>
        <button class="join-item btn btn-sm">»</button>
      </div>
    </div>
  </div>
</div>
