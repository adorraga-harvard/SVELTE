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
  export let doc_title: string; // This will likely be "DEED OF ABSOLUTE SALE OF MOTOR VEHICLE" for this form

  // You can add any internal state or reactive declarations specific to Form_Notary here
  // For example, if there were specific notary fields:
  // let notary_public_name: string = '';
  // let document_date: string = new Date().toISOString().split('T')[0];
  // let page_number: number = 1;
  // let book_number: number = 1;

  // Helper function for currency formatting
  const formatCurrency = (price?: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price ?? 0);
</script>

<div class="p-6 bg-white rounded-lg shadow-lg border border-red-200">
  <h2 class="text-3xl font-bold text-center text-red-700 mb-6 border-b-2 border-red-300 pb-2">
    {doc_title || 'DEED OF ABSOLUTE SALE OF MOTOR VEHICLE'}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
    <!-- Section for Vendor (Seller) Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-red-600 mb-2">Vendor (Seller) Information</h3>
      <p><strong>Name:</strong> {seller_fullname}</p>
      <p><strong>Address:</strong> {seller_address}</p>
    </div>

    <!-- Section for Vendee (Buyer) Information -->
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-red-600 mb-2">Vendee (Buyer) Information</h3>
      <p><strong>Name:</strong> {buyer_fullname || 'N/A'}</p>
      <p><strong>Address:</strong> {buyer_address || 'N/A'}</p>
    </div>

    <!-- Section for Subject Vehicle Details -->
    <div class="col-span-full border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-red-600 mb-2">Subject Vehicle Details</h3>
      <p><strong>Make:</strong> {make}</p>
      <p><strong>Model:</strong> {model}</p>
      <p><strong>Body Type:</strong> {body_type}</p>
      <p><strong>Chassis No. (VIN):</strong> {chassis_no}</p>
      <p><strong>Plate No.:</strong> {plate_no}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>

    <!-- Section for Sale Details -->
    <div class="col-span-full">
      <h3 class="text-lg font-semibold text-red-600 mb-2">Sale Details</h3>
      <p><strong>Document Reference No.:</strong> {file_no}</p>
      <p><strong>Consideration Amount:</strong> {formatCurrency(amount)}</p>
      <!-- Add any specific notary/deed fields here -->
      <!-- <p><strong>Notary Public:</strong> {notary_public_name}</p> -->
      <!-- <p><strong>Document Date:</strong> {document_date}</p> -->
      <!-- <p><strong>Page No.:</strong> {page_number}</p> -->
      <!-- <p><strong>Book No.:</strong> {book_number}</p> -->
    </div>
  </div>

  <div class="mt-8 text-center text-gray-500 italic">
    <p>This is the Notary Form for a Deed of Sale.</p>
    <p>Specific notary details and clauses can be added here.</p>
  </div>
</div>

<style>
  /* Specific styles for Form_Notary to differentiate it */
  div {
    font-family: 'Inter', sans-serif;
  }
</style>
