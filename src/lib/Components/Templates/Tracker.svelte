<script lang="ts">
  import * as Mock from '$lib/DataSources/DS_MockDataSource';
  import { CheckCircle2, CircleDashed, XCircle } from 'lucide-svelte';

  export let props = {
    customClass: ""
  };

  const trackingEvents = [
    { name: "Application Received", status: "completed", date: Mock.R_DATE(), time: Mock.R_TIME() },
    { name: "Review by {Mock.randomDept()}", status: "completed", date: Mock.R_DATE(), time: Mock.R_TIME() },
    { name: "Undergoing Assessment", status: "in-progress", date: Mock.R_DATE(), time: Mock.R_TIME() },
    { name: "Awaiting Payment", status: "pending", date: Mock.R_DATE(), time: Mock.R_TIME() },
    { name: "Permit Generation", status: "pending", date: Mock.R_DATE(), time: Mock.R_TIME() },
    { name: "Ready for Pickup", status: "pending", date: Mock.R_DATE(), time: Mock.R_TIME() }
  ];

  function getStatusIcon(status: string) {
    if (status === "completed") return CheckCircle2;
    if (status === "in-progress") return CircleDashed;
    return XCircle;
  }
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">Application Status Tracker</h2>
  <p class="text-lg">
    Tracking ID: <strong>{Mock.randomNumber(10)}</strong>
  </p>

  <div class="space-y-6">
    {#each trackingEvents as event}
      <div class="flex items-start gap-4">
        <div class="mt-1">
          <svelte:component
            this={getStatusIcon(event.status)}
            class={`w-6 h-6 ${
              event.status === 'completed'
                ? 'text-success'
                : event.status === 'in-progress'
                ? 'text-info'
                : 'text-base-content/30'
            }`}
          />
        </div>
        <div>
          <h3 class="font-semibold text-lg">{event.name}</h3>
          <p class="text-sm text-base-content/80">
            {event.date} at {event.time}
          </p>
        </div>
      </div>
    {/each}
  </div>

  <div class="alert alert-info mt-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>This page provides real-time updates on your submitted applications.</span>
  </div>
</section>