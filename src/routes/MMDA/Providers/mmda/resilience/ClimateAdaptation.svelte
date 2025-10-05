<script lang="ts">
  // Auto-generated for Providers/mmda/resilience/ClimateAdaptation.svelte
  // Endpoint type(s): tracker,document_hub,report
  export let data: any;

  $: console.log('Page Data for Providers/mmda/resilience/ClimateAdaptation.svelte:', data);

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
    <h2 class="card-title">{data.pageData?.title || 'Application Tracker'}</h2>
    <p>Status of your request as of {new Date().toLocaleDateString()}</p>
    <ul class="timeline timeline-vertical mt-6">
      <li>
        <div class="timeline-start">{R_DATE()}</div>
        <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-success"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg></div>
        <div class="timeline-end timeline-box">Submitted by {R(NAMES)}</div>
        <hr class="bg-success"/>
      </li>
      <li>
        <hr class="bg-success"/>
        <div class="timeline-start">{R_DATE()}</div>
        <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-success"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg></div>
        <div class="timeline-end timeline-box">Reviewed by {randomDept}</div>
        <hr class="bg-warning"/>
      </li>
      <li>
        <hr class="bg-warning"/>
        <div class="timeline-start">{R_DATE()}</div>
        <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-warning"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM.75 10a9.25 9.25 0 1018.5 0 9.25 9.25 0 00-18.5 0z" /></svg></div>
        <div class="timeline-end timeline-box">Pending Approval from {R(DEPARTMENTS)}</div>
        <hr/>
      </li>
    </ul>
  </div>
</div>
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h2 class="card-title">{data.pageData?.title || 'Document Hub'}</h2>
            <p class="text-sm text-base-content/70">{data.pageData?.description || 'Browse and download required forms.'}</p>
        </div>
        <div class="form-control">
            <input type="text" placeholder="Filter documents..." class="input input-bordered input-sm w-full sm:w-auto" />
        </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <thead>
            <tr>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">File Name</button></th>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">Modified Date</button></th>
                <th><button class="btn btn-ghost btn-xs p-0 font-bold">Size</button></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {#if data.documents && data.documents.length > 0}
            {#each data.documents as doc}
            <tr>
              <td><span class="mr-2">{doc.icon}</span> {doc.name}{doc.ext}</td>
              <td>{doc.modifiedDate}</td>
              <td>{doc.size}</td>
              <td><button class="btn btn-ghost btn-xs">download</button></td>
            </tr>
            {/each}
          {:else}
            {@const docs = [
              { icon: '📄', name: 'Business Permit Application Form', ext: '.pdf', date: '2025-08-15', size: '782 KB' },
              { icon: '🏢', name: 'Building Permit Guidelines', ext: '.pdf', date: '2025-08-12', size: '2.1 MB' },
              { icon: '📈', name: 'Zoning Clearance Application', ext: '.pdf', date: '2025-08-10', size: '550 KB' },
              { icon: '🔥', name: 'Fire Safety Certificate Checklist', ext: '.docx', date: '2025-07-25', size: '128 KB' },
              { icon: '🍃', name: 'Environmental Compliance Form', ext: '.pdf', date: '2025-07-22', size: '930 KB' },
              { icon: '💰', name: 'Real Property Tax Declaration Form', ext: '.pdf', date: '2025-07-20', size: '480 KB' },
              { icon: '📋', name: 'Community Tax Certificate Info', ext: '.docx', date: '2025-06-30', size: '95 KB' },
              { icon: '🏥', name: 'Sanitary Permit Requirements', ext: '.pdf', date: '2025-06-15', size: '340 KB' }
            ]}
            {#each docs as d}
            <tr>
              <td><span class="mr-2">{d.icon}</span> {d.name} (Sample){d.ext}</td>
              <td>{d.date}</td>
              <td>{d.size}</td>
              <td><button class="btn btn-ghost btn-xs">download</button></td>
            </tr>
            {/each}
          {/if}
        </tbody>
      </table>
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
