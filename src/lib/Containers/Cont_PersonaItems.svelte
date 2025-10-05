<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Comp_InfoModal from '$lib/Components/Comp_InfoModal.svelte';
  import Comp_PersonaItemDetails from '$lib/Components/Comp_PersonaItemDetails.svelte';
  import type { Purchase_Record } from '$lib/types';
  import { loadPendingPersonaItems, graphine_notify } from '$lib/Services/Svc_DB';
  import Form_Notary from '$lib/Forms/Form_Notary.svelte';
  import Form_Insurance from '$lib/Forms/Form_Insurance.svelte';
  import Form_Clearance from '$lib/Forms/Form_Clearance.svelte';
  import Form_Registration from '$lib/Forms/Form_Registration.svelte';

  export let persona: string;

  let tasks: Purchase_Record[] = [];
  let selectedTask: Purchase_Record | null = null;
  let isLoadingTasks = true;
  let taskError: string | null = null;
  let newRecordIds = new Set<string>();
  let eventSource: EventSource;

  let toastMessage: string | null = null;
  let toastTimeout: NodeJS.Timeout;
  let computedFee: number = 0;
  let personaAction;

  // Define persona-specific configurations
  const personaConfig = {
    notary: {
      action: 'Notarize Deed Of Sale',
      form: Form_Notary,
      title: 'DEED OF ABSOLUTE SALE OF MOTOR VEHICLE',
      feeFn: (value: number) => value * 0.005 + 500,
      notifyRoles: ['insurance', 'clearance']
    },
    insurance: {
      action: 'Issue Proof of Insurance',
      form: Form_Insurance,
      title: 'CERTIFICATE OF INSURANCE',
      feeFn: (value: number) => value * 0.01 + 1000,
      notifyRoles: ['registration']
    },
    clearance: {
      action: 'Confirm Free from Legal Issues',
      form: Form_Clearance,
      title: 'CLEARANCE CERTIFICATE',
      feeFn: (value: number) => value * 0.0025 + 100,
      notifyRoles: ['registration']
    },
    registration: {
      action: 'Provide CR-OR-License Plate',
      form: Form_Registration,
      title: 'CERTIFICATE OF REGISTRATION',
      feeFn: (value: number) => value * 0.0155,
      notifyRoles: []
    }
  };

  function capitalizeFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  onMount(() => {
   fetchTasks();
    startSSE();
  });

  onDestroy(() => {
    eventSource?.close();
    clearTimeout(toastTimeout);
  });

  async function fetchTasks() {
    isLoadingTasks = true;
    taskError = null;
    try {
      const fetched = await loadPendingPersonaItems(persona);
      tasks = fetched.sort((a, b) => new Date(b.dt_purchase).getTime() - new Date(a.dt_purchase).getTime());
      personaAction = personaConfig[persona]?.action || `Process ${capitalizeFirst(persona)}`;
    } catch (e: any) {
      taskError = e.message || 'Failed to load tasks.';
    } finally {
      isLoadingTasks = false;
    }
  }

  function startSSE() {
    if (eventSource) eventSource.close();
    eventSource = new EventSource(`/api/broadcast?role=${persona}`);

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        const message = parsed.message ?? parsed;
        console.log('[SSE] Received message:', message);

        if (message?.purchase_id) {
          // Remove existing if found
          tasks = tasks.filter(t => t.purchase_id !== message.purchase_id);
          // Insert updated
          tasks = [message, ...tasks].sort((a, b) =>
            new Date(b.dt_purchase).getTime() - new Date(a.dt_purchase).getTime()
          );
          newRecordIds.add(message.purchase_id);
          // Ensure Svelte reactivity by reassigning the Set
          setTimeout(() => {
            newRecordIds.delete(message.purchase_id);
            newRecordIds = new Set(newRecordIds); // Reassign to trigger reactivity
          }, 2 * 60 * 1000);
          showToast(message);
        }
      } catch (err) {
        console.error('[SSE] Error parsing data:', err, event.data);
      }
    };
    eventSource.onerror = (err) => console.error('[SSE] Connection error:', err);
  }

  const formatCurrency = (price?: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price ?? 0);

  $: if (selectedTask) {
    const config = personaConfig[persona];
    const value = +selectedTask.purchase_value;
    computedFee = config?.feeFn ? config.feeFn(value) : 0;
  }

  const renderTaskSummary = (task: Purchase_Record) => `
    <div>${task.owner_national_id.split("-")[1] + "-" + task.owner_national_id.split("-")[2]}</div>
    <div>${formatCurrency(task.purchase_value)}</div>
    <div class="text-xs">${task.source}</div>
    <div class="text-xs">${task.notes.split("|")[0].trim()}</div>
    <span class='text-xs text-indigo-600'>${task.purchase_id.split(`-`)[1]}</span></div>
  `;

  function showToast(payload: any) {
    toastMessage = `${payload.owner_national_id || 'unknown'} => ${payload.vin || 'VIN unknown'} (${formatCurrency(payload.purchase_value)} ${payload.purchase_type})`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => (toastMessage = null), 1500);
  }



  async function approvePersona() {
  if (!selectedTask) return;
  const config = personaConfig[persona];
  const now = new Date().toISOString();

  const payload: any = {
    purchase_id: selectedTask.purchase_id,
    transaction_type: persona,
    officer_id: selectedTask.owner_national_id,
    dt_transaction: now,
    transaction_fee: computedFee,
    notes: `${capitalizeFirst(persona)} approved this transaction`
  };

  // Special case: if registration, attach plate_number
  if (persona === 'registration') {
    const { vin, year, body_type } = selectedTask;
    const generatedPlate = generatePlateNumber(vin, parseInt(year), body_type);
    payload.plate_number = generatedPlate;
  }

  const notifyPayload = {
    vin: selectedTask.vin,
    owner_national_id: selectedTask.owner_national_id,
    purchase_value: selectedTask.purchase_value,
    purchase_type: selectedTask.purchase_type,
    purchase_id: selectedTask.purchase_id,
    notes: selectedTask.notes,
    source: selectedTask.source,
    action: capitalizeFirst(persona)
  };

  try {
    await graphine_notify({
      e: 'vehicles.fn_newltoprocess',
      w: [JSON.stringify(payload)],
      notify: {
        method: 'notifyRoles',
        payload: notifyPayload,
        roles: config?.notifyRoles || [],
        tag: capitalizeFirst(persona)
      }
    });

    // Optional: update plate in purchase record
    if (persona === 'registration') {
      await graphine('post', 'vehicles.update_purchase_plate', [{
        purchase_id: selectedTask.purchase_id,
        plate_id: payload.plate_number
      }]);
    }

    showToast(selectedTask);
    tasks = tasks.filter(t => t.purchase_id !== selectedTask.purchase_id);
  } catch (err) {
    console.error('❌ Approval error:', err);
    toastMessage = '❌ Failed to approve the transaction.';
  }

  selectedTask = null;
}



  function getFormProps(task) {
  // Attempt to parse make/model/year from notes
  let inferredMake = task.make;
  let inferredModel = task.model;
  let inferredYear = task.year;

  if ((!inferredMake || !inferredModel) && task.notes) {
    const parts = task.notes.split('|')[0].trim().split(' ');
    if (parts.length >= 3) {
      inferredYear = parts.pop();
      inferredMake = parts.shift();
      inferredModel = parts.join(' ');
    }
  }

  return {
    seller_fullname: task.owner_national_id,
    seller_address: task.source,
    buyer_fullname: task.new_owner || '',
    buyer_address: task.new_address || '',
    make: inferredMake || 'Unknown Make',
    model: inferredModel || 'Unknown Model',
    body_type: task.body_type || 'SUV',
    chassis_no: task.vin,
    plate_no: task.plate_no || 'N/A',
    file_no: task.purchase_id,
    amount: task.purchase_value,
    year: inferredYear || '',
    doc_title: personaConfig[persona]?.title || 'DOCUMENT',
    status: task.status
  };
}


