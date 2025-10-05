<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    receipt: null
    };
</script>


<div class="project-card">
  <div class="project-card-body text-center space-y-4">
    <h2 class="text-2xl font-bold">Official Receipt</h2>
    <p class="text-sm text-base-content/60">Payment confirmation for your transaction</p>
    <div class="divider"></div>

    <div class="space-y-2 text-left max-w-md mx-auto">
      <p><span class="font-semibold">Transaction ID:</span> {props.receipt?.id}</p>
      <p><span class="font-semibold">Date:</span> {props.receipt?.date}</p>
      <p><span class="font-semibold">Payer:</span> {props.receipt?.payer}</p>
      <p><span class="font-semibold">Amount:</span> ₱{props.receipt?.amount}</p>
      <p><span class="font-semibold">Status:</span> <span class="badge badge-success">{props.receipt?.status}</span></p>
    </div>

    <div class="divider"></div>
    <button class="btn btn-primary">Download PDF</button>
  </div>
</div>
