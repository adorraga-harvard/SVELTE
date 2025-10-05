/*
 * project_Endpoints.ts
 * =================================================================
 * The definitive library of Svelte markup templates. This version
 * features fully self-contained, monolithic templates for simplicity and robustness,
 * ensuring the Engineer script works without error.
 *
 * Finalized: Friday, September 19, 2025, 1:14 AM, City of Manila
 * =================================================================
 */

/*
 * ===================================================================================
 * DEVELOPER NOTE: DATA SHAPES FOR THE ENGINEER
 * ===================================================================================
 * The Engineer script must provide data matching these structures.
 *
 * `data.tableRecords`: Array of objects for the `table` template.
 * `data.kpiCards`: Array of objects for the `kpi-deck` template.
 * `data.activityItems`: Array of objects for the `activity-feed` template.
 * `data.faqItems`: Array of Q&A objects for the `accordion` template.
 * `data.checklistItems`: Array of task objects for the `checklist` template.
 * `data.totalRecords`: Number for pagination display in the `table` template.
 * ===================================================================================
 */

export const endpointTemplates = {

// --- CORE LAYOUTS ---

dashboard: `
<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">{data.pageData?.title || 'Dashboard'}</h1>
    <p class="project-card-description">{data.pageData?.description || 'Your central hub for services and notifications.'}</p>
  </div>
  
  <div class="project-kpi-deck">
    {#if data.kpiCards && data.kpiCards.length > 0}
      {#each data.kpiCards as kpi}
      <div class="project-kpi-card">
        <div class="flex items-start justify-between">
          <div><p class="project-kpi-title">{kpi.title}</p><p class="project-kpi-value">{kpi.value}</p></div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-square btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"><li><a>View Details</a></li><li><a>Export</a></li></ul>
          </div>
        </div>
        <div class="text-xs text-base-content/60 mt-2"><span class="badge badge-xs {kpi.change > 0 ? 'badge-success' : 'badge-error'}">{kpi.change > 0 ? '▲' : '▼'} {kpi.change > 0 ? kpi.change : kpi.change * -1}%</span> vs last month</div>
      </div>
      {/each}
    {:else}
      <div class="text-center p-8 text-base-content/50 col-span-full">No KPI data available.</div>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 project-card">
      <div class="project-card-body">
        <h2 class="card-title">Key Metrics Over Time</h2>
        <div class="project-chart-container">
          <svg class="w-48 h-48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 17L8.4 9.5L12.75 14.5L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80" /><path d="M15 4H21V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80"/></svg>
        </div>
      </div>
    </div>
    <div class="project-card">
      <div class="project-card-body">
        <h2 class="card-title">Recent Activity</h2>
        <div class="mt-4">
          <ul class="project-activity-feed">
            {#if data.activityItems && data.activityItems.length > 0}
              {#each data.activityItems as item}
              <li class="project-activity-item">
                <div class="project-activity-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path></svg></div>
                <div>
                  <div class="text-sm project-prose" style="max-width: none;">{@html item.description}</div>
                  <p class="text-xs text-base-content/60">{item.time}</p>
                </div>
              </li>
              {/each}
            {:else}
              <div class="text-center p-8 text-base-content/50">No recent activity.</div>
            {/if}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`,


    // --- EXTRA LAYOUTS ---

filter: `
<div class="project-card">
  <div class="project-card-body space-y-4">
    <h2 class="card-title">Filter Records</h2>
    <form class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="label"><span class="label-text">Search</span></label>
        <input type="text" placeholder="Type keyword..." class="input input-bordered w-full" bind:value={data.filter?.search} />
      </div>
      <div>
        <label class="label"><span class="label-text">Category</span></label>
        <select class="select select-bordered w-full" bind:value={data.filter?.category}>
          <option disabled selected>Choose category</option>
          {#each data.filter?.categories || [] as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="label"><span class="label-text">Status</span></label>
        <select class="select select-bordered w-full" bind:value={data.filter?.status}>
          <option disabled selected>Choose status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Archived</option>
        </select>
      </div>
    </form>
    <div class="flex justify-end gap-2">
      <button class="btn btn-sm btn-outline">Reset</button>
      <button class="btn btn-sm btn-primary">Apply</button>
    </div>
  </div>
</div>
`,

download: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Download Center</h2>
    <ul class="divide-y divide-base-200">
      {#if data.files && data.files.length > 0}
        {#each data.files as file}
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium">{file.name}</p>
              <p class="text-xs text-base-content/60">{file.type} • {file.size} • {file.date}</p>
            </div>
            <a class="btn btn-sm btn-outline" href={file.url} download>
              Download
            </a>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No downloadable files available.</div>
      {/if}
    </ul>
  </div>
</div>
`,

faq: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Frequently Asked Questions</h2>
    <div class="join join-vertical w-full">
      {#if data.faqItems && data.faqItems.length > 0}
        {#each data.faqItems as faq, i}
          <div class="collapse collapse-arrow join-item border border-base-200">
            <input type="radio" name="faq-accordion" {checked: i === 0} />
            <div class="collapse-title text-md font-medium">{faq.question}</div>
            <div class="collapse-content project-prose">
              <p>{@html faq.answer}</p>
            </div>
          </div>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No FAQs published yet.</div>
      {/if}
    </div>
  </div>
</div>
`,


// --- TRANSACTIONAL / RECEIPT ---

receipt: `
<div class="project-card">
  <div class="project-card-body text-center space-y-4">
    <h2 class="text-2xl font-bold">Official Receipt</h2>
    <p class="text-sm text-base-content/60">Payment confirmation for your transaction</p>
    <div class="divider"></div>

    <div class="space-y-2 text-left max-w-md mx-auto">
      <p><span class="font-semibold">Transaction ID:</span> {data.receipt?.id}</p>
      <p><span class="font-semibold">Date:</span> {data.receipt?.date}</p>
      <p><span class="font-semibold">Payer:</span> {data.receipt?.payer}</p>
      <p><span class="font-semibold">Amount:</span> ₱{data.receipt?.amount}</p>
      <p><span class="font-semibold">Status:</span> <span class="badge badge-success">{data.receipt?.status}</span></p>
    </div>

    <div class="divider"></div>
    <button class="btn btn-primary">Download PDF</button>
  </div>
</div>
`,

// --- ACTIVITY FEED ---

feed: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Live Feed</h2>
    <ul class="project-activity-feed">
      {#if data.feedItems && data.feedItems.length > 0}
        {#each data.feedItems as item}
          <li class="project-activity-item">
            <div class="project-activity-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
            </div>
            <div>
              <p class="text-sm">{@html item.message}</p>
              <p class="text-xs text-base-content/60">{item.time}</p>
            </div>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No feed items yet.</div>
      {/if}
    </ul>
  </div>
</div>
`,

// --- TIMELINE VIEW ---

timeline: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="card-title">Timeline</h2>
    <div class="relative border-l-2 border-base-200 ml-4">
      {#if data.timeline && data.timeline.length > 0}
        {#each data.timeline as step}
          <div class="mb-8 ml-4">
            <div class="absolute w-3 h-3 bg-primary rounded-full -left-[7px] mt-1.5"></div>
            <h3 class="font-semibold">{step.title}</h3>
            <p class="text-sm text-base-content/70">{step.description}</p>
            <p class="text-xs text-base-content/50">{step.time}</p>
          </div>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No timeline data available.</div>
      {/if}
    </div>
  </div>
</div>
`,

// --- ANALYTICS / DATA VISUALIZATION ---

chart: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{data.pageData?.title || 'Analytics Chart'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Visual representation of your data.'}</p>
    <div class="project-card-divider"></div>
    <div class="flex justify-center items-center h-64">
      {#if data.chartData}
        <!-- Placeholder chart, replace with real chart component if available -->
        <svg class="w-48 h-48 text-primary" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" class="opacity-30" />
          <path d="M12 2 A10 10 0 0 1 22 12 L12 12 Z" fill="currentColor" class="opacity-80" />
        </svg>
      {:else}
        <div class="text-center p-8 text-base-content/50">No chart data available.</div>
      {/if}
    </div>
  </div>
</div>
`,

list: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{data.pageData?.title || 'Item List'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Simple list view of records.'}</p>
    <div class="project-card-divider"></div>
    <ul class="divide-y divide-base-200">
      {#if data.listItems && data.listItems.length > 0}
        {#each data.listItems as item}
          <li class="py-3 flex justify-between items-center">
            <div>
              <p class="font-medium">{item.title}</p>
              <p class="text-xs text-base-content/60">{item.subtitle}</p>
            </div>
            <button class="btn btn-xs btn-outline">View</button>
          </li>
        {/each}
      {:else}
        <div class="text-center p-8 text-base-content/50">No items to display.</div>
      {/if}
    </ul>
  </div>
</div>
`,

report: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{data.pageData?.title || 'Generated Report'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Structured report summary.'}</p>
    <div class="project-card-divider"></div>
    {#if data.report}
      <div class="project-prose max-w-none">
        <h3 class="font-bold">{data.report.title}</h3>
        <p class="text-sm text-base-content/60">{data.report.date}</p>
        <div class="divider"></div>
        <p>{@html data.report.body}</p>
      </div>
      <div class="mt-4 flex justify-end">
        <button class="btn btn-sm btn-primary">Export PDF</button>
      </div>
    {:else}
      <div class="text-center p-8 text-base-content/50">No report data available.</div>
    {/if}
  </div>
</div>
`,
  'article': `
<section class="prose max-w-none space-y-4">
  <h2 class="text-2xl font-bold mb-2">{randomName}'s Report</h2>
  <p>
    This article, prepared by <strong>{randomDept}</strong>, 
    provides a detailed review of the ongoing project 
    at <em>{randomLocation}</em>.
  </p>
  <p>
    Current status: 
    <span class="badge {randomStatus.badge}">{randomStatus.label}</span>
  </p>
  <p>
    Latest task update: {randomTask} ({R_DATE()} {R_TIME()})
  </p>
</section>
  `,

'open-data': `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{data.pageData?.title || 'Open Data Catalog'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Browse and download raw datasets.'}</p>
    <div class="project-card-divider"></div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr><th>Dataset</th><th>Format</th><th>Last Updated</th><th></th></tr>
        </thead>
        <tbody>
          {#if data.datasets && data.datasets.length > 0}
            {#each data.datasets as ds}
              <tr>
                <td>{ds.name}</td>
                <td>{ds.format}</td>
                <td>{ds.updated}</td>
                <td><a class="btn btn-xs btn-outline" href={ds.url} download>Download</a></td>
              </tr>
            {/each}
          {:else}
            <tr><td colspan="4" class="text-center p-8 text-base-content/50">No datasets published yet.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
`,


// --- REMINDER / ALERT BOX ---

reminder: `
<div class="alert alert-info shadow-lg">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 6v.01M12 20h.01M20 12h.01M4 12h.01M12 4h.01M12 20h.01M20 12h.01M4 12h.01" />
  </svg>
  <div>
    <h3 class="font-bold">{data.reminder?.title || 'Reminder'}</h3>
    <div class="text-xs">{data.reminder?.message || 'You have an upcoming schedule or task.'}</div>
  </div>
  <button class="btn btn-sm btn-ghost">Dismiss</button>
</div>
`,



// --------------------------------------------------------

calendar: `
<div class="project-card">
  <div class="project-card-body">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 class="project-card-title">{data.pageData?.title || 'Event Calendar'}</h2>
        <p class="project-card-description">{data.pageData?.description || 'View and manage scheduled events.'}</p>
      </div>
      <button class="btn btn-primary btn-sm normal-case w-full sm:w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Schedule New Event
      </button>
    </div>
    <div class="project-card-divider"></div>
    <div class="flex items-center justify-between">
        <div class="join">
            <button class="join-item btn btn-sm">«</button>
            <button class="join-item btn btn-sm">»</button>
        </div>
        <h3 class="text-xl font-bold">September 2025</h3>
        <div class="join">
            <button class="join-item btn btn-sm btn-active">Month</button>
            <button class="join-item btn btn-sm">Week</button>
            <button class="join-item btn btn-sm">Day</button>
        </div>
    </div>
    <div class="grid grid-cols-7 gap-2 text-center text-sm mt-4">
      <div class="font-bold text-base-content/50">Sun</div><div class="font-bold text-base-content/50">Mon</div><div class="font-bold text-base-content/50">Tue</div><div class="font-bold text-base-content/50">Wed</div><div class="font-bold text-base-content/50">Thu</div><div class="font-bold text-base-content/50">Fri</div><div class="font-bold text-base-content/50">Sat</div>
      
      <div class="p-2 border rounded-lg text-base-content/30">31</div>
      <div class="p-2 border rounded-lg">1</div><div class="p-2 border rounded-lg">2</div><div class="p-2 border rounded-lg">3</div>
      <div class="p-2 border rounded-lg bg-accent/20">4</div>
      <div class="p-2 border rounded-lg">5</div><div class="p-2 border rounded-lg">6</div>
      <div class="p-2 border rounded-lg">7</div><div class="p-2 border rounded-lg">8</div><div class="p-2 border rounded-lg">9</div><div class="p-2 border rounded-lg">10</div><div class="p-2 border rounded-lg">11</div><div class="p-2 border rounded-lg">12</div><div class="p-2 border rounded-lg">13</div>
      <div class="p-2 border rounded-lg">14</div><div class="p-2 border rounded-lg">15</div><div class="p-2 border rounded-lg">16</div>
      <div class="p-2 border rounded-lg">17</div><div class="p-2 border rounded-lg ring ring-primary">18</div>
      <div class="p-2 border rounded-lg bg-secondary/20 tooltip" data-tip="Barangay Fiesta">19</div>
      <div class="p-2 border rounded-lg">20</div>
      <div class="p-2 border rounded-lg">21</div><div class="p-2 border rounded-lg">22</div><div class="p-2 border rounded-lg">23</div><div class="p-2 border rounded-lg">24</div><div class="p-2 border rounded-lg">25</div><div class="p-2 border rounded-lg">26</div><div class="p-2 border rounded-lg">27</div>
    </div>
  </div>
</div>
`,


// --------------------------------------------------------

profile: `
<div class="project-card">
  <div class="project-card-body">
    <div class="flex items-center space-x-6">
      <div class="avatar online">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="/avatars/stock-{R_NUM(1, 8)}.jpg" alt="User Profile" />
        </div>
      </div>
      <div>
        <h1 class="text-2xl font-bold">{randomName}</h1>
        <p class="text-base-content/70">Citizen ID: {R_NUM(1000, 9999)}-{R_NUM(1000, 9999)}</p>
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
            {#if data.tableRecords && data.tableRecords.length > 0}
              {#each data.tableRecords as record}
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
`,

// --------------------------------------------------------

'toggle-view': `
<div>
  <div class="flex justify-between items-center mb-4">
    <div>
      <h2 class="project-card-title">{data.pageData?.title || 'Records'}</h2>
      <p class="project-card-description">{data.pageData?.description || 'Toggle between table and grid views.'}</p>
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
                        {#if data.tableRecords && data.tableRecords.length > 0}
                            {#each data.tableRecords as record}
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
      {#if data.tableRecords && data.tableRecords.length > 0}
        {#each data.tableRecords as record}
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
`,

// --------------------------------------------------------

// --- DATA DISPLAY (STANDALONE PRIMITIVES) ---

'kpi-deck': `
<div class="project-kpi-deck">
  {#if data.kpiCards && data.kpiCards.length > 0}
    {#each data.kpiCards as kpi}
    <div class="project-kpi-card">
        <div class="flex items-start justify-between">
          <div>
            <p class="project-kpi-title">{kpi.title}</p>
            <p class="project-kpi-value">{kpi.value}</p>
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-square btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"><li><a>View Details</a></li><li><a>Export</a></li></ul>
          </div>
        </div>
        <div class="text-xs text-base-content/60 mt-2">
          <span class="badge badge-xs {kpi.change > 0 ? 'badge-success' : 'badge-error'}">{kpi.change > 0 ? '▲' : '▼'} {kpi.change > 0 ? kpi.change : kpi.change * -1}%</span> vs last month
        </div>
    </div>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50 col-span-full">No KPI data available.</div>
  {/if}
</div>
`,

// --------------------------------------------------------

'activity-feed': `
<ul class="project-activity-feed">
  {#if data.activityItems && data.activityItems.length > 0}
    {#each data.activityItems as item}
    <li class="project-activity-item">
      <div class="project-activity-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path></svg>
      </div>
      <div>
        <div class="text-sm project-prose" style="max-width: none;">{@html item.description}</div>
        <p class="text-xs text-base-content/60">{item.time}</p>
      </div>
    </li>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50">No recent activity.</div>
  {/if}
</ul>
`,

// --------------------------------------------------------

table: `
<div class="project-card">
  <div class="project-card-body">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h2 class="project-card-title">{data.pageData?.title || 'Data Records'}</h2>
        <p class="project-card-description">{data.pageData?.description || 'Manage and review all relevant records.'}</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-outline btn-sm normal-case">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M6 8h12M9 12h6"></path></svg>
            Filters
          </label>
          <div tabindex="0" class="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-72 mt-2">
            <div class="form-control">
              <label class="label"><span class="label-text">Filter by Status</span></label>
              <select class="select select-bordered select-sm"><option>Any Status</option><option>Approved</option><option>Pending</option><option>Rejected</option></select>
            </div>
            <button class="btn btn-primary btn-sm mt-4">Apply Filters</button>
          </div>
        </div>
        <button class="btn btn-primary btn-sm normal-case">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add New
        </button>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Control No.</th><th>Applicant / Business</th><th>Date Filed</th><th>Status</th><th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if data.tableRecords && data.tableRecords.length > 0}
            {#each data.tableRecords as record}
            <tr class="hover">
              <td><span class="font-mono text-primary font-semibold">{record.controlNo}</span></td>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar"><div class="mask mask-squircle w-12 h-12"><img src={record.applicant.avatar} alt="Avatar" /></div></div>
                  <div>
                    <div class="font-bold">{record.applicant.name}</div>
                    <div class="text-sm opacity-50">{record.applicant.location}</div>
                  </div>
                </div>
              </td>
              <td>{record.dateFiled}</td>
              <td><span class="badge {record.status.badge} font-medium">{record.status.label}</span></td>
              <td class="text-right">
                <div class="dropdown dropdown-left">
                  <label tabindex="0" class="btn btn-ghost btn-circle btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"><li><a>View</a></li><li><a>Edit</a></li></ul>
                </div>
              </td>
            </tr>
            {/each}
          {:else}
            <tr><td colspan="5" class="text-center p-8 text-base-content/50">No records found.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm">
      <div class="text-base-content/70">
        Showing <span class="font-bold">1-10</span> of <span class="font-bold">{data.totalRecords || 0}</span> results
      </div>
      <div class="join">
        <button class="join-item btn btn-sm">«</button><button class="join-item btn btn-sm btn-active">1</button><button class="join-item btn btn-sm">»</button>
      </div>
    </div>
  </div>
</div>
`,

// --------------------------------------------------------

// --- DATA VISUALIZATION ---

'pie-chart': `
<div class="project-chart-container">
    <svg class="w-48 h-48" viewBox="0 0 20 20"><path fill="currentColor" class="text-primary/50" d="M10 2.5a7.5 7.5 0 0 0-7.45 6.55l5.24.95a2.5 2.5 0 0 1 2.21-2.21l.95-5.24A7.5 7.5 0 0 0 10 2.5Z"></path><path fill="currentColor" class="text-secondary/50" d="M10.9 9.81a2.5 2.5 0 0 0-1.09.28l-4.48 2.59a7.5 7.5 0 0 0 4.48 4.48l2.59-4.48a2.5 2.5 0 0 0 .28-1.09l1.22-5.78a7.53 7.53 0 0 0-3.01 4.07Z"></path><path fill="currentColor" class="text-accent/50" d="M14.07 3.93a7.5 7.5 0 0 0-4.07 3.01l5.78 1.22a2.5 2.5 0 0 0 1.09-.28l-2.8-4Z"></path></svg>
</div>
`,

// --------------------------------------------------------

'bar-chart': `
<div class="project-chart-container">
    <svg class="w-48 h-48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5C4 20.3284 4.67157 21 5.5 21H19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-base-content/20"/><rect x="5" y="14" width="4" height="5" rx="1" fill="currentColor" class="text-primary/50" /><rect x="10" y="8" width="4" height="11" rx="1" fill="currentColor" class="text-secondary/50" /><rect x="15" y="4" width="4" height="15" rx="1" fill="currentColor" class="text-accent/50" /></svg>
</div>
`,

// --------------------------------------------------------

'line-chart': `
<div class="project-chart-container">
    <svg class="w-48 h-48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 17L8.4 9.5L12.75 14.5L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80" /><path d="M15 4H21V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary/80"/></svg>
</div>
`,

// --------------------------------------------------------

// --- FORMS & UTILITY ---

form: `
<div class="project-card">
    <div class="project-card-body">
        <div>
            <h2 class="project-card-title">{data.pageData?.title || 'Data Submission Form'}</h2>
            <p class="project-card-description">{data.pageData?.description || 'Please provide the necessary information below.'}</p>
        </div>
        <div class="project-card-divider"></div>
        <form method="POST" action="?/submit" class="space-y-4">
          <div class="form-control">
            <label class="label" for="fullName"><span class="label-text">Full Name</span></label>
            <input type="text" id="fullName" value="{randomName}" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label" for="department"><span class="label-text">Concerned Department</span></label>
            <select id="department" class="select select-bordered"><option>{randomDept}</option></select>
          </div>
          <div class="form-control">
            <label class="label" for="reason"><span class="label-text">Reason for Request</span></label>
            <textarea id="reason" class="textarea textarea-bordered h-24" placeholder="Please state your reason..."></textarea>
          </div>
          <div class="project-card-actions">
            <button class="btn btn-ghost">Cancel</button>
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
    </div>
</div>
`,

// --------------------------------------------------------

accordion: `
<div class="space-y-2">
  {#if data.faqItems && data.faqItems.length > 0}
    {#each data.faqItems as item, i}
    <div class="collapse collapse-plus bg-base-200">
      <input type="radio" name="faq-accordion" checked={i === 0 ? 'checked' : null} /> 
      <div class="collapse-title text-xl font-medium">{item.question}</div>
      <div class="collapse-content"><div class="project-prose">{@html item.answer}</div></div>
    </div>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50">No FAQ items available.</div>
  {/if}
</div>
`,

// --------------------------------------------------------

checklist: `
<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{data.pageData?.title || 'Process Checklist'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Follow these steps to complete your request.'}</p>
    <ul class="steps steps-vertical lg:steps-horizontal mt-6">
      {#if data.checklistItems && data.checklistItems.length > 0}
        {#each data.checklistItems as item}
          <li data-content={item.content} class="step {item.statusClass}">{item.taskName}</li>
        {/each}
      {:else}
        <li class="step">Checklist not available.</li>
      {/if}
    </ul>
  </div>
</div>
`,

// --------------------------------------------------------

info: `
<div class="project-card">
  <div class="project-card-body">
    <div class="project-prose">
      <h1>{data.pageData?.title || 'Information Hub'}</h1>
      <p>{data.pageData?.description || 'This document provides key information and guidelines.'}</p>
    </div>
  </div>
</div>
`,

// --------------------------------------------------------

upload: `
<div class="project-card">
  <div class="project-card-body items-center text-center">
    <h2 class="project-card-title">{data.pageData?.title || 'File Upload'}</h2>
    <p class="project-card-description">{data.pageData?.description || 'Submit your documents for processing.'}</p>
    <div class="w-full max-w-md p-8 mt-4 border-2 border-dashed border-base-300 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      <p class="mt-4 font-semibold">Drag & drop files here</p>
      <p class="text-sm text-base-content/60">PDF, JPG, PNG up to 10MB</p>
      <button class="btn btn-primary btn-sm mt-4">Or Click to Browse</button>
    </div>
  </div>
</div>
`,

// --------------------------------------------------------

search: `
<div class="form-control">
  <div class="input-group">
    <input type="text" placeholder="Search for a topic or question..." class="input input-bordered w-full" />
    <button class="btn btn-square btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
`,

// --------------------------------------------------------

chat: `
<div class="project-card h-[36rem] flex flex-col">
  <div class="p-4 border-b border-base-300">
      <h2 class="card-title">Live Chat Support</h2>
      <p class="text-sm">Connected with: {randomName}</p>
  </div>
  <div class="project-card-body flex-grow p-4 space-y-4 overflow-y-auto bg-base-200">
    <div class="chat chat-start">
      <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-7.jpg" /></div></div>
      <div class="chat-bubble chat-bubble-secondary">Welcome to live support!</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-user.jpg" /></div></div>
      <div class="chat-bubble chat-bubble-primary">Hello, I need assistance.</div>
    </div>
  </div>
  <div class="p-4 border-t bg-base-100"><input type="text" placeholder="Type your message..." class="input input-bordered w-full" /></div>
</div>
`,

// --------------------------------------------------------

map: `
<div class="project-card h-96">
  <div class="w-full h-full bg-base-300 rounded-2xl flex items-center justify-center text-base-content/30 text-4xl">
    🗺️ Interactive Map Placeholder
  </div>
</div>
`,

// --------------------------------------------------------
};