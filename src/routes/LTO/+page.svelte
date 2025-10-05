<script lang="ts">
  import { onMount } from 'svelte';
  import Comp_LTOSummary from '$lib/Components/Comp_LTOSummary.svelte';

  // --- New Imports for Context Menu & Modal ---
  import { showContextMenu } from '$lib/Stores/Store_ContextMenu';
  import UI_ContextMenu from '$lib/UI/UI_ContextMenu.svelte';
  import Comp_InfoModal from '$lib/Components/Comp_InfoModal.svelte';
  import Comp_LGUSelector from '$lib/Components/Comp_LGUSelector.svelte';
  // --- End New Imports ---
  import Comp_QRTool from '$lib/Components/Comp_QRTool.svelte';
  import Comp_WebCam from '$lib/Components/Comp_WebCam.svelte';

  const baseUrl = '/LTO';
  const scaleFactor = 0.7;

  const portalItems = [
    { name: 'Purchase', type: 'iframe', path: `${baseUrl}/purchase` },
    { name: 'MAIN', type: 'div' },
    { name: 'Registration', type: 'iframe', path: `${baseUrl}/registration` },
    { name: 'Notary', type: 'iframe', path: `${baseUrl}/notary` },
    { name: 'Insurance', type: 'iframe', path: `${baseUrl}/insurance` },
    { name: 'Clearance', type: 'iframe', path: `${baseUrl}/clearance` },
  ];

  let showSplash = true; // Controls if splash screen element is in DOM
  let splashTransitioning = false; // Controls opacity fade-out
  let portalActive = false; // Controls portal grid opacity fade-in

  // --- Aggressive Debugging: Direct DOM references ---
  let splashScreenElement: HTMLDivElement;
  let portalGridElement: HTMLDivElement;
  // --- End Aggressive Debugging ---

  // --- New Local State for the Modals ---
  let showLGUSelectorModal = $state(false);
  let lguModalTitle = $state('Select Local Government Unit');
  let lguModalClasses = $state('lgu-modal-custom-class');
  let selectedLGUAddressFromModal: any = null;

  // State for QR Code Modal
  let showQRCodeModal = $state(false);
  let qrCodeModalTitle = $state('National ID QR Code Utility');
  let qrCodeModalClasses = $state('qr-code-modal-custom-class');
  let model ="";
  // --- End New Local State ---

  onMount(() => {
    console.log('onMount triggered!');

    const minSplashDuration = 5000;
    const fadeOutDuration = 1000;

    setTimeout(() => {
      console.log('First setTimeout fired! Setting splashTransitioning to true.');
      splashTransitioning = true; // This should start the fade-out transition via CSS

      // --- Aggressive Debugging: Force class and style properties ---
      if (splashScreenElement) {
        splashScreenElement.classList.add('fade-out'); // Force adding the class
        splashScreenElement.style.opacity = '0'; // Force opacity to 0
        splashScreenElement.style.pointerEvents = 'none'; // Force pointer-events to none
      }
      // --- End Aggressive Debugging ---

      setTimeout(() => {
        console.log('Second setTimeout fired! Setting showSplash=false, portalActive=true.');
        showSplash = false; // This removes splash screen from DOM

        // --- Aggressive Debugging: Ensure portal grid visibility ---
        portalActive = true;
        if (portalGridElement) {
          portalGridElement.classList.add('portal-active'); // Force adding the class
          portalGridElement.style.opacity = '1'; // Force opacity to 1
          portalGridElement.style.display = 'grid'; // Force display to grid (if not already)
        }
        // --- End Aggressive Debugging ---

      }, fadeOutDuration);
    }, minSplashDuration);
  });

  // --- New Context Menu Logic ---
  function handleContextMenu(event: MouseEvent) {
    event.preventDefault();

    const menuItems = [
      { id: 'lgu-selector', label: 'LGU Selector' },
      { id: 'web-cam', label: 'Web Cam' }, // Changed ID
      { id: 'qr-view', label: 'QR View' },     // Changed ID
      { id: 'web-cam-view', label: 'Web Cam View' }
    ];

    const onItemSelected = (id: string) => {
      console.log(`Context Menu Item Selected: ${id}`);
      switch (id) {
        case 'lgu-selector':
          model = "LGU Selector";
          showLGUSelectorModal = true;
          lguModalTitle = 'National ID Registration';
          lguModalClasses = 'large-lgu-modal';
          break;
        case 'web-cam':
          model = "Web Cam";
          showLGUSelectorModal = true;
          lguModalTitle = 'Web Cam Digital Studio';
          lguModalClasses = 'large-lgu-modal';
          break;

      case 'web-cam-view':
          model = "Web Cam View";
          showLGUSelectorModal = true;
          lguModalTitle = 'Web Cam Viewer';
          lguModalClasses = 'large-lgu-modal';
          break;

      case 'qr-view':
          model = "QR View";
          showLGUSelectorModal = true;
          lguModalTitle = 'QR Viewer';
          lguModalClasses = 'large-lgu-modal';
          break;

      }
    };

    showContextMenu(event.clientX, event.clientY, menuItems, onItemSelected);
  }
  // --- End New Context Menu Logic ---

  // --- New Modal Interaction Logic ---
  function handleLGUSelectorSelection(event: CustomEvent) {
    selectedLGUAddressFromModal = event.detail;
    console.log("LGU Address selected in modal:", selectedLGUAddressFromModal);
  }

  function handleInfoModalClose() {
    showLGUSelectorModal = false;
    showQRCodeModal = false; // Close QR Code modal as well
  }
  // --- End New Modal Interaction Logic ---
</script>

