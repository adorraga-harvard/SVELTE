<script lang="ts">
  import { Camera, CheckCircle2, CloudUpload, Repeat, XCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';

  export let props = {
    customClass: ""
  };

  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let stream: MediaStream | null = null;
  let capturedImage: string | null = null;
  let isUploading = false;
  let uploadStatus: 'success' | 'error' | null = null;

  onMount(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback to a mock view if the camera is not available.
      stream = null;
    }
  });

  function takePhoto() {
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      capturedImage = canvas.toDataURL('image/png');
      stopCamera();
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }

  function retakePhoto() {
    capturedImage = null;
    uploadStatus = null;
    // Restart camera
    navigator.mediaDevices.getUserMedia({ video: true }).then(newStream => {
      stream = newStream;
      video.srcObject = stream;
    });
  }

  async function uploadPhoto() {
    isUploading = true;
    uploadStatus = null;
    // Simulate API call and upload process
    await new Promise(r => setTimeout(r, 2000));

    if (Math.random() > 0.1) {
      uploadStatus = 'success';
      capturedImage = null; // Clear image after successful upload
    } else {
      uploadStatus = 'error';
    }
    isUploading = false;
  }
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">Capture & Upload Photo</h2>
  <p>
    This tool allows you to take a photo directly from your device and upload it as a requirement.
  </p>

  <div class="space-y-4">
    <div class="relative w-full aspect-video bg-gray-300 rounded-box overflow-hidden shadow-md flex items-center justify-center">
      {#if capturedImage}
        <img src={capturedImage} alt="Captured" class="object-cover w-full h-full" />
        <canvas bind:this={canvas} class="hidden"></canvas>
      {:else if stream}
        <video bind:this={video} autoplay class="object-cover w-full h-full"></video>
        <canvas bind:this={canvas} class="hidden"></canvas>
      {:else}
        <div class="flex flex-col items-center text-center text-lg text-base-content/60">
          <svelte:component this={Camera} class="w-16 h-16 mx-auto mb-2" />
          <p>Camera is not available or was denied.</p>
        </div>
      {/if}
    </div>

    <div class="flex items-center gap-4">
      {#if !capturedImage}
        <button class="btn btn-primary" on:click={takePhoto} disabled={!stream}>
          <svelte:component this={Camera} class="w-5 h-5" />
          Take Photo
        </button>
      {:else}
        <button class="btn btn-secondary" on:click={retakePhoto} disabled={isUploading}>
          <svelte:component this={Repeat} class="w-5 h-5" />
          Retake
        </button>
        <button class="btn btn-primary" on:click={uploadPhoto} disabled={isUploading}>
          <svelte:component this={CloudUpload} class="w-5 h-5" />
          {isUploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      {/if}

      {#if uploadStatus === 'success'}
        <div class="text-success flex items-center gap-1 font-medium">
          <svelte:component this={CheckCircle2} class="w-5 h-5" />
          Photo uploaded successfully!
        </div>
      {:else if uploadStatus === 'error'}
        <div class="text-error flex items-center gap-1 font-medium">
          <svelte:component this={XCircle} class="w-5 h-5" />
          Upload failed. Please try again.
        </div>
      {/if}
    </div>
  </div>
</section>