<script lang="ts">
  import { onMount } from 'svelte';

  export let national_id: string;
  export let fullname: string;

  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let imageUrl = '';
  let stream: MediaStream;

  const watermarkText = `${fullname} - ${national_id}`;
  const watermarkColors = ['#60a5fa', '#f87171', '#34d399', '#facc15', '#a78bfa'];

  async function startCamera() {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (video) {
      video.srcObject = stream;
      await video.play();
    }
  }

  onMount(() => {
    startCamera();
  });

  function stopCamera() {
    stream?.getTracks().forEach((track) => track.stop());
  }

  function wrapTextIntoLines(text: string, ctx: CanvasRenderingContext2D, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > maxWidth) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line.trim());
    return lines;
  }

  async function capture() {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, 800, 600);

    ctx.save();

    const fontSize = 32;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.3;

    const lines = wrapTextIntoLines(watermarkText, ctx, canvas.width - 100);
    const lineHeight = fontSize * 1.5;

    // Center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-15 * Math.PI) / 180);

    lines.forEach((line, index) => {
      ctx.fillStyle = watermarkColors[index % watermarkColors.length];
      ctx.fillText(line, 0, (index - lines.length / 2) * lineHeight);
    });

    ctx.restore();

    imageUrl = canvas.toDataURL('image/png');
    stopCamera();
  }

  async function submit() {
    if (!imageUrl) return;
    const blob = dataURLtoBlob(imageUrl);

    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = 80;
    thumbCanvas.height = 60;
    const thumbCtx = thumbCanvas.getContext('2d');
    const img = new Image();
    img.onload = async () => {
      thumbCtx?.drawImage(img, 0, 0, 80, 60);
      const thumbBlob = dataURLtoBlob(thumbCanvas.toDataURL('image/png'));

      await fetch(`/api/pictures/national_id`, {
        method: 'POST',
        headers: { 'x-filename': `${national_id}.png` },
        body: blob
      });

      await fetch(`/api/pictures/national_id`, {
        method: 'POST',
        headers: { 'x-filename': `${national_id}_thumb.png` },
        body: thumbBlob
      });

      imageUrl = '';
      await startCamera();
    };
    img.src = imageUrl;
  }

  async function retake() {
    imageUrl = '';
    await startCamera();
  }

  function dataURLtoBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(',');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];
    const buffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeString });
  }
</script>

<div class="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 text-neutral-content bg-base-100 rounded shadow">
  <h2 class="text-xl font-extrabold text-rose-400 text-center text-neutral">Profile Photo for {fullname}</h2>

  <div class="relative aspect-video w-full rounded overflow-hidden border shadow bg-black">
    {#if !imageUrl}
      <video bind:this={video} autoplay playsinline class="w-full h-full object-cover" />
    {:else}
      <img src={imageUrl} alt="Captured" class="w-full h-full object-contain" />
    {/if}
  </div>

  <div class="flex justify-center gap-4 mt-3">
    {#if !imageUrl}
      <button on:click={capture} class="btn btn-primary">📸 Capture</button>
    {:else}
      <button on:click={submit} class="btn btn-success">✅ Submit</button>
      <button on:click={retake} class="btn btn-warning">🔁 Retake</button>
    {/if}
  </div>

  <canvas bind:this={canvas} class="hidden" />
</div>
