<script lang="ts">
  import { sineOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { scale, fly } from 'svelte/transition';

  let { targetEmail, onVerify, onCancel } = $props<{
    targetEmail: string; // The email to which the OTP was sent
    onVerify: (otp: string) => void; // Callback when OTP is successfully entered
    onCancel: () => void; // Callback when user cancels
  }>();

  let otp = $state('');
  let hasError = $state(false);
  let inputElement: HTMLInputElement;
  let canvasElement: HTMLCanvasElement;

  let isEntering = $state(true);
  let isShaking = $state(false);

  // GENERIC TEST CODE: 123456
  const expectedOTP = "123456";

  $effect(() => {
    const canvas = canvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    setupCanvas();
    const cols = Math.floor(canvas.clientWidth / 20) + 1;
    const ypos = Array(cols).fill(0);
    const matrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Semi-transparent black for trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f00'; // Bright RED for characters
      ctx.font = '15pt monospace';
      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
      animationFrameId = requestAnimationFrame(matrix);
    };
    matrix();
    window.addEventListener('resize', setupCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setupCanvas);
    };
  });

  $effect(() => {
    inputElement?.focus();
    isEntering = false; // Immediately set to false for simple animation
  });

  function handleSubmit() {
    if (otp !== expectedOTP) {
      hasError = true;
      isShaking = true;
      setTimeout(() => (isShaking = false), 500);
      return;
    }
    onVerify(otp); // Call the success callback
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') onCancel();
    if (event.key === 'Enter' && otp) handleSubmit();
  }

  function handleCancelClick() {
    onCancel();
  }
</script>

<div onkeydown={handleKeydown} role="dialog" aria-modal="true" tabindex="-1">
  <canvas
    bind:this={canvasElement}
    class="fixed inset-0 z-40 w-full h-full"
    aria-hidden="true"
  ></canvas>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div
      class="card font-mono max-w-md w-full bg-[#10151c]/80 text-gray-300 shadow-2xl shadow-red-500/10 m-4 border border-red-500/20"
      class:animate-entry={!isEntering}
      class:animate-shake={isShaking}
    >
      <div class="card-body p-6 pt-8">
        <div class="flex flex-col items-center text-center">
          <h3 class="text-3xl font-thin">EMAIL VERIFICATION</h3>
          <p class="font-semibold text-gray-400">
            Enter the code sent to: <span class="text-amber-200 font-extrabold">{targetEmail}</span>
          </p>
        </div>
        <div class="w-full mt-4 flex flex-col items-center">
          <div class="relative w-full">
            <label
              class="flex w-full cursor-text items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-red-900 bg-black/30 p-4 min-h-[4.5rem] transition-all focus-within:border-red-500"
              class:border-red-500={hasError}
              for="otp-input"
            >
              {#each otp.split('') as char, i (i)}
                <span
                  class="text-5xl text-red-300"
                  in:scale={{ duration: 150, start: 1.5, opacity: 0 }}
                >
                  {char} </span>
              {/each}
              <span class="inline-block h-9 w-2 bg-red-400 animate-blink"></span>
            </label>
          </div>
          <input
            id="otp-input"
            bind:this={inputElement}
            oninput={() => (hasError = false)}
            bind:value={otp}
            class="sr-only"
            type="text"
            inputmode="numeric" pattern="[0-9]*" maxlength="6"
          />
          {#if hasError}
            <div
              class="flex items-center gap-2 mt-3 text-red-400 font-semibold"
              transition:fly={{ y: -10, duration: 200 }}
            >
              <span>INVALID CODE.</span>
            </div>
          {/if}
        </div>
        <div class="card-actions w-full flex-col-reverse sm:flex-row-reverse gap-2 mt-6">
          <button class="btn btn-error text-black w-full" onclick={handleSubmit}>VERIFY</button>
          <button class="btn btn-ghost text-gray-400 w-full" onclick={handleCancelClick}>CANCEL</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
    /* Ensure these keyframe animations are available globally or within this component's scope */
    @keyframes entry-fade-in { from { opacity: 0; transform: scale(0.65); } to
                                    { opacity: 1; transform: scale(1); } }
    .animate-entry { animation: entry-fade-in 0.6s ease-out forwards; }
    @keyframes blink { 50% { opacity: 0; } }
    .animate-blink { animation: blink 0.8s infinite; }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake { animation: shake 0.5s ease-in-out; }
</style>