<script lang="ts">
  import * as Mock from '$lib/DataSources/DS_MockDataSource';
  import { MapPin, Target } from 'lucide-svelte';

  export let props = {
    customClass: ""
  };

  let isLoading = false;
  let location: { latitude: number; longitude: number } | null = null;
  let errorMessage = "";

  function simulateLocationFetch() {
    isLoading = true;
    errorMessage = "";
    setTimeout(() => {
      if (Math.random() > 0.1) {
        location = {
          latitude: Mock.randomCoordinate(14.65, 14.75),
          longitude: Mock.randomCoordinate(120.95, 121.1)
        };
      } else {
        errorMessage = "Unable to fetch location. Please check your device settings.";
      }
      isLoading = false;
    }, 1500);
  }
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">Live Location & Incident Map</h2>
  <p>
    This map shows your current location and can be used to report incidents with precise coordinates.
  </p>

  <div class="flex flex-col md:flex-row gap-4">
    <div class="card bg-base-100 shadow-md flex-1 p-4">
      <div class="card-body p-0">
        <h3 class="card-title text-xl">My Location</h3>
        {#if isLoading}
          <div class="flex items-center gap-2 text-info">
            <span class="loading loading-dots loading-md"></span>
            <span>Fetching location...</span>
          </div>
        {:else if errorMessage}
          <div class="text-error font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        {:else if location}
          <div class="space-y-1">
            <p><strong>Latitude:</strong> {location.latitude.toFixed(6)}</p>
            <p><strong>Longitude:</strong> {location.longitude.toFixed(6)}</p>
            <p class="text-success text-sm font-medium flex items-center gap-1">
              <svelte:component this={MapPin} class="w-4 h-4" />
              Location acquired
            </p>
          </div>
        {:else}
          <p class="text-base-content/60">Click the button to get your location.</p>
        {/if}
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary" on:click={simulateLocationFetch}>
            <svelte:component this={Target} class="w-5 h-5" />
            {location ? 'Update Location' : 'Get My Location'}
          </button>
        </div>
      </div>
    </div>

    <div class="relative w-full md:w-2/3 h-64 md:h-96 bg-gray-300 rounded-box overflow-hidden shadow-md flex items-center justify-center">
      {#if isLoading}
        <span class="loading loading-spinner text-primary loading-lg"></span>
      {:else}
        <p class="text-center text-lg text-base-content/60">
          <svelte:component this={MapPin} class="w-12 h-12 mx-auto" />
          Map would be displayed here
        </p>
      {/if}
    </div>
  </div>
</section>