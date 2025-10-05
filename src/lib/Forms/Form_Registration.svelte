<script lang="ts">
  import { generatePlateNumber } from '$lib/Services/Svc_Vehicles';
  import { graphine } from '$lib/Services/Svc_DB';

  export let seller_fullname: string;
  export let seller_address: string;
  export let buyer_fullname: string;
  export let buyer_address: string;
  export let make: string | undefined;
  export let model: string | undefined;
  export let body_type: string | undefined;
  export let chassis_no: string;
  export let plate_no: string | undefined;
  export let file_no: string;
  export let amount: number;
  export let registration_fee: number; // ✅ Already computed by parent
  export let year: string | undefined;
  export let doc_title: string;
  export let status: string | undefined;

  // Generate plate if needed
  $: computed_plate_no = (!plate_no || plate_no === 'N/A') && chassis_no && body_type && year
    ? generatePlateNumber(chassis_no, parseInt(year), body_type)
    : plate_no;

  const formatCurrency = (price?: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price ?? 0);
  //
  // // ✅ This logic should be called externally
  // async function approveAndSave() {
  //   const updateRes = await graphine('post', 'vehicles.fn_newltoprocess', [{
  //     purchase_id: file_no,
  //     transaction_type: 'registration',
  //     officer_id: seller_fullname,
  //     dt_transaction: new Date().toISOString(),
  //     transaction_fee: registration_fee,
  //     notes: `Registration approved with plate ${computed_plate_no}`,
  //     plate_number: computed_plate_no
  //   }]);
  //
  //   const updatePurchase = await graphine('post', 'vehicles.update_purchase_plate', [{
  //     purchase_id: file_no,
  //     plate_id: computed_plate_no
  //   }]);
  //
  //   return updateRes;
  // }
  //
  // export { approveAndSave };
</script>

<div class="p-6 bg-white rounded-lg shadow-lg border border-indigo-200">
  <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6 border-b-2 border-indigo-300 pb-2">
    {doc_title || 'CERTIFICATE OF REGISTRATION'}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-indigo-600 mb-2">Seller Information</h3>
      <p><strong>Name:</strong> {seller_fullname || 'N/A'}</p>
      <p><strong>Address:</strong> {seller_address || 'N/A'}</p>
    </div>

    <div class="col-span-full md:col-span-1 border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-indigo-600 mb-2">Buyer Information</h3>
      <p><strong>Name:</strong> {buyer_fullname || 'N/A'}</p>
      <p><strong>Address:</strong> {buyer_address || 'N/A'}</p>
    </div>

    <div class="col-span-full border-b pb-2 mb-2 border-gray-200">
      <h3 class="text-lg font-semibold text-indigo-600 mb-2">Vehicle Details</h3>
      <p><strong>Make:</strong> {make || 'N/A'}</p>
      <p><strong>Model:</strong> {model || 'N/A'}</p>
      <p><strong>Body Type:</strong> {body_type || 'N/A'}</p>
      <p><strong>Chassis No. (VIN):</strong> {chassis_no || 'N/A'}</p>
      <p><strong>Plate No.:</strong> {computed_plate_no || 'N/A'}</p>
      <p><strong>Year:</strong> {year || 'N/A'}</p>
    </div>

    <div class="col-span-full">
      <h3 class="text-lg font-semibold text-indigo-600 mb-2">Transaction Details</h3>
      <p><strong>File No.:</strong> {file_no || 'N/A'}</p>
      <p><strong>Amount:</strong> {formatCurrency(amount)}</p>
      <p><strong>Registration Fee:</strong> {formatCurrency(registration_fee)}</p>
    </div>
  </div>

  {#if status}
    <div class="mt-6 text-center text-sm text-green-700 italic">
      <p>📌 Status: {status.split(' | ').at(-1)}</p>
    </div>
  {/if}

  <div class="mt-4 text-center text-gray-500 italic">
    <p>This is a skeleton for the Registration Form.</p>
    <p>Additional registration-specific fields and logic will go here.</p>
  </div>
</div>

<style>
  div {
    font-family: 'Inter', sans-serif;
  }
</style>
