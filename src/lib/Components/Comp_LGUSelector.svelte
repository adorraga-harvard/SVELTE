<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import UI_ComboBox from '$lib/UI/UI_ComboBox.svelte';
  import { graphine } from '$lib/Services/Svc_DB';
  import { browser } from '$app/environment';
  import Comp_OTP from '$lib/Components/Comp_OTP.svelte'; // Import the new OTP component
  import Comp_QRTool from '$lib/Components/Comp_QRTool.svelte';

  const dispatch = createEventDispatcher();

  type LGUItem = { code: string; name: string; parentcode?: string };

  let {
    initialProvince = null,
    initialCity = null,
    initialBarrio = null,
  } = $props<{
    initialProvince?: LGUItem | null;
    initialCity?: LGUItem | null;
    initialBarrio?: LGUItem | null;
  }>();

  let selectedProvince = $state<LGUItem | null>(initialProvince);
  let selectedCity = $state<LGUItem | null>(initialCity);
  let selectedBarrio = $state<LGUItem | null>(initialBarrio);

  let provinceInputValue = $state(initialProvince?.name || '');
  let cityInputValue = $state(initialCity?.name || '');
  let barrioInputValue = $state(initialBarrio?.name || '');

  let provinces: LGUItem[] = $state([]);
  let cities: LGUItem[] = $state([]);
  let barangays: LGUItem[] = $state([]);

  let loadingProvinces = $state(false);
  let loadingCities = $state(false);
  let loadingBarangays = $state(false);

  let dateOfBirth: string = $state(''); // Will hold `YYYY-MM-DD`
  let dateOfBirthError: string = $state(''); // New state for DOB validation error

  let nationalIdNumber: string = $state('');
  let nationalIdQRCodeSVG: string = $state(''); // To store SVG for QR code, only for verified state

  let showLGUSelection = $state(true);
  let showEmailVerificationInput = $state(false); // State to control visibility of email input
  let showOtpModal = $state(false); // New state to control OTP modal visibility

  let userEmail: string = $state(''); // State for user's email input
  let emailError: string = $state(''); // State for email validation error

  let isVerified = $state(false); // New state to track official verification status

  // New states for optional profile data
  let profilePictureFile: File | null = $state(null);
  let userGender: string = $state(''); // Or specific enum type if known
  let streetAddress: string = $state('');

  const isCityDisabled = $derived(!selectedProvince);
  const isBarrioDisabled = $derived(!selectedCity);

  const isLGUComplete = $derived(selectedProvince && selectedCity && selectedBarrio);

  // Derived values for Birthday validation limits
  const today = new Date();
  const minBirthDate = new Date(today.getFullYear() - 110, today.getMonth(), today.getDate());
  const maxBirthDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

  // Effect to populate dropdowns if initial values were provided
  $effect(() => {
    if (browser) {
      if (initialProvince && !selectedProvince) {
          selectedProvince = initialProvince;
          provinceInputValue = initialProvince.name;
      }
      if (selectedProvince && initialCity && !selectedCity) {
          selectedCity = initialCity;
          cityInputValue = initialCity.name;
          handleCityInput('');
      }
      if (selectedCity && initialBarrio && !selectedBarrio) {
          selectedBarrio = initialBarrio;
          barrioInputValue = initialBarrio.name;
          handleBarrioInput('');
      }

      if (initialProvince && initialCity && initialBarrio) {
          showLGUSelection = false;
      }
    }
  });

  // Effect for Birthday validation and National ID generation
  $effect(() => {
    // Clear DOB error when dateOfBirth changes
    dateOfBirthError = '';

    if (isLGUComplete && dateOfBirth) {
        const dobDate = new Date(dateOfBirth);
        if (dobDate < minBirthDate || dobDate > maxBirthDate) {
            dateOfBirthError = `Birthday must be between ${minBirthDate.getFullYear()} and ${maxBirthDate.getFullYear()}.`;
            nationalIdNumber = ''; // Clear ID if DOB is invalid
            nationalIdQRCodeSVG = '';
            isVerified = false; // Reset verification status
        } else {
            generateNationalId();
        }
    } else {
        nationalIdNumber = ''; // Clear ID if LGU or DOB is incomplete
        nationalIdQRCodeSVG = '';
        isVerified = false; // Reset verification status
    }
  });


  async function generateQRCodeSVG(text: string): Promise<string> {
    // This function will only be called when the ID is verified.
    // Replace with a real QR code library like 'qrcode' (npm i qrcode)
    return `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto my-2 border border-dashed border-gray-400">
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#999">QR Code</text>
              <text x="50%" y="70%" text-anchor="middle" dominant-baseline="middle" font-size="8" fill="#999">${text.substring(0,10)}...</text>
            </svg>`;
  }

  async function generateNationalId() {
    if (selectedProvince && selectedCity && selectedBarrio && dateOfBirth) {
      // Ensure DOB is valid before generating ID
      const dobDate = new Date(dateOfBirth);
      if (dobDate < minBirthDate || dobDate > maxBirthDate) {
          nationalIdNumber = '';
          return;
      }

      const dobPart = dateOfBirth.replace(/-/g, ''); // `YYYYMMDD`
      const barrioCode = selectedBarrio.code;

      const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 random digits

      const generatedId = `${barrioCode}-${dobPart}-${randomPart}`;
      nationalIdNumber = generatedId;
    } else {
      nationalIdNumber = '';
    }
  }

  async function fetchData(endpoint: string, whereArgs: any[], limit: number, inputType: string) {
    const predicate = {
      e: endpoint,
      l: limit,
      w: whereArgs
    };
    try {
      const result = await graphine("POST", predicate);
      console.log(`[DEBUG] graphine raw result for ${inputType} (w=${JSON.stringify(whereArgs)}):`, result);

      return result
        .filter((d: { place?: string; code?: string; parentcode?: string }) => d.place && d.code)
        .map((d: { place: string; code: string; parentcode?: string }) => {
          return { code: d.code.trim(), name: d.place.trim(), parentcode: d.parentcode?.trim() };
        })
        .filter(Boolean);
    } catch (error) {
      console.error(`Error fetching ${inputType}:`, error);
      return [];
    }
  }

  async function handleProvinceInput(query: string) {
    loadingProvinces = true;
    const data = await fetchData(
      "filipino.fn_addresssearch",
      [query, 'province'],
      100,
      'provinces'
    );
    provinces = data;
    loadingProvinces = false;
  }

  async function handleCityInput(query: string) {
    console.log("handleCityInput called with query:", query, "and selectedProvince:", selectedProvince);
    if (!selectedProvince || !selectedProvince.code || !selectedProvince.parentcode) {
      cities = [];
      loadingCities = false;
      return;
    }
    loadingCities = true;
    const args = [selectedProvince.code, selectedProvince.parentcode, 'province'];
    const data = await fetchData(
      "filipino.fn_addressFilter",
      args,
      100,
      'cities'
    );
    cities = data;
    loadingCities = false;
  }

  async function handleBarrioInput(query: string) {
    console.log("handleBarrioInput called with query:", query, "and selectedCity:", selectedCity);
    if (!selectedCity || !selectedCity.code || !selectedCity.parentcode) {
      barangays = [];
      loadingBarangays = false;
      return;
    }
    loadingBarangays = true;
    const args = [selectedCity.code, selectedCity.parentcode, 'city'];
    const data = await fetchData(
      "filipino.fn_addressFilter",
      args,
      200,
      'barangays'
    );
    barangays = data;
    loadingBarangays = false;
  }

  function handleProvinceSelect(item: LGUItem) {
    selectedProvince = item;
    provinceInputValue = item.name;
    selectedCity = null;
    cityInputValue = '';
    cities = [];
    selectedBarrio = null;
    barrioInputValue = '';
    barangays = [];
    nationalIdNumber = '';
    nationalIdQRCodeSVG = '';
    dateOfBirth = ''; // Clear DOB
    dateOfBirthError = ''; // Clear DOB error
    showLGUSelection = true;
    showEmailVerificationInput = false; // Hide verification input on location change
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';

    if (browser && selectedProvince.code && selectedProvince.parentcode) {
      handleCityInput('');
    } else if (browser) {
      console.warn("Selected province lacks 'code' or 'parentcode'. Cannot fetch cities.");
      cities = [];
    }
  }

  function handleCitySelect(item: LGUItem) {
    selectedCity = item;
    cityInputValue = item.name;
    selectedBarrio = null;
    barrioInputValue = '';
    barangays = [];
    nationalIdNumber = '';
    nationalIdQRCodeSVG = '';
    dateOfBirth = ''; // Clear DOB
    dateOfBirthError = ''; // Clear DOB error
    showLGUSelection = true;
    showEmailVerificationInput = false; // Hide verification input on location change
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';

    if (browser && selectedCity.code && selectedCity.parentcode) {
      handleBarrioInput('');
    } else if (browser) {
      console.warn("Selected city lacks 'code' or 'parentcode'. Cannot fetch barangays.");
      barangays = [];
    }
  }

  function handleBarrioSelect(item: LGUItem) {
    selectedBarrio = item;
    barrioInputValue = item.name;
    showLGUSelection = false;
    showEmailVerificationInput = false; // Ensure inputs are hidden until "Proceed" clicked
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';
  }

  function handleClearProvince() {
    selectedProvince = null;
    provinceInputValue = '';
    provinces = [];

    selectedCity = null;
    cityInputValue = '';
    cities = [];
    selectedBarrio = null;
    barrioInputValue = '';
    barangays = [];

    nationalIdNumber = '';
    nationalIdQRCodeSVG = '';
    dateOfBirth = ''; // Clear DOB
    dateOfBirthError = ''; // Clear DOB error
    showLGUSelection = true;
    showEmailVerificationInput = false; // Hide verification input on clear
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';

    if (browser) {
      handleProvinceInput('');
    }
  }

  function handleClearCity() {
    selectedCity = null;
    cityInputValue = '';

    selectedBarrio = null;
    barrioInputValue = '';
    barangays = [];

    nationalIdNumber = '';
    nationalIdQRCodeSVG = '';
    dateOfBirth = ''; // Clear DOB
    dateOfBirthError = ''; // Clear DOB error
    showLGUSelection = true;
    showEmailVerificationInput = false; // Hide verification input on clear
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';

    if (browser && selectedProvince && selectedProvince.code && selectedProvince.parentcode) {
      handleCityInput('');
    } else if (browser) {
      cities = [];
    }
  }

  function handleClearBarrio() {
    selectedBarrio = null;
    barrioInputValue = '';
    nationalIdNumber = '';
    nationalIdQRCodeSVG = '';
    dateOfBirth = ''; // Clear DOB
    dateOfBirthError = ''; // Clear DOB error
    showLGUSelection = true;
    showEmailVerificationInput = false; // Hide verification input on clear
    showOtpModal = false; // Hide OTP modal
    userEmail = ''; // Clear email input
    emailError = ''; // Clear email error
    isVerified = false; // Reset verification status
    // Clear optional profile data
    profilePictureFile = null;
    userGender = '';
    streetAddress = '';

    if (browser && selectedCity && selectedCity.code && selectedCity.parentcode) {
      handleBarrioInput('');
    } else if (browser) {
      barangays = [];
    }
  }

  function editLocation() {
      showLGUSelection = true;
      showEmailVerificationInput = false; // Hide verification input when editing location
      showOtpModal = false; // Hide OTP modal
      userEmail = ''; // Clear email input
      emailError = ''; // Clear email error
      isVerified = false; // Reset verification status
      // Clear optional profile data (if user edits location, new profile data might not apply)
      profilePictureFile = null;
      userGender = '';
      streetAddress = '';
  }

  function proceedToDigitalVerification() { // Shows the email input
      showEmailVerificationInput = true;
      emailError = ''; // Clear any previous email error when showing
  }

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async function sendForVerification() {
    emailError = ''; // Clear previous errors

    if (!userEmail) {
      emailError = "Email address is required.";
      return;
    }
    if (!validateEmail(userEmail)) {
      emailError = "Please enter a valid email address.";
      return;
    }

    console.log(`Attempting to send verification email to: ${userEmail}`);
    // *** IMPORTANT: This is where you would make the fetch call to your SvelteKit API endpoint. ***
    // Example:
    // try {
    //   const response = await fetch('/api/verify-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: userEmail, nationalId: nationalIdNumber })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log('Verification email sent successfully:', data);
    //     // On successful send, show OTP modal
    //     showEmailVerificationInput = false; // Hide email input
    //     showOtpModal = true; // Show OTP modal
    //   } else {
    //     emailError = data.message || 'Failed to send verification email.';
    //   }
    // } catch (error) {
    //   console.error('Error sending verification email:', error);
    //   emailError = 'Network error or server unavailable.';
    // }

    // --- DEMO PLACEHOLDER ---
    // Simulate successful email send and show OTP modal
    setTimeout(() => {
        console.log(`[DEMO] Verification email sent to ${userEmail} (simulated)`);
        showEmailVerificationInput = false; // Hide email input
        showOtpModal = true; // Show OTP modal
    }, 1000);
    // --- END DEMO PLACEHOLDER ---
  }

  // OTP component callbacks
  async function handleOtpVerified(otpCode: string) { // Changed to async because generateQRCodeSVG is async
      console.log(`OTP Verified! Code: ${otpCode}. National ID: ${nationalIdNumber}`);
      // In a real scenario, you'd send this OTP to your backend for final verification.
      // If backend confirms, then set isVerified to true and generate QR.

      // --- DEMO PLACEHOLDER ---
      // Simulate successful backend OTP verification
      isVerified = true;
      // Only generate QR if verification is successful - AWAITING the promise!
      nationalIdQRCodeSVG = await generateQRCodeSVG(nationalIdNumber);
      showOtpModal = false; // Hide OTP modal
      // --- END DEMO PLACEHOLDER ---
  }

  function handleOtpCancel() {
      console.log('OTP verification cancelled.');
      showOtpModal = false; // Hide OTP modal
      // Optionally, show the email input again or return to previous state
      showEmailVerificationInput = true;
  }

  // Handle profile picture file input
  function handleProfilePictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      profilePictureFile = input.files[0];
      console.log("Profile picture selected:", profilePictureFile.name);
      // You would typically handle file upload to a server here
    }
  }

  function handleWebcamCapture() {
    console.log("Webcam capture initiated (placeholder)");
    // Logic for webcam capture would go here
    alert("Webcam capture not yet implemented in this demo.");
  }

  function saveOptionalInfo() {
    console.log("Saving optional info:");
    console.log("Profile Picture:", profilePictureFile?.name || 'Not provided');
    console.log("Gender:", userGender || 'Not provided');
    console.log("Street Address:", streetAddress || 'Not provided');
    // Implement logic to save this data to your backend
    alert("Optional information saved successfully!");
  }


  $effect(() => {
    if (isLGUComplete) {
      const fullAddress = {
        province: selectedProvince!,
        city: selectedCity!,
        barrio: selectedBarrio!,
      };
      dispatch('lguSelected', fullAddress);
      console.log('LGU Selected:', fullAddress);
    }
  });

  onMount(() => {
    if (browser) {
      handleProvinceInput('');
    }
  });