{#if showSplash || splashTransitioning}
<div class="splash-screen" bind:this={splashScreenElement} class:fade-out={splashTransitioning}>
  <div class="splash-content">
    <h1 class="splash-title"><span class=" text-6xl shady highlight-text text-amber-400"><u>filipin</u>.<u class="text-stone-200">us</u></span></h1>
        <h1 class="splash-title"><span class="highlight-text">Pinoy.ID</span> Expo</h1>
    <p class="splash-tagline">Your seamless gateway to <u class="s-cFxCADaBZFHO">essential public services</u>.</p>
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading secure services...</p>
    </div>
  </div>
</div>
{/if}

<div class="portal-wrapper" on:contextmenu={handleContextMenu} role="application">
  <div class="portal-grid" bind:this={portalGridElement} class:portal-active={portalActive}>
    {#each portalItems as item}
      <div class="portal-item-container" class:no-border={item.type === 'div'}>
        {#if item.type === 'iframe'}
          <div class="iframe-content-wrapper">
            <iframe
              src={item.path}
              title={`${item.name} Portal`}
              frameborder="0"
              allowfullscreen
              scrolling="no"
            ></iframe>
          </div>
        {:else if item.type === 'div' && item.name === 'MAIN'}
          <Comp_LTOSummary />
        {/if}
      </div>
    {/each}
  </div>
</div>

<UI_ContextMenu />

{#if showLGUSelectorModal}
  <Comp_InfoModal
    title={lguModalTitle}
    modalClasses={lguModalClasses}
    on:close={handleInfoModalClose}
  >
    {#if model === "LGU Selector"}
      <Comp_LGUSelector on:lguSelected={handleLGUSelectorSelection} />
    {/if}
    {#if model === "Web Cam"}
      <Comp_WebCam fullname="Amador Mainit Raga" national_id="12345678-07151965-5432"  />
    {/if}
    {#if model === "Web Cam View"}
      <img src="/pictures/national_id/12345678-07151965-5432.png"  alt="">
    {/if}
   {#if model === "QR View"}
      <img src="/pictures/national_id/1600203005-19881112-8824.qr" width="200px" alt="">
    {/if}
  </Comp_InfoModal>
{/if}

{#if showQRCodeModal}
  <Comp_InfoModal
    title={qrCodeModalTitle}
    modalClasses={qrCodeModalClasses}
    on:close={handleInfoModalClose}
  >
    <!-- Render the QR Code component inside the modal -->
    <Comp_QRTool />
  </Comp_InfoModal>
{/if}

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #eef2f5;
  }

  .portal-wrapper {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  /* --- Splash Screen Styles --- */
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d);
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
    opacity: 1;
    pointer-events: all;
    transition: opacity 1s ease-out; /* IMPORTANT for fading */
  }

  /* Keyframe for background gradient animation */
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .splash-screen.fade-out {
    opacity: 0 !important; /* Force opacity for debugging */
    pointer-events: none !important; /* Force pointer-events for debugging */
  }

  .splash-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    animation: fadeInScale 1s ease-out;
  }

  .splash-title {
    font-size: 4.5em;
    margin-bottom: 0.2em;
    text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.5);
    animation: pulseGlow 2s infinite alternate ease-in-out;
    letter-spacing: 2px;
  }
  @keyframes pulseGlow {
    from { text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.5); }
    to { text-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.8); }
  }

  .splash-content .highlight-text {
    color: #ffd700;
    font-weight: 700;
  }

  .splash-tagline {
    font-size: 1.5em;
    margin-bottom: 3em;
    opacity: 0.95;
    max-width: 600px;
    line-height: 1.4;
    font-weight: 300;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    animation: fadeInUp 1s ease-out 0.5s backwards;
  }

  /* Spinner container and loading text */
  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    animation: fadeInUp 1s ease-out 0.8s backwards;
  }

  .spinner {
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite, pulseColor 2s infinite alternate;
  }
  @keyframes pulseColor {
    0% { border-top-color: #fff; }
    50% { border-top-color: #ffd700; }
    100% { border-top-color: #fff; }
  }

  .loading-text {
    font-size: 1.1em;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 10px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  }

  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* --- Portal Grid & Item Styles --- */
  .portal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100vw;
    height: 100vh;
    gap: 8px;
    padding: 8px;
    box-sizing: border-box;
    background-color: #eef2f5;
    opacity: 0; /* Initially hidden, will fade in */
    transition: opacity 0.5s ease-in-out; /* IMPORTANT for fading */
  }

  .portal-grid.portal-active {
    opacity: 1 !important; /* Force opacity for debugging */
  }

  .portal-item-container {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .portal-item-container.no-border {
    border: none;
    box-shadow: none;
    background-color: transparent;
  }

  /* Specific grid placement for items */
  .portal-item-container:nth-child(1) { grid-area: 1 / 1; }
  .portal-item-container:nth-child(2) { grid-area: 1 / 2; }
  .portal-item-container:nth-child(3) { grid-area: 1 / 3; }
  .portal-item-container:nth-child(4) { grid-area: 2 / 1; }
  .portal-item-container:nth-child(5) { grid-area: 2 / 2; }
  .portal-item-container:nth-child(6) { grid-area: 2 / 3; }

  /* --- Iframe Specific Styles --- */
  .iframe-content-wrapper {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iframe-content-wrapper iframe {
    width: calc(100% / var(--scale-factor, 0.7));
    height: calc(100% / var(--scale-factor, 0.7));
    transform: translate(-50%, -50%) scale(var(--scale-factor, 0.7));
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  /* Custom modal class for QR Code component to adjust size */
  :global(.qr-code-modal-custom-class .modal-content) {
    max-width: 800px; /* Adjust as needed */
    width: 90%;
  }
</style>
