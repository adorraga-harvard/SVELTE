<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let input: string = '';

  let nationalIdToGenerate = input;
  let generatedQrCodeDataUrl = '';
  let showGeneratedQr = false;

  let scannedNationalId = '';
  let scannedInfo = null;
  let errorMessage = '';
  let showVideo = false;

  let videoElement: HTMLVideoElement;
  let animationFrameId: number;

  const dispatch = createEventDispatcher();

  const nationalIdDatabase = {
    '1234567890': { name: 'Juan Dela Cruz', address: '123 Main St', dob: 'Jan 1, 1990' },
    '0987654321': { name: 'Maria Clara', address: '456 Oak Ave', dob: 'Feb 14, 1992' },
    '1122334455': { name: 'Pedro Penduko', address: '789 Pine Ln', dob: 'Mar 20, 1985' }
  };

  async function ensureLibrariesAreLoaded() {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ([...document.scripts].some(s => s.src.includes(src))) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });

    if (typeof QRCode === 'undefined') {
      await loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js');
    }
    if (typeof jsQR === 'undefined') {
      await loadScript('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js');
    }
  }

  async function checkIfQrExists(id: string): Promise<string | null> {
    const res = await fetch(`/api/pictures/national_id?national_id=${id}`);
    if (res.ok) {
      const json = await res.json();
      return json.qr ?? null;
    }
    return null;
  }

  async function generateQrCode(id: string) {
    errorMessage = '';
    showGeneratedQr = false;

    if (!id) {
      errorMessage = 'Please enter a National ID.';
      return;
    }

    await ensureLibrariesAreLoaded();

    const existingQrUrl = await checkIfQrExists(id);
    if (existingQrUrl) {
      generatedQrCodeDataUrl = existingQrUrl;
      showGeneratedQr = true;
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, id, {
        errorCorrectionLevel: 'H',
        width: 256,
        margin: 1,
        color: { dark: '#ff6600', light: '#ffffff' }
      });

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = 'Maroon';
        ctx.textAlign = 'center';
        ctx.fillText('Pinoy ID', canvas.width / 2, canvas.height / 2);
      }

      const dataUrl = canvas.toDataURL('image/png');
      const blob = dataURLtoBlob(dataUrl);

      // Save to server as [id].qr
      await fetch(`/api/pictures/national_id`, {
        method: 'POST',
        headers: { 'x-filename': `${id}.qr` },
        body: blob
      });

      generatedQrCodeDataUrl = dataUrl;
      showGeneratedQr = true;
    } catch (err) {
      console.error('QR Code generation error:', err);
      errorMessage = 'Failed to generate QR code.';
    }
  }

  function fetchNationalIdInfo(id: string) {
    if (nationalIdDatabase[id]) {
      scannedInfo = {
        ...nationalIdDatabase[id],
        picture: `/pictures/national_id/${id}.png`
      };
    } else {
      errorMessage = `No record found for ID: ${id}`;
    }
  }

  async function startQrScan() {
    await ensureLibrariesAreLoaded();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoElement.srcObject = stream;
      videoElement.setAttribute('playsinline', 'true');
      await videoElement.play();
      showVideo = true;
      scanLoop();
    } catch (err) {
      errorMessage = 'Camera access denied or unavailable.';
    }
  }

  function scanLoop() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const detect = () => {
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData?.data, canvas.width, canvas.height);
        if (code) {
          scannedNationalId = code.data;
          fetchNationalIdInfo(scannedNationalId);
          stopScan();
          playSuccessSound();
          dispatch('scanSuccess', { id: scannedNationalId });
          return;
        }
      }
      animationFrameId = requestAnimationFrame(detect);
    };

    detect();
  }

  function playSuccessSound() {
    new Audio('/sounds/ding.mp3').play();
  }

  function stopScan() {
    const stream = videoElement?.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
    cancelAnimationFrame(animationFrameId);
    showVideo = false;
  }

  function dataURLtoBlob(dataUrl: string): Blob {
    const [header, base64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'image/png';
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
    return new Blob([array], { type: mime });
  }

  onDestroy(stopScan);

  onMount(() => {
    if (input) generateQrCode(input);
  });
</script>

<div class="p-2 space-y-2">
  <!-- Generated QR Code -->
  {#if !showVideo && showGeneratedQr}
    <div class="p-2 bg-stone-200 text-gray-900 rounded shadow">
      <img src={generatedQrCodeDataUrl} alt="Generated QR Code" class="mx-auto w-32 h-32" />
    </div>
  {/if}

  <!-- Scan QR Code -->
  {#if !showGeneratedQr}
    <div class="p-6 bg-gray-100 text-gray-900 rounded shadow">
      <h2 class="text-2xl font-bold text-green-700 mb-4">Scan QR Code</h2>
      <button on:click={startQrScan} class="bg-green-600 text-white px-4 py-2 rounded">
        Start Scan
      </button>
      {#if showVideo}
        <video bind:this={videoElement} class="w-full rounded border mt-4"></video>
      {/if}
    </div>
  {/if}
</div>
