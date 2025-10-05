<script lang="ts">
  // These props are expected to be passed from the parent component (e.g., Cont_PersonaItems.svelte)
  export let seller_fullname: string;
  export let seller_address: string;
  export let buyer_fullname: string;
  export let buyer_address: string;
  export let make: string;
  export let model: string;
  export let body_type: string;
  export let chassis_no: string;
  export let plate_no: string;
  export let file_no: string;
  export let amount: number;
  export let year: string;
  export let doc_title: string; // This will likely be "CLEARANCE CERTIFICATE" for this form

  // You can add any internal state or reactive declarations specific to Form_Clearance here
  // For example, if there were specific clearance fields:
  // let clearance_status: string = 'Cleared';
  // let clearance_officer: string = '';
  // let clearance_date: string = new Date().toISOString().split('T')[0];

  // Helper function for currency formatting (optional, but good practice if needed internally)
  const formatCurrency = (price?: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price ?? 0);
</script>

<div class="p-6 bg-white rounded-lg shadow-lg border border-blue-200">
  <h2 class="text-3xl font-bold text-center text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
    {doc_title || 'CLEARANCE CERTIFICATE'}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
    <!-- Section for Previous Owner Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-blue-600 mb-2">Previous Owner Information</h3>
      <p><strong>Name:</strong> {seller_fullname}</p>
      <p><strong>Address:</strong> {seller_address}</p>
    </div>

    <!-- Section for New Owner Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-blue-600 mb-2">New Owner Information</h3>
      <p><strong>Name:</strong> {buyer_fullname || 'N/A'}</p>
      <p><strong>Address:</strong> {buyer_address || 'N/A'}</p>
    </div>

    <!-- Section for Vehicle Identification -->
    <div class="col-span-full border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-blue-600 mb-2">Vehicle Identification</h3>
      <p><strong>Make:</strong> {make}</p>
      <p><strong>Model:</strong> {model}</p>
      <p><strong>Body Type:</strong> {body_type}</p>
      <p><strong>Chassis No. (VIN):</strong> {chassis_no}</p>
      <p><strong>Plate No.:</strong> {plate_no}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>

    <!-- Section for Clearance Details -->
    <div class="col-span-full">
      <h3 class="text-lg font-semibold text-blue-600 mb-2">Clearance Details</h3>
      <p><strong>Reference No.:</strong> {file_no}</p>
      <p><strong>Transaction Value:</strong> {formatCurrency(amount)}</p>
      <!-- Add any specific clearance fields here -->
      <!-- <p><strong>Clearance Status:</strong> {clearance_status}</p> -->
      <!-- <p><strong>Clearance Officer:</strong> {clearance_officer}</p> -->
      <!-- <p><strong>Clearance Date:</strong> {clearance_date}</p> -->
    </div>
  </div>

  <div class="mt-8 text-center text-gray-500 italic">
    <p>This is a skeleton for the Clearance Form.</p>
    <p>Additional clearance-specific fields and logic will go here.</p>
  </div>
</div>

<style>
  /* Specific styles for Form_Clearance to differentiate it */
  div {
    font-family: 'Inter', sans-serif;
  }
</style>
