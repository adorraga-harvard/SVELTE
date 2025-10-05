<script lang="ts">
  export let seller_fullname: string;
  export let seller_address: string;
  export let buyer_fullname: string;
  export let buyer_address: string;

  export let make: string;
  export let body_type: string;
  export let model: string;
  export let chassis_no: string;
  export let plate_no: string;
  export let file_no: string;
  export let year: string = "";

  export let amount: string;
  export let doc_title: string = "PERSONA FORM";
  export let type_of_id: string = "";
  export let id_number: string = "";
  export let expiry_date: string = "";

  const formattedAmount = typeof amount === 'string'
    ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(parseFloat(amount))
    : amount;

  const today = new Date().toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
</script>

<div class="relative w-full h-full p-4 bg-amber-50 border border-amber-300 rounded-lg max-w-3xl mx-auto">
  <!-- Document header -->
  <div class="text-center mb-4">
    <h4 class="text-xs uppercase tracking-widest text-amber-800 mb-0.5">Republic of the Philippines</h4>
    <h3 class="text-xs uppercase tracking-wider text-amber-900 mb-0.5">Department of Transportation</h3>
    <h2 class="text-lg uppercase tracking-wide text-amber-950 mb-1">Land Transportation Office</h2>
    <div class="w-24 h-0.5 bg-amber-700 mx-auto mb-2"></div>
    <h1 class="text-xl font-bold text-amber-950">{doc_title}</h1>
    <p class="text-xs text-amber-800 mt-1">Document No: LTO-{file_no.substring(0, 8)}</p>
  </div>

  <!-- Date and Location -->
  <div class="text-right mb-4 text-xs">
    <p>Date: <span class="font-semibold">{today}</span></p>
    <p>Location: <span class="font-semibold">LTO Central Office, Quezon City</span></p>
  </div>

  <slot name="body">
    <!-- Main content section -->
    <p class="mb-4 text-sm leading-relaxed">
      This is to certify that the vehicle with details described herein has been
      duly processed for transfer of ownership in accordance with Republic Act No. 4136,
      as amended, and other relevant regulations.
    </p>
  </slot>

  <!-- Vehicle information -->
  <div class="mb-4">
    <h3 class="text-sm font-semibold border-b border-amber-300 pb-0.5 mb-2">VEHICLE INFORMATION</h3>
    <div class="grid grid-cols-3 gap-2">
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Make</p>
        <p class="font-semibold text-xs text-black m-0">{make}</p>
      </div>
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Model</p>
        <p class="font-semibold text-xs text-black m-0">{model}</p>
      </div>
      {#if year}
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Year</p>
        <p class="font-semibold text-xs text-black m-0">{year}</p>
      </div>
      {/if}
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Body Type</p>
        <p class="font-semibold text-xs text-black m-0">{body_type}</p>
      </div>
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Plate Number</p>
        <p class="font-semibold text-xs text-black m-0">{plate_no}</p>
      </div>
      <div class="bg-white p-1.5 rounded border border-amber-200">
        <p class="text-xs text-amber-800 m-0">Chassis Number</p>
        <p class="font-semibold text-xs text-black m-0">{chassis_no}</p>
      </div>
    </div>
  </div>

  <!-- Transfer details -->
  <div class="mb-4">
    <h3 class="text-sm font-semibold border-b border-amber-300 pb-0.5 mb-2">TRANSFER OF OWNERSHIP</h3>

    <div class="grid grid-cols-2 gap-2 mb-2">
      <div class="bg-white p-2 rounded border border-amber-200">
        <h4 class="text-amber-800 text-xs font-semibold mb-0.5">FROM (SELLER)</h4>
        <p class="font-semibold text-xs text-black m-0">{seller_fullname}</p>
        <p class="text-xs text-black m-0">{seller_address}</p>
        {#if id_number}
        <div class="mt-1 text-xs">
          <p class="m-0 text-black">ID: {type_of_id} #{id_number}</p>
          {#if expiry_date}
          <p class="m-0 text-black">Expires: {expiry_date}</p>
          {/if}
        </div>
        {/if}
      </div>

      <div class="bg-white p-2 rounded border border-amber-200">
        <h4 class="text-amber-800 text-xs font-semibold mb-0.5">TO (BUYER)</h4>
        <p class="font-semibold text-xs text-black m-0">{buyer_fullname}</p>
        <p class="text-xs text-black m-0">{buyer_address}</p>
      </div>
    </div>

    <div class="bg-amber-100 p-2 rounded-lg border border-amber-300 text-center">
      <p class="text-xs m-0 text-amber-800">Transfer Amount:</p>
      <p class="text-lg font-bold text-amber-900 m-0">{formattedAmount}</p>
    </div>
  </div>

  <!-- Signatures section -->
  <slot name="footer">
    <div class="mt-4 grid grid-cols-3 gap-2">
      <div class="text-center">
        <div class="h-8 border-b border-amber-900 mb-0.5"></div>
        <p class="font-semibold text-xs text-black m-0">{seller_fullname}</p>
        <p class="text-xs text-amber-800 m-0">Seller</p>
      </div>

      <div class="text-center">
        <div class="h-8 border-b border-amber-900 mb-0.5"></div>
        <p class="font-semibold text-xs text-black m-0">{buyer_fullname}</p>
        <p class="text-xs text-amber-800 m-0">Buyer</p>
      </div>

      <div class="text-center">
        <div class="h-8 border-b border-amber-900 mb-0.5"></div>
        <p class="font-semibold text-xs text-black m-0">LTO Officer</p>
        <p class="text-xs text-amber-800 m-0">Authorized</p>
      </div>
    </div>
  </slot>

  <!-- Official stamp section -->
  <div class="mt-4 flex justify-end">
    <div class="w-16 h-16 border border-dashed border-amber-500 rounded flex items-center justify-center">
      <p class="text-amber-700 text-xs text-center m-0">STAMP</p>
    </div>
  </div>
</div>

<style>
  /* Reset margins for paragraph elements */
  p.m-0 {
    margin: 0 !important;
  }

  /* Ensure all text has good contrast */
  .text-black {
    color: #000000 !important;
  }
</style>