</script>

<div class="h-full overflow-y-auto px-2 py-1 space-y-2">
  {#if isLoadingTasks}
    <p class="text-gray-500">Loading tasks...</p>
  {:else if taskError}
    <p class="text-red-500">{taskError}</p>
  {:else if tasks.length === 0}
    <p class="text-gray-400 italic">No pending tasks.</p>
  {:else}
    {#each tasks as task (task.purchase_id)}
      <button
        type="button"
        class={`w-full text-left rounded-xl cursor-pointer shadow transition focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-400 hover:brightness-110 hover:outline-1 relative
        ${task.purchase_type === 'cash' ? 'bg-teal-100' : 'bg-rose-100'} p-3 sm:p-4 ${newRecordIds.has(task.purchase_id) ? 'animate-bounce-short' : ''}`}
        on:click={() => (selectedTask = task)}
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-sm text-slate-800">
          <div>{task.vin}</div>
          {@html renderTaskSummary(task)}
        </div>
        {#if newRecordIds.has(task.purchase_id)}
          <div class="absolute top-2 right-2 text-rose-700 animate-spin">
            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.042a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.042a1 1 0 00-1.176 0l-2.817 2.042c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
          </div>
        {/if}
      </button>
    {/each}
  {/if}
</div>

{#if selectedTask}
  <Comp_InfoModal
    title="VIN: {selectedTask.vin}"
    on:close={() => (selectedTask = null)}
    class={selectedTask.showForm ? 'w-[600px]' : ''}
  >
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-sm text-slate-800 mb-4">
      {@html renderTaskSummary(selectedTask)}
      <p class="text-sm text-indigo-700">Fee: <strong>{formatCurrency(computedFee)}</strong></p>
    </div>

    <!-- Option1: Initial View -->
    {#if !selectedTask.showForm}
      <div class="text-center mb-4">
        <button class="btn btn-primary" on:click={() => selectedTask.showForm = true}>{personaAction}</button>
      </div>
      <hr class="my-4 border-t border-gray-300" />
      <div class="mt-1 p-1 bg-teal-50 rounded-lg border border-teal-200 shadow-inner space-y-2">
        <Comp_PersonaItemDetails purchase_id={selectedTask.purchase_id} />
      </div>

    <!-- Option2: Form View -->
    {:else}
      <div class="relative">
        <!-- Scrollable Form Container -->
        <div class="overflow-y-auto max-h-[600px] mb-16">
          <div class="bg-amber-50 p-2 rounded-lg" style="transform: scale(0.75); transform-origin: top center;">
            <svelte:component
              this={personaConfig[persona].form}
              {...getFormProps(selectedTask)}
            />
          </div>
        </div>

        <div class="sticky bottom-0 left-0 right-0 bg-indigo-50 shadow-md px-4 py-3 border-t border-indigo-200 flex justify-end space-x-2">
        <button
        class="btn btn-sm btn-outline btn-error"
        on:click={() => selectedTask.showForm = false}
        >
        ✖ Cancel
        </button>
        <button
        class="btn btn-sm btn-success"
        on:click={async () => {
        await approvePersona();
        selectedTask = null;
        }}
        >
        ✅ Approve
        </button>
        </div>



      </div>
    {/if}
  </Comp_InfoModal>
{/if}

{#if toastMessage}
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-yellow-100 border border-yellow-300 text-yellow-800 text-lg px-6 py-4 rounded-xl shadow-xl animate-fade-in-out">
    {toastMessage}
  </div>
{/if}

<style>
  @keyframes bounce-short {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .animate-bounce-short {
    animation: bounce-short 0.4s ease-in-out 300; /* Set to 300 iterations for a total duration of 120 seconds */
  }
  @keyframes fade-in-out {
    0% { opacity: 0; transform: scale(0.9); }
    10% { opacity: 1; transform: scale(1); }
    90% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.9); }
  }
  .animate-fade-in-out {
    animation: fade-in-out 5s ease-in-out forwards;
  }

  :global(.modal-content) {
    max-height: 85vh !important;
  }
</style>
