// project_Endpoints.ts
// Central repository of Svelte markup templates.
// [CORRECTED] This file now ONLY contains HTML markup. All script logic was moved to project.sh.

/*
 * ===================================================================================
 * DEVELOPER NOTE FOR project.sh SCRIPT (IMPORTANT!)
 * ===================================================================================
 * The templates below now expect pre-generated ARRAYS of data to be passed into the
 * component's `data` prop. Your script must generate these arrays with random data.
 * Fallback sample data is now included for when these arrays are not yet available.
 *
 * Here are the expected data structures for each refactored template:
 *
 * --- For the `table` template: `data.tableRecords` ---
 * An array of 10-50 objects, like this:
 * data.tableRecords = [
 * {
 * controlNo: "BPLS-2025-12345",
 * applicant: { name: "Juan Dela Cruz", location: "Quezon City", avatar: "/avatars/stock-1.jpg" },
 * dateFiled: "2025-09-17",
 * status: { label: "Approved", badge: "badge-success" }
 * }, ...
 * ];
 *
 * --- For the `checklist` template: `data.checklistItems` ---
 * An array of 5-15 objects, like this:
 * data.checklistItems = [
 * { taskName: "Submit Application Form", statusClass: "step-primary", content: "✓" },
 * { taskName: "Initial Document Review", statusClass: "step-primary", content: "●" },
 * { taskName: "Await Department Approval", statusClass: "", content: "⏳" }, ...
 * ];
 *
 * --- For the `forum-thread` template: `data.forumPosts` ---
 * An array of 5-15 objects, like this:
 * data.forumPosts = [
 * {
 * author: { name: "Maria Clara", avatar: "/avatars/stock-4.jpg" },
 * date: "2025-09-16",
 * content: "The new traffic scheme is causing more congestion near the City Hall."
 * }, ...
 * ];
 *
 * --- For the `chat-container` template: `data.chatMessages` ---
 * An array of 5-15 objects, like this:
 * data.chatMessages = [
 * { type: "other", author: "Support Agent", avatar: "/avatars/stock-6.jpg", time: "13:20", text: "Good afternoon! How can I help you?" },
 * { type: "user", author: "You", avatar: "/avatars/stock-user.jpg", time: "13:21", text: "Hello, I want to follow up on my permit." }, ...
 * ];
 *
 * --- For the `report` template: `data.reportLines` ---
 * An array of 10-50 objects, like this:
 * data.reportLines = [
 * { id: "4182-0", description: "Tax Payment", category: "Real Property", amount: "₱12,345.00" },
 * { id: "8873-1", description: "Permit Fee", category: "Business", amount: "₱2,500.00" }, ...
 * ];
 *
 * --- For the `document_hub` template: `data.documents` ---
 * An array of 10-50 objects, like this:
 * data.documents = [
 * {
 * icon: "📄",
 * name: "Business_Permit_Application_2025",
 * ext: ".pdf",
 * modifiedDate: "2025-08-20",
 * size: "782 KB"
 * }, ...
 * ];
 * ===================================================================================
 */
