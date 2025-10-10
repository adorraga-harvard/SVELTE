<script lang="ts">
  import Comp_PREP from './Components/Comp_PREP.svelte';
  import Comp_ACQ from './Components/Comp_ACQ.svelte';
  import Comp_PHILGEPS from './Components/Comp_PHILGEPS.svelte';
  import Comp_Watchdog from "./Components/Comp_Watchdog.svelte";
  import Comp_FOI from "./Components/Comp_FOI.svelte";
  import Comp_Privacy from "./Components/Comp_Privacy.svelte";
  import Comp_RolesDetail from "./Components/Comp_RolesDetail.svelte";

  let activeModal: string | null = null;

  const domains = [
    { title: 'Roads & Bridges', agencies: ['DPWH'], discussion: 'Major road networks, bridges, and flyovers. Example: The Skyway or EDSA Flyover.' },
    { title: 'Mass Transit, Airports & Railways', agencies: ['DOTr'], discussion: 'Airports, railway systems, and bus terminals. Example: NAIA, MRT, LRT.' },
    { title: 'Digital Connectivity', agencies: ['DICT'], discussion: 'Fiber-optic networks, internet access points, and government IT hubs. Example: GovNet fiber backbone.' },
    { title: 'Energy & Power', agencies: ['DOE'], discussion: 'Power plants, renewable energy projects, and transmission lines. Example: Angat Hydropower Plant.' },
    { title: 'Water Supply & Sanitation', agencies: ['LWUA', 'LGUs'], discussion: 'Water treatment, pipelines, and sanitation systems. Example: Metro Manila Water Supply pipelines.' },
    { title: 'Education Facilities', agencies: ['DepEd'], discussion: 'Schools, libraries, and learning centers. Example: Philippine Science High School campuses.' },
    { title: 'Health Infrastructure', agencies: ['DOH'], discussion: 'Hospitals, clinics, and healthcare centers. Example: Philippine General Hospital modernization.' }
  ];

  const processPhases = [
    {
      title: 'Preparation',
      description: 'Agencies identify project needs, craft plans, and seek funding clearance from oversight bodies.',
      steps: ['Project Plan Submission', 'Project Approval']
    },
    {
      title: 'Acquisition',
      description: 'Projects enter public bidding through systems like PhilGEPS, ensuring fair and transparent contractor selection.',
      steps: ['Bidding', 'Awarding']
    },
    {
      title: 'Execution',
      description: 'Construction or rollout begins. Agencies coordinate contractors, track progress, and ensure timely delivery.',
      steps: ['Implementation', 'Payments', 'Monitoring']
    },
    {
      title: 'Evaluation',
      description: 'Completed projects are reviewed by oversight agencies like COA for legal and financial compliance.',
      steps: ['Audit']
    }
  ];

  const workflowEntities = [
    { entity: 'Procuring Entity (Agency / LGU / Department)', function: 'The government body needing goods or services', role: 'Proponent / Implementer' },
    { entity: 'Bids and Awards Committee (BAC)', function: 'Manages the bidding — from posting to award', role: 'Mover (Approver / Awarder)' },
    { entity: 'PhilGEPS', function: 'Provides the e-platform and official records', role: 'Auditor / System Registrar' },
    { entity: 'COA (Commission on Audit)', function: 'Audits all disbursements and awards', role: 'Auditor (External)' },
    { entity: 'End-User / Project Manager', function: 'Creates and submits the initial project or request', role: 'Submitter' },
    { entity: 'Supplier / Bidder', function: 'Participates in the bidding', role: 'Bidder Persona' }
  ];

  const workflowStages = [
    ['Project is created / request for procurement submitted', 'Submitter (Implementing Unit)', 'This creates the base record.'],
    ['Posting of Invitation to Bid', 'Mover (BAC Secretariat)', 'May require approval from HOPE (Head of Procuring Entity).'],
    ['Bid submission period', 'Bidders', 'No approval here — just open competition.'],
    ['Bid evaluation', 'Mover (BAC Technical Group)', 'They recommend the Lowest Calculated Bid (LCB).'],
    ['Approval of BAC Resolution', 'Mover (HOPE or Authorized Approver)', 'This is the “approval” step.'],
    ['Issuance of Notice of Award (NOA)', 'Mover (BAC / Approver)', 'The award step. Usually signed by HOPE.'],
    ['Auditing / Post-Validation', 'Auditor (PhilGEPS / COA)', 'Ensures legality, compliance, and transparency.']
  ];
</script>

