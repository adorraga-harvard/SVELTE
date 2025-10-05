<script lang="ts">
  // Auto-generated for Providers/mmda/mobility/IntelligentTrafficSystems.svelte
  // Endpoint type(s): dashboard,settings,table
  export let data: any;

  $: console.log('Page Data for Providers/mmda/mobility/IntelligentTrafficSystems.svelte:', data);

  // --- UTILITY FUNCTIONS FOR DYNAMIC DATA ---
  const R = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  const R_NUM = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const R_CURRENCY = (min: number, max: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(R_NUM(min, max));
  const R_DATE = () => {
    const end = new Date();
    const start = new Date(end.getTime() - (30 * 24 * 60 * 60 * 1000));
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const R_TIME = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // --- SAMPLE DATA ARRAYS ---
  const NAMES: string[] = ['Angela Reyes', 'Miguel Santos', 'Sofia Dela Cruz', 'Carlos Imperial', 'Bea Alonzo-Domingo'];
  const DEPARTMENTS: string[] = ["Assessor's Office", 'Engineering Dept.', 'Health Department', 'Social Services', 'BPLO'];
  const LOCATIONS: string[] = ['Quezon City Hall', 'Novaliches District Center', 'La Loma Health Center', 'Cubao Business Center'];
  const STATUSES: { label: string; badge: string }[] = [
    { label: 'Approved', badge: 'badge-success' }, { label: 'Pending Review', badge: 'badge-warning' },
    { label: 'For Inspection', badge: 'badge-info' }, { label: 'Rejected', badge: 'badge-error' },
  ];
  const TASKS: string[] = ['Initial Document Review', 'Site Inspection Schedule', 'Final Assessment', 'Permit Issuance', 'Compliance Check'];
  const ALERTS: string[] = ['Heavy Traffic on Elliptical Road', 'Flood Warning: Project 4', 'Scheduled Power Interruption', 'Community Health Drive'];
  const FILE_TYPES: { icon: string; name: string; ext: string }[] = [
    { icon: '📄', name: 'BarangayClearance', ext: '.pdf' }, { icon: '📊', name: 'FinancialStatement', ext: '.xlsx' },
    { icon: '🖼️', name: 'SitePhotograph', ext: '.jpg' }, { icon: '📦', name: 'ProjectProposal', ext: '.zip' },
  ];

  // --- GENERATED VALUES FOR THIS PAGE LOAD ---
  const randomName = R(NAMES);
  const randomDept = R(DEPARTMENTS);
  const randomLocation = R(LOCATIONS);
  const randomStatus = R(STATUSES);
  const randomTask = R(TASKS);
  const randomAlert = R(ALERTS);
  const randomFile = R(FILE_TYPES);
  const randomAmount = R_CURRENCY(15000, 150000);
  const tableStatus1 = R(STATUSES);
  const tableStatus2 = R(STATUSES);
  const documentFile2 = R(FILE_TYPES);
</script>

<div class="endpoint-container p-4 space-y-4">
<div class="space-y-6">
  <div>
    <h2 class="text-3xl font-bold">{data.pageData?.title || 'Operations Dashboard'}</h2>
    <p class="text-base-content/70">{data.pageData?.description || 'Real-time overview of key metrics.'}</p>
  </div>
  <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
    <div class="stat">
      <div class="stat-figure text-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
      <div class="stat-title">New Applications</div>
      <div class="stat-value">{R_NUM(80, 200)}</div>
      <div class="stat-desc">As of {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-secondary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div>
      <div class="stat-title">Permits Renewed</div>
      <div class="stat-value">{R_NUM(1200, 2500)}</div>
      <div class="stat-desc">↗︎ {R_NUM(200, 400)} more than last month</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
      <div class="stat-title">Open Incidents</div>
      <div class="stat-value text-error">{R_NUM(5, 25)}</div>
      <div class="stat-desc">Live incident reports</div>
    </div>
  </div>
</div>
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{data.pageData?.title || 'System Settings'}</h2>
    <p>{data.pageData?.description || 'Manage your preferences and configurations.'}</p>
    <div class="divider"></div>
    <div class="flex flex-col gap-4">
      <div class="form-control"><label class="label cursor-pointer"><span class="label-text font-semibold">Enable Email Notifications</span><input type="checkbox" checked="checked" class="toggle toggle-primary" /></label></div>
      <div class="form-control"><label class="label cursor-pointer"><span class="label-text font-semibold">Enable SMS Alerts</span><input type="checkbox" checked="checked" class="toggle toggle-secondary" /></label></div>
      <div class="form-control"><label class="label cursor-pointer"><span class="label-text font-semibold">High Contrast Mode</span><input type="checkbox" class="toggle" /></label></div>
    </div>
  </div>
</div>
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h2 class="card-title">{data.pageData?.title || 'Data Records'}</h2>
            <p class="text-sm text-base-content/70">{data.pageData?.description || 'A list of relevant records.'}</p>
        </div>
        <div class="form-control">
            <input type="text" placeholder="Filter records..." class="input input-bordered input-sm w-full sm:w-auto" />
        </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <thead>
            <tr>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">Control No.</button></th>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">Applicant / Business</button></th>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">Date Filed</button></th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {#if data.tableRecords && data.tableRecords.length > 0}
            {#each data.tableRecords as record}
            <tr>
                <td>{record.controlNo}</td>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar"><div class="mask mask-squircle w-12 h-12"><img src={record.applicant.avatar} alt="Applicant Avatar" /></div></div>
                        <div>
                            <div class="font-bold">{record.applicant.name}</div>
                            <div class="text-sm opacity-50">{record.applicant.location}</div>
                        </div>
                    </div>
                </td>
                <td>{record.dateFiled}</td>
                <td><span class="badge {record.status.badge}">{record.status.label}</span></td>
                <th><button class="btn btn-ghost btn-xs">details</button></th>
            </tr>
            {/each}
          {:else}
            {@const samples = [
              { name: 'Juan Dela Cruz', location: 'Quezon City', avatar: 1, date: '2025-09-17', status: 'Approved', badge: 'badge-success' },
              { name: 'Maria Clara', location: 'Manila City', avatar: 2, date: '2025-09-16', status: 'Pending', badge: 'badge-warning' },
              { name: 'Jose Rizal', location: 'Calamba', avatar: 3, date: '2025-09-15', status: 'Approved', badge: 'badge-success' },
              { name: 'Andres Bonifacio', location: 'Tondo', avatar: 4, date: '2025-09-14', status: 'Rejected', badge: 'badge-error' },
              { name: 'Gabriela Silang', location: 'Ilocos Sur', avatar: 5, date: '2025-09-13', status: 'Processing', badge: 'badge-info' },
              { name: 'Emilio Aguinaldo', location: 'Cavite', avatar: 6, date: '2025-09-12', status: 'Approved', badge: 'badge-success' },
              { name: 'Apolinario Mabini', location: 'Batangas', avatar: 7, date: '2025-09-11', status: 'Pending', badge: 'badge-warning' },
              { name: 'Melchora Aquino', location: 'Caloocan', avatar: 8, date: '2025-09-10', status: 'Approved', badge: 'badge-success' },
              { name: 'Lapu-Lapu', location: 'Mactan', avatar: 1, date: '2025-09-09', status: 'Rejected', badge: 'badge-error' },
              { name: 'Antonio Luna', location: 'Ilocos Norte', avatar: 2, date: '2025-09-08', status: 'Approved', badge: 'badge-success' }
            ]}
            {#each samples as s, i}
            <tr>
              <td>BPLS-2025-0000{i + 1}</td>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar"><div class="mask mask-squircle w-12 h-12"><img src="/avatars/stock-{s.avatar}.jpg" alt="Sample Avatar" /></div></div>
                  <div>
                    <div class="font-bold">{s.name} (Sample)</div>
                    <div class="text-sm opacity-50">{s.location}</div>
                  </div>
                </div>
              </td>
              <td>{s.date}</td>
              <td><span class="badge {s.badge}">{s.status}</span></td>
              <th><button class="btn btn-ghost btn-xs">details</button></th>
            </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