export const endpointTemplates = {
  // --- CORE TEMPLATES (Unchanged) ---
  form: `
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
`,
  dashboard: `
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
`,
  info: `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="prose max-w-none">
      <h1>{data.pageData?.title || 'Information Hub'}</h1>
      <p>{data.pageData?.description || 'This document provides key information and guidelines.'}</p>
    </div>
    <div class="alert alert-info mt-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span><b>Pro Tip:</b> {randomAlert}. For inquiries, please proceed to {randomLocation}.</span>
    </div>
    <p class="text-xs text-base-content/50 mt-4">Document last updated: {R_DATE()}</p>
  </div>
</div>
`,
  upload: `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body items-center text-center">
    <h2 class="card-title">{data.pageData?.title || 'File Upload'}</h2>
    <p>{data.pageData?.description || 'Submit your documents for processing.'}</p>
    <div class="w-full max-w-md p-8 mt-4 border-2 border-dashed border-base-300 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      <p class="mt-4 font-semibold">Drag & drop files here</p>
      <p class="text-sm text-base-content/60">PDF, JPG, PNG up to 10MB</p>
      <button class="btn btn-primary btn-sm mt-4">Or Click to Browse</button>
    </div>
    <div class="w-full max-w-md mt-4 space-y-2">
      <p class="text-sm font-semibold text-left">Uploading...</p>
      <progress class="progress progress-primary w-full" value="{R_NUM(30, 80)}" max="100"></progress>
    </div>
  </div>
</div>
`,
  map: `
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
`,
  summary: `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="card bg-base-100 shadow-lg">
        <div class="card-body text-center"><p class="font-semibold text-lg">Total Submissions</p><p class="text-4xl font-bold">{R_NUM(1000, 5000)}</p></div>
    </div>
    <div class="card bg-success text-success-content shadow-lg">
        <div class="card-body text-center"><p class="font-semibold text-lg">Approved</p><p class="text-4xl font-bold">{R_NUM(800, 4000)}</p></div>
    </div>
    <div class="card bg-warning text-warning-content shadow-lg">
        <div class="card-body text-center"><p class="font-semibold text-lg">Pending</p><p class="text-4xl font-bold">{R_NUM(100, 500)}</p></div>
    </div>
    <div class="card bg-error text-error-content shadow-lg">
        <div class="card-body text-center"><p class="font-semibold text-lg">Rejected</p><p class="text-4xl font-bold">{R_NUM(50, 200)}</p></div>
    </div>
</div>
`,
  profile: `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body items-center">
    <div class="avatar online">
      <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src="/avatars/stock-3.jpg" alt="Profile picture of {randomName}" />
      </div>
    </div>
    <h2 class="card-title mt-4">{randomName}</h2>
    <p class="text-base-content/60">{randomDept}</p>
    <div class="divider"></div>
    <div class="card-actions"><button class="btn btn-primary">Send Message</button><button class="btn btn-ghost">View Profile</button></div>
  </div>
</div>
`,
  modal: `
<div class="card w-full max-w-lg bg-base-100 shadow-xl mx-auto">
  <div class="card-body">
    <h2 class="card-title">Confirmation Required</h2>
    <p>Are you sure you want to proceed with the action for <b>{randomTask}</b>? This was requested by <b>{randomName}</b>.</p>
    <div class="modal-action">
      <label for="my-modal" class="btn btn-outline">Cancel</label>
      <label for="my-modal" class="btn btn-primary">Confirm</label>
    </div>
  </div>
</div>
`,
  calendar: `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">September 2025</h2>
    <div class="grid grid-cols-7 gap-2 text-center text-sm mt-4">
      <div class="font-bold">Sun</div><div class="font-bold">Mon</div><div class="font-bold">Tue</div><div class="font-bold">Wed</div><div class="font-bold">Thu</div><div class="font-bold">Fri</div><div class="font-bold">Sat</div>
      <div class="text-base-content/30 p-2 border rounded-lg">31</div>
      <div class="p-2 border rounded-lg">1</div><div class="p-2 border rounded-lg">2</div><div class="p-2 border rounded-lg">3</div>
      <div class="p-2 border rounded-lg tooltip" data-tip="Holiday"><div class="bg-accent text-accent-content rounded-full w-8 h-8 flex items-center justify-center mx-auto">4</div></div>
      <div class="p-2 border rounded-lg">5</div><div class="p-2 border rounded-lg">6</div>
      <div class="p-2 border rounded-lg">7</div><div class="p-2 border rounded-lg">8</div><div class="p-2 border rounded-lg">9</div><div class="p-2 border rounded-lg">10</div><div class="p-2 border rounded-lg">11</div><div class="p-2 border rounded-lg">12</div><div class="p-2 border rounded-lg">13</div>
      <div class="p-2 border rounded-lg">14</div><div class="p-2 border rounded-lg">15</div><div class="p-2 border rounded-lg">16</div>
      <div class="p-2 border rounded-lg ring ring-primary tooltip" data-tip="Today (Sept 17)"><div class="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center mx-auto">17</div></div>
      <div class="p-2 border rounded-lg">18</div>
      <div class="p-2 border rounded-lg tooltip" data-tip="{R(TASKS)}"><div class="bg-secondary text-secondary-content rounded-full w-8 h-8 flex items-center justify-center mx-auto">19</div></div>
      <div class="p-2 border rounded-lg">20</div>
    </div>
  </div>
</div>
`,
  settings: `
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
`,
  tracker: `
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
`,
  analytics: `
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
`,

  // --- REFACTORED TEMPLATES WITH EXPANDED FALLBACK DATA ---

  checklist: `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{data.pageData?.title || 'Process Checklist'}</h2>
    <p>{data.pageData?.description || 'Follow these steps to complete your request.'}</p>
    <ul class="steps steps-vertical mt-6">
      {#if data.checklistItems && data.checklistItems.length > 0}
        {#each data.checklistItems as item}
          <li data-content={item.content} class="step {item.statusClass}">{item.taskName}</li>
        {/each}
      {:else}
        <li data-content="✓" class="step step-primary">Submit Application Form</li>
        <li data-content="✓" class="step step-primary">Upload Required Documents</li>
        <li data-content="●" class="step step-primary">Initial Document Review</li>
        <li data-content="⏳" class="step">Pay Assessment Fee</li>
        <li data-content="?" class="step step-neutral">Site Inspection</li>
        <li data-content="?" class="step step-neutral">Departmental Clearances</li>
        <li data-content="?" class="step step-neutral">Fire Safety Inspection</li>
        <li data-content="?" class="step step-neutral">Final Evaluation</li>
        <li data-content="?" class="step step-neutral">Approval</li>
        <li data-content="?" class="step step-neutral">Release of Permit</li>
      {/if}
    </ul>
  </div>
</div>
`,
  table: `
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
`,
  'forum-thread': `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="flex justify-between items-center">
        <div>
            <h2 class="card-title">{data.pageData?.title || 'Discussion Forum'}</h2>
            <p>{data.pageData?.description || 'Public discussion and feedback.'}</p>
        </div>
        <button class="btn btn-primary">New Post</button>
    </div>
    <div class="divider"></div>
    <div class="space-y-4">
      {#if data.forumPosts && data.forumPosts.length > 0}
        {#each data.forumPosts as post}
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="flex items-start space-x-4">
              <div class="avatar"><div class="w-12 h-12 rounded-full"><img src={post.author.avatar} alt="Forum user avatar" /></div></div>
              <div>
                <div class="flex items-center gap-2"><p class="font-bold">{post.author.name}</p><div class="badge badge-sm badge-secondary">Citizen</div></div>
                <p class="text-xs text-base-content/60">{post.date}</p>
                <p class="mt-2">{post.content}</p>
              </div>
            </div>
          </div>
        </div>
        {/each}
      {:else}
        {@const posts = [
          { name: 'Andres Bonifacio', avatar: 5, date: '2025-09-15', content: 'The recent traffic changes near the City Hall are not working. We need a better solution.' },
          { name: 'Maria Clara', avatar: 2, date: '2025-09-14', content: 'Does anyone know when the garbage collection schedule for District 4 will be updated?' },
          { name: 'Jose Rizal', avatar: 3, date: '2025-09-13', content: 'I had a very smooth experience renewing my business permit online. Kudos to the LGU!' },
          { name: 'Gabriela Silang', avatar: 4, date: '2025-09-12', content: 'Requesting for more streetlights along Commonwealth Avenue for safety.' },
          { name: 'Juan Dela Cruz', avatar: 1, date: '2025-09-11', content: 'The new park is a great addition to our community. Thank you!' }
        ]}
        {#each posts as p}
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="flex items-start space-x-4">
              <div class="avatar"><div class="w-12 h-12 rounded-full"><img src="/avatars/stock-{p.avatar}.jpg" alt="Sample user avatar" /></div></div>
              <div>
                <div class="flex items-center gap-2"><p class="font-bold">{p.name} (Sample)</p><div class="badge badge-sm badge-secondary">Citizen</div></div>
                <p class="text-xs text-base-content/60">{p.date}</p>
                <p class="mt-2">{p.content}</p>
              </div>
            </div>
          </div>
        </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
`,
  'chat-container': `
<div class="card bg-base-100 shadow-xl h-[32rem]">
  <div class="card-body p-0 flex flex-col">
    <div class="p-4 border-b">
        <h2 class="card-title">Live Chat Support</h2>
        <p class="text-sm">Connected with: {randomName}</p>
    </div>
    <div class="flex-grow p-4 space-y-4 overflow-y-auto bg-base-200">
      {#if data.chatMessages && data.chatMessages.length > 0}
        {#each data.chatMessages as message}
          {#if message.type === 'other'}
          <div class="chat chat-start">
            <div class="chat-image avatar"><div class="w-10 rounded-full"><img src={message.avatar} alt="Support agent avatar" /></div></div>
            <div class="chat-header">{message.author} <time class="text-xs opacity-50">{message.time}</time></div>
            <div class="chat-bubble chat-bubble-secondary">{message.text}</div>
          </div>
          {:else}
          <div class="chat chat-end">
            <div class="chat-image avatar"><div class="w-10 rounded-full"><img src={message.avatar} alt="User avatar" /></div></div>
            <div class="chat-header">{message.author} <time class="text-xs opacity-50">{message.time}</time></div>
            <div class="chat-bubble chat-bubble-primary">{message.text}</div>
          </div>
          {/if}
        {/each}
      {:else}
        <div class="chat chat-start">
          <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-7.jpg" alt="Support avatar" /></div></div>
          <div class="chat-header">Support Agent <time class="text-xs opacity-50">13:30</time></div>
          <div class="chat-bubble chat-bubble-secondary">Welcome to live support! How can I assist you today? (Sample)</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-user.jpg" alt="User avatar" /></div></div>
          <div class="chat-header">You <time class="text-xs opacity-50">13:31</time></div>
          <div class="chat-bubble chat-bubble-primary">Hello, I'd like to follow up on my application with control no. BPLS-2025-00002.</div>
        </div>
        <div class="chat chat-start">
          <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-7.jpg" alt="Support avatar" /></div></div>
          <div class="chat-header">Support Agent <time class="text-xs opacity-50">13:32</time></div>
          <div class="chat-bubble chat-bubble-secondary">One moment please... I see it's currently with the Engineering Department for final review.</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-user.jpg" alt="User avatar" /></div></div>
          <div class="chat-header">You <time class="text-xs opacity-50">13:33</time></div>
          <div class="chat-bubble chat-bubble-primary">Thank you for the update!</div>
        </div>
      {/if}
    </div>
    <div class="p-4 border-t bg-base-100"><input type="text" placeholder="Type your message..." class="input input-bordered w-full" /></div>
  </div>
</div>
`,
  report: `
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
`,
  document_hub: `
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
`,
};