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
  export let doc_title: string; // This will likely be "CERTIFICATE OF INSURANCE" for this form

  // You can add any internal state or reactive declarations specific to Form_Insurance here
  // For example, if there were specific insurance fields:
  // let policy_number: string = '';
  // let coverage_type: string = 'Comprehensive';
  // let effective_date: string = new Date().toISOString().split('T')[0];

  // Helper function for currency formatting (optional, but good practice if needed internally)
  const formatCurrency = (price?: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price ?? 0);
</script>

<div class="p-6 bg-white rounded-lg shadow-lg border border-green-200">
  <h2 class="text-3xl font-bold text-center text-green-700 mb-6 border-b-2 border-green-300 pb-2">
    {doc_title || 'CERTIFICATE OF INSURANCE'}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
    <!-- Section for Policy Holder (Seller) Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-green-600 mb-2">Policy Holder Information</h3>
      <p><strong>Name:</strong> {seller_fullname}</p>
      <p><strong>Address:</strong> {seller_address}</p>
    </div>

    <!-- Section for New Owner (Insured) Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-green-600 mb-2">Insured Party Information</h3>
      <p><strong>Name:</strong> {buyer_fullname || 'N/A'}</p>
      <p><strong>Address:</strong> {buyer_address || 'N/A'}</p>
    </div>

    <!-- Section for Insured Vehicle Details -->
    <div class="col-span-full border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-green-600 mb-2">Insured Vehicle Details</h3>
      <p><strong>Make:</strong> {make}</p>
      <p><strong>Model:</strong> {model}</p>
      <p><strong>Body Type:</strong> {body_type}</p>
      <p><strong>Chassis No. (VIN):</strong> {chassis_no}</p>
      <p><strong>Plate No.:</strong> {plate_no}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>

    <!-- Section for Policy Details -->
    <div class="col-span-full">
      <h3 class="text-lg font-semibold text-green-600 mb-2">Policy Details</h3>
      <p><strong>Reference No.:</strong> {file_no}</p>
      <p><strong>Insured Value:</strong> {formatCurrency(amount)}</p>
      <!-- Add any specific insurance fields here -->
      <!-- <p><strong>Policy Number:</strong> {policy_number}</p> -->
      <!-- <p><strong>Coverage Type:</strong> {coverage_type}</p> -->
      <!-- <p><strong>Effective Date:</strong> {effective_date}</p> -->
    </div>
  </div>

  <div class="mt-8 text-center text-gray-500 italic">
    <p>This is a skeleton for the Insurance Form.</p>
    <p>Additional insurance-specific fields and logic will go here.</p>
  </div>
</div>

<style>
  /* Specific styles for Form_Insurance to differentiate it */
  div {
    font-family: 'Inter', sans-serif;
  }
</style>