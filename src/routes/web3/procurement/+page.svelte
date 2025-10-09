<script lang="ts">
  import Comp_PREP from './Components/Comp_PREP.svelte';
  import Comp_ACQ from './Components/Comp_ACQ.svelte';
  import Comp_PHILGEPS from './Components/Comp_PHILGEPS.svelte';
  import Comp_Watchdog from "./Components/Comp_Watchdog.svelte";
  import Comp_FOI from "./Components/Comp_FOI.svelte";
  import Comp_Privacy from "./Components/Comp_Privacy.svelte";

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
</script>

<div class="text-base-content bg-base-50 min-h-screen">
  <!-- HEADER -->
  <section class="text-center py-4 bg-gradient-to-br from-primary to-accent text-primary-content shadow-lg">
    <h1 class="text-4xl md:text-5xl font-extrabold ">Procurement 3.0: A Transparent Philippines</h1>
    <p class="max-w-3xl mx-auto text-lg opacity-90">
      <b>A national vision powered by Web3.</b> <br>Reimagining how infrastructure is planned, funded, and delivered with transparency, efficiency, and citizen trust.
    </p>
  </section>

  <!-- DOMAINS -->
  <section class="max-w-6xl mx-auto p-4 mt-6">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-2">
      Key Infrastructure Domains & Agencies
    </h2>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {#each domains as { title, agencies, discussion }}
        <div class="rounded-xl p-2 shadow-lg bg-base-200 hover:shadow-xl transition-transform hover:-translate-y-1 border-l-4 border-accent">
          <h3 class="text-xl font-extrabold text-primary mb-2">{title}</h3>
          <p class="text-xs opacity-80">{discussion}</p>
          <div class="list-disc ml-5 space-y-1 mb-1">
            {#each agencies as agency}
              <div class="text-2xl font-extrabold" style="text-shadow:2px 2px 6px lime">{agency}</div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- PROCUREMENT LIFECYCLE -->
  <section class="max-w-6xl mx-auto p-4 mt-8">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-2">
      Procurement Lifecycle: From Idea to Reality
    </h2>
    <div class="space-y-2">
      {#each processPhases as phase, index}
        <div class="flex gap-4 items-start">
          <!-- Number -->
          <div class="w-10 text-5xl font-bold text-primary drop-shadow-[2px_2px_6px_lime] flex-shrink-0">
            {index + 1}
          </div>

          <!-- Phase Card -->
          <div class="bg-base-200 rounded-xl shadow-md p-2 hover:shadow-lg transition flex-1">
            <h3 class="text-xl font-semibold text-primary mb-1 cursor-pointer"
                on:click={() => {
                  if (phase.title === 'Preparation') activeModal = 'PREP';
                  else if (phase.title === 'Acquisition') activeModal = 'ACQ';
                }}>
              {phase.title}
            </h3>
            <p class="mb-2 text-sm opacity-80">
              {#if phase.title === 'Preparation'}
                Imagine a bustling government office where project teams identify infrastructure needs—
                like a new bridge or school. In Procurement 3.0, plans are submitted digitally, approvals are
                logged on a verifiable ledger, and citizens can track submissions and reviews transparently.
              {:else if phase.title === 'Acquisition'}
                Projects enter public bidding via PhilGEPS. Each bid published, opened, and awarded is
                immutably recorded. Contractors submit digitally, ensuring fair competition, and citizens
                can track the process in real-time.
              {:else if phase.title === 'Execution'}
                Contractors begin work, reporting progress via milestones. Agencies track implementation
                digitally, enabling real-time oversight and milestone-based payments.
              {:else if phase.title === 'Evaluation'}
                Completed projects are audited by COA. Blockchain logs preserve the full project history,
                allowing swift verification of compliance and accountability.
              {/if}
            </p>

            <!-- Steps -->
            <div class="flex flex-wrap gap-2">
              {#each phase.steps as step}
                {#if step === 'Bidding'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline"
                        on:click={() => activeModal = 'PHILGEPS'}>
                    {step}
                  </span>
                {:else if step === 'Project Plan Submission' || step === 'Project Approval'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline"
                        on:click={() => activeModal = 'PREP'}>
                    {step}
                  </span>
                {:else if step === 'Awarding'}
                  <span class="badge badge-accent badge-outline cursor-pointer hover:underline"
                        on:click={() => activeModal = 'ACQ'}>
                    {step}
                  </span>
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

  <!-- KEY DIFFERENCES -->
  <section class="max-w-6xl mx-auto p-6 mt-6 mb-16">
    <h2 class="text-2xl md:text-3xl font-bold border-b-4 border-accent pb-2 mb-4">
      Key Differences Between Current System and Procurement 3.0
    </h2>
    <ul class="list-disc ml-6 space-y-2 text-sm">
      <li><strong>Transparency:</strong> Procurement 3.0 logs every milestone on a verifiable ledger, unlike opaque current processes.</li>
      <li><strong>Citizen Oversight:</strong> Citizens can track progress in real-time without FOI requests.</li>
      <li><strong>Immutable Audit Trail:</strong> Blockchain ensures all approvals and status updates are tamper-proof.</li>
      <li><strong>Fair Competition:</strong> Digital bidding eliminates favoritism and ensures equal access to information.</li>
      <li><strong>Focused Oversight Roles:</strong> Only specific agencies handle approvals, payments, or audits.</li>
    </ul>
  </section>

  <!-- TRANSPARENCY & RIGHTS -->
  <section class="max-w-6xl mx-auto p-4 mt-6 mb-8">
    <ul class="ml-6 space-y-2">
      <li>
        <strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'WATCHDOG'}>
          Digital Watchdog
        </strong>: Logs mission-critical milestones on a verifiable ledger.
      </li>
      <li>
        <strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'FOI'}>
          Freedom of Information (FOI)
        </strong>: Ensuring transparency across agencies.
      </li>
      <li>
        <strong class="cursor-pointer text-accent hover:underline" on:click={() => activeModal = 'PRIVACY'}>
          Data Privacy & Security
        </strong>: Balancing openness with protection of personal and strategic data.
      </li>
    </ul>
  </section>

  <!-- MODALS -->
  <Comp_PREP show={activeModal === 'PREP'} onclose={() => activeModal = null} />
  <Comp_ACQ show={activeModal === 'ACQ'} onclose={() => activeModal = null} />
  <Comp_PHILGEPS show={activeModal === 'PHILGEPS'} onclose={() => activeModal = null} />

  <Comp_Watchdog show={activeModal === 'WATCHDOG'} onclose={() => activeModal = null} />
  <Comp_FOI show={activeModal === 'FOI'} onclose={() => activeModal = null} />
  <Comp_Privacy show={activeModal === 'PRIVACY'} onclose={() => activeModal = null} />
</div>
