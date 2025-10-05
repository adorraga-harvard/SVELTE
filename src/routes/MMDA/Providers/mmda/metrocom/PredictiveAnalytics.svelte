<script lang="ts">
  // Auto-generated for Providers/mmda/metrocom/PredictiveAnalytics.svelte
  // Endpoint type(s): analytics,dashboard,report
  export let data: any;

  $: console.log('Page Data for Providers/mmda/metrocom/PredictiveAnalytics.svelte:', data);

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
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{data.pageData?.title || 'Analytics Studio'}</h2>
    <p>{data.pageData?.description || 'Analyze trends and data patterns.'}</p>
    <div class="tabs tabs-boxed mt-4">
      <a class="tab tab-active">Trend Chart</a> 
      <a class="tab">Data Breakdown</a> 
      <a class="tab">Geospatial Heatmap</a>
    </div>
    <div class="bg-base-200/50 h-80 flex items-center justify-center rounded-b-box rounded-tr-box mt-[-1px]">
      <p class="text-base-content/40">📈 Advanced Chart Placeholder</p>
    </div>
  </div>
</div>
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
    <div class="p-4 border-b border-base-300 flex justify-between items-center">
        <div>
            <h2 class="text-xl font-bold">{data.pageData?.title || 'Official Report'}</h2>
            <p class="text-sm opacity-70">Generated by: {randomName} on {new Date().toLocaleString()}</p>
        </div>
        <button class="btn btn-outline btn-sm">🖨️ Print Report</button>
    </div>
    <div class="p-4">
        <p>{data.pageData?.description || 'Summary of findings and data.'}</p>
        <div class="form-control mt-4">
            <input type="text" placeholder="Filter line items..." class="input input-bordered input-sm w-full max-w-xs" />
        </div>
    </div>
    <div class="p-4 overflow-x-auto">
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
              {#if data.reportLines && data.reportLines.length > 0}
                {#each data.reportLines as line}
                <tr>
                    <td>{line.id}</td>
                    <td>{line.description}</td>
                    <td>{line.category}</td>
                    <td>{line.amount}</td>
                </tr>
                {/each}
              {:else}
                {@const lines = [
                  { id: 'RPT-001', desc: 'Real Property Tax Q3', cat: 'Tax Payment', amt: '₱15,820.50' },
                  { id: 'BPL-001', desc: 'New Business Permit Fee', cat: 'Business', amt: '₱5,500.00' },
                  { id: 'SAN-001', desc: 'Sanitary Permit Fee', cat: 'Health', amt: '₱750.00' },
                  { id: 'FSC-001', desc: 'Fire Safety Certificate', cat: 'Safety', amt: '₱1,250.00' },
                  { id: 'CTC-001', desc: 'Community Tax Certificate', cat: 'Admin', amt: '₱150.00' },
                  { id: 'VIO-001', desc: 'Illegal Parking Violation', cat: 'Penalty', amt: '₱1,000.00' },
                  { id: 'ZON-001', desc: 'Zoning Clearance Fee', cat: 'Planning', amt: '₱2,000.00' },
                  { id: 'RPT-002', desc: 'Real Property Tax Q4', cat: 'Tax Payment', amt: '₱15,820.50' },
                  { id: 'BPL-002', desc: 'Business Permit Renewal', cat: 'Business', amt: '₱3,000.00' },
                  { id: 'ENV-001', desc: 'Environmental Fee', cat: 'Environment', amt: '₱500.00' }
                ]}
                {#each lines as l}
                <tr>
                  <td>{l.id} (Sample)</td>
                  <td>{l.desc}</td>
                  <td>{l.cat}</td>
                  <td>{l.amt}</td>
                </tr>
                {/each}
              {/if}
            </tbody>
        </table>
    </div>
  </div>
</div>
</div>
