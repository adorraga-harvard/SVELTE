<script lang="ts">
  // Auto-generated for Providers/mmda/planning/digital-twin/TrafficSimulation.svelte
  // Endpoint type(s): form,map,analytics
  export let data: any;

  $: console.log('Page Data for Providers/mmda/planning/digital-twin/TrafficSimulation.svelte:', data);

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
<div class="card bg-base-100 shadow-xl lg:w-2/3 mx-auto">
  <div class="card-body">
    <h2 class="card-title text-2xl">{data.pageData?.title || 'Data Submission Form'}</h2>
    <p>{data.pageData?.description || 'Please provide the necessary information below.'}</p>
    <div class="divider"></div>
    <form method="POST" action="?/submit" class="space-y-4">
      <div class="form-control">
        <label class="label" for="fullName"><span class="label-text">Full Name</span></label>
        <input type="text" id="fullName" value="{randomName}" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label" for="department"><span class="label-text">Concerned Department</span></label>
        <select class="select select-bordered" id="department"><option>{randomDept}</option><option>Treasury Department</option><option>Planning & Development</option></select>
      </div>
      <div class="form-control">
        <label class="label" for="reason"><span class="label-text">Reason for Request</span></label>
        <textarea id="reason" class="textarea textarea-bordered h-24" placeholder="Please state your reason..."></textarea>
      </div>
      <div class="card-actions justify-end mt-6">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
</div>
<div class="card bg-base-100 shadow-xl image-full h-96">
  <figure><div class="w-full h-full bg-base-300 flex items-center justify-center text-base-content/30 text-4xl">🗺️</div></figure>
  <div class="card-body">
    <h2 class="card-title">{data.pageData?.title || 'Geospatial Map'}</h2>
    <p>{data.pageData?.description || 'Interactive map data.'}</p>
    <div class="alert alert-warning shadow-lg max-w-md mt-auto">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span><b>LIVE ALERT:</b> {randomAlert} near {randomLocation}.</span>
      </div>
    </div>
  </div>
</div>
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
</div>