</script>

<div class="px-4 py-2 bg-indigo-300 rounded-lg shadow-md">
  <div class="text-xl font-extrabold text-rose-200 mb-4">Local Government Unit Selector</div>

  {#if showLGUSelection}
    <div class="space-y-4">
      <UI_ComboBox
        id="province-select"
        label="Province:"
        placeholder="Select a province or type to filter"
        items={provinces}
        bind:selectedValue={selectedProvince}
        bind:inputValue={provinceInputValue}
        on:select={(e) => handleProvinceSelect(e.detail)}
        on:input={(e) => handleProvinceInput(e.detail)}
        on:clear={handleClearProvince}
        loading={loadingProvinces}
        showClearButton={true}
      />

      <UI_ComboBox
        id="city-select"
        label="City/Municipality:"
        placeholder="Select a city/municipality or type to filter"
        items={cities}
        bind:selectedValue={selectedCity}
        bind:inputValue={cityInputValue}
        on:select={(e) => handleCitySelect(e.detail)}
        on:input={(e) => cityInputValue = e.detail}
        on:clear={handleClearCity}
        disabled={isCityDisabled}
        loading={loadingCities}
        showClearButton={true}
      />

      <UI_ComboBox
        id="barrio-select"
        label="Barrio (Barangay):"
        placeholder="Select a barrio/barangay or type to filter"
        items={barangays}
        bind:selectedValue={selectedBarrio}
        bind:inputValue={barrioInputValue}
        on:select={(e) => handleBarrioSelect(e.detail)}
        on:input={(e) => barrioInputValue = e.detail}
        on:clear={handleClearBarrio}
        disabled={isBarrioDisabled}
        loading={loadingBarangays}
        showClearButton={true}
      />
    </div>
  {/if}

  {#if isLGUComplete}
    <div class="mt-6 p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg shadow-lg text-green-900">
      <div class="flex items-center mb-2 justify-between">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.003 12.003 0 002.944 12c.005 3.163 1.093 6.015 3.04 8.618M12 21.056c3.163-.005 6.015-1.093 8.618-3.04A12.003 12.003 0 0021.056 12a11.955 11.955 0 01-3.04-8.618z" />
          </svg>
          <h3 class="font-bold text-lg text-green-800">Location Confirmed:</h3>
        </div>
        <button on:click={editLocation} class="btn btn-sm btn-outline btn-success text-sm py-1 px-3 rounded-md">
            Edit Location
        </button>
      </div>
      <p class="font-semibold text-xl leading-tight mb-4">
        {selectedBarrio.name}, <span class="block sm:inline-block">{selectedCity.name},</span> <span class="block sm:inline-block">{selectedProvince.name}</span>
      </p>

      {#if !isVerified  && !nationalIdNumber}
          <hr class="my-4 border-green-300 opacity-50">
          <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-info max-w-full">
              <p>Thanks for confirming your location! To generate your National ID, please provide your <b>Birthday</b>.</p>
            </div>
          </div>

          <div class="mb-4">
            <label for="dateOfBirth" class="block text-sm font-medium text-green-800 mb-1 leading-tight">
              Birthday: <span class="text-red-500">* (Required for National ID)</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              bind:value={dateOfBirth}
              class="block w-full px-3 py-2 border {dateOfBirthError ? 'border-error' : 'border-green-300'} rounded-lg shadow-sm
                     focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-700 bg-white"
              max={new Date().toISOString().split('T')[0]} />
            {#if dateOfBirthError}
                <p class="text-error text-xs mt-1 leading-tight">{dateOfBirthError}</p>
            {/if}
          </div>
        {/if}

      {#if nationalIdNumber && !dateOfBirthError}
        {#if !isVerified}
            <div class="chat chat-end">
                <div class="chat-bubble chat-bubble-success text-base-100 max-w-full">
                    <u class="font-bold my-0">Here's your National ID:</u>
                    <p class="text-2xl shady text-amber-200 font-extrabold break-words">{nationalIdNumber}</p>
                    <p class="text-sm font-semibold text-warning-content mt-1 text-center">Status: Officially Unverified</p>
                </div>
            </div>

            <div class="chat chat-start">
                <div class="chat-bubble chat-bubble-info max-w-full">
                    <h4 class="font-bold mb-2">To Officially Verify your ID:</h4>
                    <p class="text-sm mb-2 leading-tight">
                      <span class="font-semibold">a.</span> Click the "Proceed" button to use your <b>Email Address</b> for a secure verification code/link.
                    </p>
                    <button on:click={proceedToDigitalVerification} class="btn btn-sm btn-info text-teal-400 mt-2">
                        Proceed
                    </button>

                    {#if showEmailVerificationInput}
                      <div class="mt-4 p-3 bg-base-100 rounded-lg border border-base-content/20 space-y-3">
                          <div>
                              <label for="emailInput" class="block text-sm font-medium text-teal-400 mb-1 leading-tight">Email Address:</label>
                              <input
                                  type="email"
                                  id="emailInput"
                                  placeholder="your@email.com"
                                  bind:value={userEmail}
                                  class="input input-bordered w-full {emailError ? 'input-error' : ''} text-gray-900"
                                  on:input={() => emailError = ''}
                              />
                              {#if emailError}
                                  <p class="text-error text-xs mt-1 leading-tight">{emailError}</p>
                              {/if}
                          </div>
                          <button on:click={sendForVerification} class="btn btn-primary w-full">
                              Send For Verification
                          </button>
                      </div>
                    {/if}

                    <p class="text-sm mt-4 leading-normal">
                      <span class="font-semibold">b.</span> Alternatively, if you don't have an email address, you can verify in person.
                    </p>
                    <p class="text-xs font-light mt-1 leading-tight text-gray-700">
                      Please proceed to any National ID Verification Center (it doesn't have to be in your LGU).
                      When you go, please be sure to bring along <b>pertinent documents</b> like your <b>Birth Certificate</b> or any verifiable <b>Government Issued ID</b>.
                    </p>
                    <div class="mt-3 p-2 border border-red-300 bg-red-50 rounded-lg text-red-800 font-semibold leading-tight">
                      <p class="text-xs">
                        <span class="font-extrabold">Important:</span> This National ID must be officially verified within <span class="text-red-700">45 days</span>. Failure to do so will result in its automatic revocation, and you'll need to re-register to obtain a National ID.
                      </p>
                    </div>
                </div>
            </div>
        {:else} <div class="chat chat-end">
                <div class="chat-bubble chat-bubble-success text-base-100 max-w-full">
                    <p class="font-bold my-0 text-center"><u>Your National ID has been Officially Verified!</u></p>
                    <p class="text-3xl text-amber-200 shady font-extrabold break-words text-center">{nationalIdNumber}</p>
                    <div class="flex justify-center my-2">
                      <Comp_QRTool input={nationalIdNumber} ></Comp_QRTool>
                    </div>

                    <div class="mt-2 pt-2 border-t border-base-content/10">
                      <u class="font-bold mb-1">Enhance Your National ID Experience <span class="font-normal text-sm text-gray-500">(Optional)</span></u>
                      <p class="text-sm mb-4 text-red-400 leading-normal">
                        To unlock additional features and to streamline future interactions with government services, consider providing the following information:
                      </p>

                      <div class="space-y-2">
                        <div>
                          <label class="block text-sm mb-1 font-medium leading-tight">Profile Picture:</label>
                          <div class="flex items-center space-x-2">
                            <input type="file" accept="image/*" on:change={handleProfilePictureChange} class="file-input mt-0  file-input-bordered file-input-sm w-full max-w-xs" />
                            <button on:click={handleWebcamCapture} class="btn btn-sm btn-outline btn-warning">Webcam</button>
                          </div>
                          {#if profilePictureFile}
                            <p class="text-xs text-gray-500 mt-1">Selected: {profilePictureFile.name}</p>
                          {/if}
                        </div>

                        <div>
                          <label for="userGender" class="block text-sm mb-1 font-medium leading-tight">Gender:</label>
                          <select id="userGender" bind:value={userGender} class="select select-bordered text-amber-600 mt-0  w-full max-w-xs">
                            <option value="" disabled selected>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to Say">Prefer not to Say</option>
                          </select>
                        </div>

                        <div>
                          <label for="streetAddress" class="block text-sm font-medium  mb-1 leading-tight">Street Address:</label>
                          <input type="text" id="streetAddress" placeholder="e.g., Block 12 Lot 34 Mango St." bind:value={streetAddress} class="text-amber-600 mt-0 input-bordered w-full" />
                        </div>

                        <button on:click={saveOptionalInfo} class="btn btn-info w-full">Save Optional Info</button>
                      </div>
                    </div>
                </div>
            </div>
          {/if}
        {/if}
      </div>

  {/if}
</div>

{#if showOtpModal}
    <Comp_OTP
        targetEmail={userEmail}
        onVerify={handleOtpVerified}
        onCancel={handleOtpCancel}
    />
{/if}

<style>
  /* Base styles for labels and paragraphs to ensure better spacing and readability */
  label {
    line-height: 1.25; /* leading-tight equivalent for labels */
  }
  p {
    line-height: 1.5; /* leading-normal equivalent for paragraphs */
  }
  .text-xs {
    line-height: 1.25; /* leading-tight equivalent for extra small text */
  }

  /* Specific color adjustments for labels to ensure contrast */
  .text-teal-400 { color: #2dd4bf; } /* Tailwind's teal-400 */
  .text-gray-900 { color: #1f2937; } /* Tailwind's gray-900 for input text */
  .text-info-content { color: #0891b2; } /* Tailwind's cyan-700/info-content equivalent */
</style>