<script lang="ts">
  import { QrCode, Scan, Download } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';

  export let props = {
    customClass: ""
  };

  let qrCodeData = "https://example.com/pinoy-id/123456789";
  let qrCodeUrl = "";
  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let stream: MediaStream | null = null;
  let isScanning = false;
  let scanResult: string | null = null;
  let errorMessage: string | null = null;

  async function generateQrCode() {
    try {
      qrCodeUrl = await QRCode.toDataURL(qrCodeData);
    } catch (err) {
      console.error("Error generating QR code:", err);
      qrCodeUrl = "";
    }
  }

  onMount(() => {
    generateQrCode();
  });

  async function startScan() {
    isScanning = true;
    scanResult = null;
    errorMessage = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      video.play();
      scanQrCode();
    } catch (err) {
      console.error("Error accessing camera for scanning:", err);
      errorMessage = "Camera access denied or not available. Please try again.";
      isScanning = false;
    }
  }

  function scanQrCode() {
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      // In a real implementation, a QR code library would process this image data.
      // We will simulate a result for this mock-up.
      if (Math.random() > 0.3) {
        scanResult = "Scanned QR code: 'https://example.com/data/scanned_id'";
        stopCamera();
      } else {
        requestAnimationFrame(scanQrCode);
      }
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      isScanning = false;
    }
  }
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">QR Code Services</h2>
  <p>
    Use this page to generate a QR code for your records or to scan one for quick verification.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="card bg-base-100 shadow-lg p-6 space-y-4">
      <h3 class="card-title text-xl flex items-center gap-2"><svelte:component this={QrCode} class="w-6 h-6" /> Generate QR Code</h3>
      <div class="flex flex-col items-center gap-4">
        {#if qrCodeUrl}
          <img src={qrCodeUrl} alt="Generated QR Code" class="w-48 h-48 border border-base-300 p-2" />
          <a href={qrCodeUrl} download="qr-code.png" class="btn btn-primary">
            <svelte:component this={Download} class="w-5 h-5" />
            Download QR Code
          </a>
        {:else}
          <div class="w-48 h-48 bg-base-200 flex items-center justify-center">
            <span class="text-base-content/50">QR Code could not be generated</span>
          </div>
        {/if}
        <textarea
          class="textarea textarea-bordered w-full"
          placeholder="Enter data for QR code"
          bind:value={qrCodeData}
          on:input={generateQrCode}
        ></textarea>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg p-6 space-y-4">
      <h3 class="card-title text-xl flex items-center gap-2"><svelte:component this={Scan} class="w-6 h-6" /> Scan QR Code</h3>
      <div class="relative w-full aspect-video bg-gray-300 rounded-box overflow-hidden shadow-md flex items-center justify-center">
        {#if isScanning}
          <video bind:this={video} autoplay playsinline class="object-cover w-full h-full"></video>
          <canvas bind:this={canvas} width="400" height="300" class="hidden"></canvas>
        {:else}
          <div class="flex flex-col items-center text-center text-lg text-base-content/60">
            <svelte:component this={Scan} class="w-16 h-16 mx-auto mb-2" />
            <p>Scanning feed would be displayed here.</p>
          </div>
        {/if}
      </div>

      <div class="flex items-center gap-2">
        <button class="btn btn-primary" on:click={startScan} disabled={isScanning}>
          <svelte:component this={Scan} class="w-5 h-5" />
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>
        {#if isScanning}
          <button class="btn btn-secondary" on:click={stopCamera}>
            Stop Scan
          </button>
        {/if}
      </div>

      {#if scanResult}
        <div class="alert alert-success mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{scanResult}</span>
        </div>
      {:else if errorMessage}
        <div class="alert alert-error mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      {/if}
    </div>
  </div>
</section>