<div class="text-base-content bg-base-50 min-h-screen">
  <!-- DOMAINS -->
  <section class="max-w-6xl mx-auto p-4 pt-0 mt-0">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-2 mt-0">
      Key Infrastructure Domains & Agencies
    </h2>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {#each domains as { title, agencies, discussion }}
        <div
          class="rounded-xl p-2 shadow-lg bg-base-200 hover:shadow-xl transition-transform hover:-translate-y-1 border-l-4 border-accent"
        >
          <h3 class="text-xl font-extrabold text-primary mb-2">{title}</h3>
          <p class="text-xs opacity-80">{discussion}</p>
          <div class="list-disc ml-5 space-y-1 mb-1">
            {#each agencies as agency}
              <div
                class="text-2xl font-extrabold"
                style="text-shadow:2px 2px 6px lime"
              >
                {agency}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>


  <!-- SECTION 1: ENTITIES / ROLES -->
  <section class="max-w-6xl mx-auto p-6 mt-8">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-1">
      🧩 Entities / Roles in the Government Procurement Workflow
    </h2>
    <p class="text-accent italic opacity-80 mb-4">
      💡 <span class="cursor-pointer hover:underline" on:click={() => activeModal = 'ROLES'}>Who are involved</span>
    </p>

    <div class="overflow-x-auto bg-base-200 rounded-xl shadow-lg">
      <table class="table table-zebra text-sm">
        <thead class="bg-base-300 text-base-content/80">
          <tr>
            <th>Entity</th>
            <th>Function</th>
            <th>Possible System Role</th>
          </tr>
        </thead>
        <tbody>
          {#each workflowEntities as { entity, function: fn, role }}
            <tr>
              <td class="font-semibold">{entity}</td>
              <td>{fn}</td>
              <td class="text-primary font-medium">{role}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- SECTION 2: PROCUREMENT LIFECYCLE -->
  <section class="max-w-6xl mx-auto p-6 mt-8">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-1">
      Procurement Lifecycle: From Idea to Reality
    </h2>
    <p class="text-accent italic opacity-80 mb-4">💡 What happens</p>

    <div class="space-y-3">
      {#each processPhases as phase, index}
        <div class="flex gap-4 items-start">
          <div class="w-10 text-5xl font-bold text-primary drop-shadow-[2px_2px_6px_lime] flex-shrink-0">{index + 1}</div>
          <div class="bg-base-200 rounded-xl shadow-md p-3 hover:shadow-xl transition flex-1">
            <h3 class="text-xl font-semibold text-primary mb-1 cursor-pointer"
                on:click={() => {
                  if (phase.title === 'Preparation') activeModal = 'PREP';
                  else if (phase.title === 'Acquisition') activeModal = 'ACQ';
                }}>
              {phase.title}
            </h3>
            <p class="mb-2 text-sm opacity-80">{phase.description}</p>
            <div class="flex flex-wrap gap-2">
              {#each phase.steps as step}
                {#if step === 'Bidding'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline" on:click={() => activeModal = 'PHILGEPS'}>{step}</span>
                {:else if step === 'Project Plan Submission' || step === 'Project Approval'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline" on:click={() => activeModal = 'PREP'}>{step}</span>
                {:else if step === 'Awarding'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline" on:click={() => activeModal = 'ACQ'}>{step}</span>
                {:else}
                  <span class="badge badge-accent badge-outline">{step}</span>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- SECTION 3: STEP-BY-STEP FLOW -->
  <section class="max-w-6xl mx-auto p-6 mt-10">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-1">
      ⚙️ Step-by-Step Flow and Authority
    </h2>
    <p class="text-accent italic opacity-80 mb-4">💡 Who does what</p>

    <div class="overflow-x-auto bg-base-200 rounded-xl shadow-lg">
      <table class="table text-sm">
        <thead class="bg-base-300 text-base-content/80">
          <tr>
            <th class="w-1/12 text-center">#</th>
            <th class="w-4/12">Stage / Action</th>
            <th class="w-3/12">Responsible Role</th>
            <th class="w-4/12">Notes</th>
          </tr>
        </thead>
        <tbody>
          {#each workflowStages as [action, role, note], i}
            <tr class="hover:bg-base-100 transition-colors">
              <td class="text-center text-2xl text-accent font-bold">{i + 1}</td>
              <td class="font-semibold">{action}</td>
              <td class="text-primary">{role}</td>
              <td class="text-sm opacity-80">{note}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- SECTION 4: DIFFERENCES -->
  <section class="max-w-6xl mx-auto p-6 mt-10 mb-16">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-1">
      Key Differences Between Current System and Procurement 3.0
    </h2>
    <p class="text-accent italic opacity-80 mb-4">💡 Why it matters</p>

    <ul class="list-disc ml-6 space-y-2 text-sm leading-relaxed">
      <li><strong>Transparency:</strong> Procurement 3.0 logs every milestone on a verifiable ledger, unlike opaque current processes.</li>
      <li><strong>Citizen Oversight:</strong> Citizens can track progress in real-time without FOI requests.</li>
      <li><strong>Immutable Audit Trail:</strong> Blockchain ensures all approvals and status updates are tamper-proof.</li>
      <li><strong>Fair Competition:</strong> Digital bidding eliminates favoritism and ensures equal access to information.</li>
      <li><strong>Focused Oversight Roles:</strong> Only specific agencies handle approvals, payments, or audits.</li>
    </ul>
  </section>

  <!-- TRANSPARENCY & RIGHTS -->
  <section class="max-w-6xl mx-auto p-6 mt-8 mb-10">
    <ul class="ml-6 space-y-2">
      <li><strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'WATCHDOG'}>Digital Watchdog</strong>: Logs mission-critical milestones on a verifiable ledger.</li>
      <li><strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'FOI'}>Freedom of Information (FOI)</strong>: Ensuring transparency across agencies.</li>
      <li><strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'PRIVACY'}>Data Privacy & Security</strong>: Balancing openness with protection of personal and strategic data.</li>
    </ul>
  </section>

  <!-- MODALS -->
  <Comp_PREP show={activeModal === 'PREP'} onclose={() => activeModal = null} />
  <Comp_ACQ show={activeModal === 'ACQ'} onclose={() => activeModal = null} />
  <Comp_PHILGEPS show={activeModal === 'PHILGEPS'} onclose={() => activeModal = null} />
  <Comp_Watchdog show={activeModal === 'WATCHDOG'} onclose={() => activeModal = null} />
  <Comp_FOI show={activeModal === 'FOI'} onclose={() => activeModal = null} />
  <Comp_Privacy show={activeModal === 'PRIVACY'} onclose={() => activeModal = null} />
  <Comp_RolesDetail show={activeModal === 'ROLES'} onclose={() => activeModal = null} />
</div>
