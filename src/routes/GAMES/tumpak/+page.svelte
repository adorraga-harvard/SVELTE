<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  // --- Difficulty Levels ---
  const difficultyLevels = [
    { pegs: 2, label: 'WU' },
    { pegs: 3, label: '1' },
    { pegs: 4, label: '2' },
    { pegs: 5, label: '3' },
    { pegs: 6, label: '4' }
  ];

  // --- Constants ---
  const MAX_GUESSES = 10;

  // --- State ---
  let showSplashScreen = true;
  let gameMode = 'COLORS';
  let itemColorMap = new Map();
  let items = [];
  let secretCode = [];
  let guesses = [];
  let currentGuess = Array(2).fill(null);
  let gameStatusMessage = '';
  let isGameOver = false;
  let isSolved = false;
  let timerInterval;
  let timeElapsed = 0;
  let numPegs = 2;
  let level = 1;
  let activePegIndex = null;
  let palettePosition = { top: 0, left: 0 };
  let paletteSize = 224;
  let paletteRingRadius = 50;

  // --- Palettes ---
  const palettes = {
    COLORS: ["#FF0000","#0000FF","#008000","#FFFF00","#FFA500","#800080","#FFC0CB","#00FFFF","#A52A2A","#808080"],
    AGENCIES: ["PNP","ARMY","NAVY","AIR FORCE","PCG","NICA","PDEA","PSG","NBI"],
    ALPHABET: ["A","B","C","D","E","F","G","H","I","J","K","L"],
    NUMBERS: ["1","2","3","4","5","6","7","8","9","0"]
  };

  // --- Derived ---
  $: masterPalette = palettes[gameMode];
  $: displayedItems = shuffleArray(items);
  $: difficulty = numPegs > 2 ? numPegs - 2 : "Warm-Up";
  $: difficultyName = numPegs > 2 ? `Difficulty ${difficulty}` : "Warm-Up";
  $: nextButtonText = (level < 3) ? "NEXT LEVEL" : (numPegs < 6) ? "NEXT DIFFICULTY" : "YOU BEAT THE GAME!";

  // --- Helpers ---
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function buildItemColorMap() {
    itemColorMap.clear();
    palettes.COLORS.forEach((color) => itemColorMap.set(color, color));
    Object.keys(palettes).forEach(mode => {
      if (mode !== 'COLORS') {
        palettes[mode].forEach((item, index) => {
          itemColorMap.set(item, palettes.COLORS[index % palettes.COLORS.length]);
        });
      }
    });
  }

  function generateDynamicPalette() {
    const numItems = numPegs + (level - 1);
    const maxItems = Math.min(numItems, masterPalette.length);
    items = masterPalette.slice(0, maxItems);
  }

  function createSecretCode() {
    const availableItems = [...items];
    const newCode = [];
    for (let i = 0; i < numPegs; i++) {
      if (availableItems.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      newCode.push(availableItems[randomIndex]);
      availableItems.splice(randomIndex, 1);
    }
    return newCode;
  }

  // --- Timer ---
  function startTimer() {
    if (!timerInterval) {
      let startTime = Date.now();
      timerInterval = setInterval(() => {
        timeElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      }, 100);
    }
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // --- Game Flow ---
  function newGame() {
    buildItemColorMap();
    stopTimer();
    timeElapsed = 0;
    generateDynamicPalette();
    secretCode = createSecretCode();
    guesses = [];
    currentGuess = Array(numPegs).fill(null);
    gameStatusMessage = '';
    isGameOver = false;
    isSolved = false;
    activePegIndex = null;
  }

  function startGame() {
    showSplashScreen = false;
    newGame();
  }

  function setDifficulty(newNumPegs) {
    numPegs = newNumPegs;
    level = 1;
    newGame();
  }

  function advanceToNextStage() {
    if (level < 3) {
      level++;
    } else if (numPegs < 6) {
      numPegs++;
      level = 1;
    } else {
      level = 3;
      numPegs = 6;
    }
    newGame();
  }

  // --- Interaction ---
  function activatePeg(index, event) {
    if (isGameOver) return;
    activePegIndex = index;
    const rect = event.currentTarget.getBoundingClientRect();
    const pegDiameter = rect.width;
    const selectorButtonDiameter = 40;
    const gap = 8;

    paletteRingRadius = (pegDiameter / 2) + (selectorButtonDiameter / 2) + gap;
    const newPaletteDiameter = (paletteRingRadius + (selectorButtonDiameter / 2)) * 2;
    paletteSize = newPaletteDiameter;

    const pegCenterX = rect.left + rect.width / 2;
    const pegCenterY = rect.top + rect.height / 2;
    palettePosition = { top: pegCenterY - paletteSize / 2, left: pegCenterX - paletteSize / 2 };
  }

  function selectItem(item) {
    if (isGameOver || activePegIndex === null) return;
    if (guesses.length === 0 && currentGuess.every(peg => peg === null)) {
      startTimer();
    }
    currentGuess[activePegIndex] = item;
    currentGuess = [...currentGuess];
    activePegIndex = null;
  }

  function clearGuess() {
    if (isGameOver) return;
    currentGuess = Array(numPegs).fill(null);
    stopTimer();
    timeElapsed = 0;
  }

  function submitGuess() {
    if (isGameOver || currentGuess.some(peg => peg === null)) return;
    activePegIndex = null;

    let blackPegs = 0, whitePegs = 0;
    const tempSecretCode = [...secretCode];
    const tempCurrentGuess = [...currentGuess];

    // exact matches
    for (let i = 0; i < numPegs; i++) {
      if (tempCurrentGuess[i] === tempSecretCode[i]) {
        blackPegs++;
        tempCurrentGuess[i] = null;
        tempSecretCode[i] = null;
      }
    }
    // wrong-position matches
    for (let i = 0; i < numPegs; i++) {
      if (tempCurrentGuess[i] !== null) {
        const secretIndex = tempSecretCode.indexOf(tempCurrentGuess[i]);
        if (secretIndex !== -1) {
          whitePegs++;
          tempSecretCode[secretIndex] = null;
        }
      }
    }

    guesses = [...guesses, { pegs: currentGuess, blackPegs, whitePegs }];

    if (blackPegs === numPegs) {
      isGameOver = true;
      isSolved = true;
      stopTimer();
    } else if (guesses.length >= MAX_GUESSES) {
      isGameOver = true;
      stopTimer();
      gameStatusMessage = `Code not cracked!`;
    }

    currentGuess = Array(numPegs).fill(null);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (isSolved) {
        advanceToNextStage();
      } else if (activePegIndex !== null) {
        activePegIndex = null;
      }
    }
  }

  // --- Lifecycle ---
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/GAMES/tumpak/service-worker.js')
        .then(() => console.log('Tumpak SW registered'))
        .catch(err => console.error('SW registration failed', err));
    }
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="manifest" href="/GAMES/tumpak/manifest.webmanifest" />
  <meta name="theme-color" content="#ffcc00" />
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap" rel="stylesheet">
</svelte:head>

<svelte:window
  on:click={(e) => { if (activePegIndex !== null && !e.target.closest('.color-palette') && !e.target.closest('.guess-peg')) { activePegIndex = null; } }}
  on:keydown={handleKeydown}
/>

{#if showSplashScreen}
  <div class="splash-screen" transition:fade={{ duration: 300 }}>
    <div class="splash-content" transition:fly={{ y: 20, duration: 400 }}>
      <img src="/img/tumpak.png" alt="Tumpak Logo" class="w-4/5 max-w-xs mb-4" />

      <div class="splash-config-pane">
        <h2 class="splash-heading">Choose a Game Mode</h2>
        <div class="splash-mode-container">
          <button class="splash-mode-button" class:active={gameMode === 'COLORS'} on:click={() => gameMode = 'COLORS'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.35 0 2.65-.27 3.84-.75a.5.5 0 0 1 .6.55v.4c0 1.1.9 2 2 2h.5a.5.5 0 0 0 .5-.5v-2.08c1.3-.8 2.3-1.91 2.92-3.23a.5.5 0 0 0-.45-.69h-3.61a.5.5 0 0 1-.45-.69C19.98 6.43 16.3 2 12 2zm-1 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
            <span>Colors</span>
          </button>
          <button class="splash-mode-button" class:active={gameMode === 'AGENCIES'} on:click={() => gameMode = 'AGENCIES'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            <span>Agencies</span>
          </button>
          <button class="splash-mode-button" class:active={gameMode === 'ALPHABET'} on:click={() => gameMode = 'ALPHABET'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.35 18.78h2.09l.86-2.4h3.6l.86 2.4h2.09L12.5 5.22h-2zm3.3-3.85l1.64-4.55h.07l1.64 4.55z"/></svg>
            <span>Alphabet</span>
          </button>
          <button class="splash-mode-button" class:active={gameMode === 'NUMBERS'} on:click={() => gameMode = 'NUMBERS'}>
            <span class="splash-icon-text">1</span><span>Numbers</span>
          </button>
        </div>
        <div class="instructions mt-4">
          <p>Ready to crack the code? Here's what you need to know:</p>
          <div class="clue-box">
            <div class="clue-item">⚫ <strong>Black Pin:</strong> Correct Item & Position</div>
            <div class="clue-item">⚪ <strong>White Pin:</strong> Correct Item, Wrong Position</div>
          </div>
        </div>
      </div>
      <button class="mt-6 w-full font-bold text-xl py-3 px-6 bg-yellow-400 text-stone-800 rounded-lg shadow-lg hover:bg-yellow-300 transition-all" on:click={startGame}>Crack the Code!</button>
    </div>
  </div>
{/if}

{#if !showSplashScreen}
  <div class="game-container h-screen w-screen p-4 flex flex-col items-center justify-start mt-10">
    <div class="h-full w-full max-w-2xl mx-auto flex flex-col items-center">
      <div class="w-full flex justify-between items-center mb-6">
        <img src="/img/tumpak.png" alt="Tumpak Logo" class="w-32" />

        <div class="flex bg-stone-900/50 rounded-full p-1 shadow-inner">
          {#each difficultyLevels as dl}
            <button
              class={`w-10 h-10 font-bold rounded-full transition-all text-sm ${
                numPegs === dl.pegs
                  ? 'bg-yellow-400 text-stone-800 shadow-md'
                  : 'text-amber-200/70 hover:bg-stone-700/50'
              }`}
              on:click={() => setDifficulty(dl.pegs)}>
              {dl.label}
            </button>
          {/each}
        </div>
      </div>

      <div class="w-full max-w-sm p-2 mb-4 bg-stone-900/50 rounded-md text-center shadow-inner">
        <div class="flex justify-around items-center text-amber-100/80" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
          <div class="font-bold tracking-wider text-sm">{difficultyName}</div>
          <div class="w-px h-6 bg-amber-200/20"></div>
          <div class="font-bold tracking-wider text-sm">Level: <span class="text-yellow-400 font-extrabold text-lg">{level}</span></div>
        </div>
      </div>

      <div class="mastermind-panel p-4 rounded-box shadow-xl w-full flex-grow flex flex-col">
        <div class="flex-grow overflow-y-auto p-4">
          {#if guesses.length > 0}
            {#each guesses as guess, i}
              {@const feedbackPegsRaw = [...Array(guess.blackPegs).fill('black'), ...Array(guess.whitePegs).fill('white')]}
              {@const feedbackPegs = shuffleArray(feedbackPegsRaw)}
              <div class="history-row flex items-center gap-2 mb-2 p-4 rounded-box">
                <div class="font-bold text-xs w-12 text-center text-white opacity-50 flex-shrink-0">{i + 1}</div>
                <div class="flex-1 grid grid-flow-col auto-cols-fr gap-1 items-center">
                  {#each guess.pegs as item}
                    <!-- Added sphere-peg class for bulging effect -->
                    <div class="peg sphere-peg"
                      style={`background: radial-gradient(circle at 30% 30%, white, ${itemColorMap.get(item)})`}
                      class:w-24={numPegs===2} class:h-24={numPegs===2}
                      class:w-20={numPegs===3} class:h-20={numPegs===3}
                      class:w-14={numPegs===4} class:h-14={numPegs===4}
                      class:w-12={numPegs===5} class:h-12={numPegs===5}
                      class:w-10={numPegs===6} class:h-10={numPegs===6}>
                      {#if gameMode !== 'COLORS'}
                        <span class="text-label" class:text-label-agency={gameMode==='AGENCIES'} class:fs-2={numPegs===2} class:fs-3={numPegs===3} class:fs-4={numPegs===4} class:fs-5={numPegs===5} class:fs-6={numPegs===6}>{item}</span>
                      {/if}
                    </div>
                  {/each}
                </div>
                <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  <div class="feedback-pegs-container relative">
                    {#each Array(numPegs) as _, j}
                      {@const pegColor = feedbackPegs[j] || 'blank'}
                      {@const radius = 8 + numPegs}
                      {@const angle = (j * 360) / numPegs}
                      {@const x = radius * Math.cos(angle * Math.PI / 180)}
                      {@const y = radius * Math.sin(angle * Math.PI / 180)}
                      <div class="feedback-peg-circle absolute" style="transform: translate({x}px, {y}px);" class:is-black={pegColor === 'black'} class:is-white={pegColor === 'white'} class:is-blank={pegColor === 'blank'}></div>
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          {/if}

          {#if !isGameOver}
            <div class="mastermind-current-row p-4 rounded-box">
              <div class="flex items-center">
                <div class="w-16 flex-shrink-0 flex items-center justify-start">
                  {#if currentGuess.some(peg => peg !== null)}
                    <button class="btn-reset" on:click={clearGuess} title="Clear Guess" aria-label="Clear Guess">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                  {/if}
                </div>

                <div class="flex-1 grid grid-flow-col auto-cols-fr gap-1 items-center">
                  {#each currentGuess as item, i}
                    <button
                      type="button"
                      class="peg guess-peg sphere-peg"
                      on:click|stopPropagation={(e) => activatePeg(i, e)}
                      class:w-24={numPegs===2} class:h-24={numPegs===2}
                      class:w-20={numPegs===3} class:h-20={numPegs===3}
                      class:w-14={numPegs===4} class:h-14={numPegs===4}
                      class:w-12={numPegs===5} class:h-12={numPegs===5}
                      class:w-10={numPegs===6} class:h-10={numPegs===6}
                      class:border-white={activePegIndex === i} class:border-4={activePegIndex === i}
                      class:empty-peg={!item}
                      style={item ? `background: radial-gradient(circle at 30% 30%, white, ${itemColorMap.get(item)})` : ''}
                      aria-label={`Guess peg ${i + 1}, currently ${item || 'empty'}`}>
                      {#if item && gameMode !== 'COLORS'}
                        <span class="text-label" class:text-label-agency={gameMode==='AGENCIES'} class:fs-2={numPegs===2} class:fs-3={numPegs===3} class:fs-4={numPegs===4} class:fs-5={numPegs===5} class:fs-6={numPegs===6}>{item}</span>
                      {/if}
                    </button>
                  {/each}
                </div>

                <div class="w-16 flex-shrink-0 flex items-center justify-end">
                  <button class="push-btn px-3 py-1.5 rounded-md text-sm font-bold bg-teal-500 text-white shadow-md disabled:bg-gray-600" on:click={submitGuess} disabled={currentGuess.includes(null)}>BOLT IN</button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    {#if activePegIndex !== null}
      <div class="color-palette fixed z-50" style="top: {palettePosition.top}px; left: {palettePosition.left}px; width: {paletteSize}px; height: {paletteSize}px;">
        <div class="relative w-full h-full flex items-center justify-center">
          {#each displayedItems as item, i}
            {@const isUsed = currentGuess.includes(item)}
            {@const angle = (i * (360 / displayedItems.length)) - 90}
            {@const x = paletteRingRadius * Math.cos(angle * Math.PI / 180)}
            {@const y = paletteRingRadius * Math.sin(angle * Math.PI / 180)}
            <button class="palette-button" on:click={() => selectItem(item)} disabled={isUsed} style={`--translateX: ${x}px; --translateY: ${y}px;`} class:cursor-not-allowed={isUsed}>
              <div class="w-full h-full peg" style={`background: radial-gradient(circle at 30% 30%, white, ${itemColorMap.get(item)})`}>
                {#if gameMode !== 'COLORS'}
                  <!-- palette label uses improved palette label styling -->
                  <span class="text-label text-label-palette" class:text-label-agency={gameMode==='AGENCIES'}>{item}</span>
                {/if}
              </div>
              {#if isUsed}<div class="used-overlay">✓</div>{/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if isSolved}
      <div class="fixed inset-0 z-100 flex items-center justify-center" transition:fade={{ duration: 300 }} on:click={advanceToNextStage} role="dialog" aria-modal="true" tabindex="-1">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="solved-pane relative z-10 p-8 rounded-box shadow-2xl flex flex-col items-center justify-center text-center w-[90%] max-w-md overflow-hidden" transition:fly={{ y: 20, duration: 400, delay: 150 }}>
          <p class="tumpak-title font-title">TUMPAK!</p>
          <p class="text-lg text-stone-200 font-semibold my-6">You cracked the code in <br><span class="text-white font-bold text-xl">{timeElapsed} seconds!</span></p>
          <button class="font-bold text-lg py-3 px-6 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-400" on:click|stopPropagation={advanceToNextStage}>{nextButtonText}</button>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  :root {
    --font-body: 'Merriweather', serif;
    --font-title: 'Cinzel Decorative', cursive;

    --color-wood-dark: #38281d;
    --color-wood-mid:  #6d4c36;
    --color-wood-light:#a07b5f;
    --color-gold:      #f1c40f;
    --color-gold-dark: #c89d0b;
    --color-felt:      #004d40;
    --color-parchment: #f5eeda;
  }

  :global(body) { font-family: var(--font-body); }
  :global(div:focus), :global(button:focus) { outline: none; }
  :global(button, [role="button"]) { cursor: pointer; }

  .font-title { font-family: var(--font-title); }
  .title-shadow { text-shadow: 3px 3px 6px rgba(0,0,0,0.5); }

  .splash-screen {
    display: flex; align-items: center; justify-content: center; position: fixed; inset: 0;
    background-color: var(--color-wood-dark);
    background-image:
      linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)),
      linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1));
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    z-index: 100;
  }

  .game-container {
    background-color: var(--color-wood-dark);
    background-image:
      linear-gradient(135deg, #4a3424 25%, transparent 25%),
      linear-gradient(225deg, #4a3424 25%, transparent 25%),
      linear-gradient(45deg, #4a3424 25%, transparent 25%),
      linear-gradient(315deg, #4a3424 25%, var(--color-wood-dark) 25%);
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
  }

  .splash-content {
    display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 1rem; padding: 2rem; width: 90%; max-width: 500px;
  }

  .splash-heading { font-size: 1.25rem; font-weight: bold; color: white; text-align: center; margin-bottom: 1rem; }
  .splash-mode-container { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
  .splash-mode-button {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
    width: 6rem; height: 6rem; background-color: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px; color: #d4d4d8;
    transition: all 0.2s ease-in-out;
  }
  .splash-mode-button:hover { background-color: rgba(255,255,255,0.1); border-color: var(--color-gold); }
  .splash-mode-button.active { background-color: var(--color-gold); color: black; font-weight: bold; border-color: #fff; box-shadow: 0 0 15px var(--color-gold); }
  .splash-mode-button svg { width: 1.75rem; height: 1.75rem; }
  .splash-icon-text { font-size: 1.75rem; font-weight: bold; line-height: 1; }
  .instructions p { color: #d4d4d8; text-align: center; }
  .clue-box { background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 1rem; }
  .clue-item { color: #d4d4d8; }

  .peg {
    border-radius: 9999px;
    display: grid;
    place-items: center;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2);
    position: relative;
    /* ensure pseudo-elements are positioned properly */
    overflow: visible;
  }

  .guess-peg {
    border-width: 2px; border-style: solid;
    border-color: rgba(255,255,255,0.2);
    padding: 0; transition: box-shadow 0.2s ease-in-out;
  }
  .guess-peg:hover { box-shadow: 0 0 10px var(--color-gold); }
  .guess-peg.empty-peg {
    background-color: var(--color-wood-mid);
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.4);
  }

  /* text label used in many places (kept as-is but safe) */
  .text-label { color: white; font-weight: 900; text-align: center; line-height: 1;
    text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 2px 2px 4px rgba(0,0,0,0.8);
  }

  .fs-2 { font-size: 4rem; } .fs-3 { font-size: 3rem; } .fs-4 { font-size: 2.4rem; } .fs-5 { font-size: 2rem; } .fs-6 { font-size: 1.6rem; }
  .text-label-agency.fs-2 { font-size: 1.3rem; } .text-label-agency.fs-3 { font-size: 1.2rem; } .text-label-agency.fs-4 { font-size: 1.1rem; } .text-label-agency.fs-5 { font-size: 0.9rem; } .text-label-agency.fs-6 { font-size: 0.8rem; }

  /* ----- IMPROVED PALETTE LABEL (makes labels readable on any background) ----- */
  .text-label-palette {
    font-size: 0.75rem;
    /* ensure strong contrast and outline */
    color: #fff;
    -webkit-text-stroke: 0.9px rgba(0,0,0,0.9);
    text-shadow:
      0 1px 1px rgba(0,0,0,0.8),
      0 0 6px rgba(0,0,0,0.35);
    line-height: 1;
    pointer-events: none; /* labels shouldn't block clicks */
  }

  /* ----- SPHERE / BULGE EFFECT (applied only where we added sphere-peg class) ----- */
  .sphere-peg {
    position: relative;
    overflow: hidden; /* so pseudo highlights clip to circle */
    /* keep original background (inline radial gradient) — we overlay highlights/shadows */
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    /* small relief so it looks inset a bit in the hole */
    margin: 2px;
  }

  /* glossy highlight layer */
  .sphere-peg::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    pointer-events: none;
    /* subtle glossy top-left highlight */
    background: radial-gradient(circle at 28% 26%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 12%, rgba(255,255,255,0.02) 25%, transparent 45%);
    mix-blend-mode: overlay;
  }

  /* inner shading to create bulge + rim */
  .sphere-peg::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    pointer-events: none;
    /* inner shadows to create rounded depth */
    box-shadow:
      inset -6px -6px 12px rgba(0,0,0,0.45),
      inset 6px 6px 12px rgba(255,255,255,0.05),
      0 6px 14px rgba(0,0,0,0.35);
    opacity: 1;
  }

  /* ensure text inside sphere stays readable — give subtle stroke */
  .sphere-peg .text-label {
    -webkit-text-stroke: 0.6px rgba(0,0,0,0.9);
    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  }

  /* keep palette buttons' peg as normal (no bulge) */
  .palette-button .peg { overflow: visible; }

  .mastermind-panel { background: var(--color-wood-light); }
  .history-row { background-color: var(--color-wood-mid); border: 1px solid var(--color-wood-dark); }

  .mastermind-current-row {
    background: radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent),
                linear-gradient(to bottom, #D4AF37, #A0522D);
    border: 2px solid #8B4513;
  }

  .push-btn { animation: pulse 1s infinite; }
  .push-btn:hover { animation-play-state: paused; opacity: 0.8; }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

  .btn-reset {
    display: flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; border-radius: 9999px;
    background-color: rgba(153, 27, 27, 0.7); color: white;
    border: 1px solid rgba(255,255,255,0.3); transition: all 0.2s;
  }
  .btn-reset:hover { background-color: rgba(185, 28, 28, 1); transform: scale(1.1); }
  .btn-reset svg { width: 1rem; height: 1rem; }

  .feedback-pegs-container { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
  .feedback-peg-circle { width: 0.9rem; height: 0.9rem; border-radius: 9999px; position: absolute; top: 50%; left: 50%; margin-left: -0.45rem; margin-top: -0.45rem; }
  .feedback-peg-circle.is-blank { background-color: rgba(0,0,0,0.3); box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5); }
  .feedback-peg-circle.is-white { background: radial-gradient(circle, #fff, #ccc); border: 1px solid #999; }
  .feedback-peg-circle.is-black { background: radial-gradient(circle, #333, #000); border: 1px solid #444; }

  .solved-pane { background-color: var(--color-felt); border: 4px solid var(--color-gold);
    box-shadow: 0 0 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4);
  }
  .tumpak-title { font-size: 4rem; font-weight: 900; color: var(--color-gold);
    text-shadow: 0 0 20px rgba(255,215,0,0.5), 0 5px 5px rgba(0,0,0,0.5);
  }

  .palette-button {
    position: absolute; width: 40px; height: 40px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    border-radius: 9999px;
    transform: translate(var(--translateX), var(--translateY));
    transition: transform 0.2s ease;
  }
  .palette-button:hover {
    transform: translate(var(--translateX), var(--translateY)) scale(1.15);
    z-index: 10;
  }

  .used-overlay {
    position: absolute; inset: 0; display: grid; place-items: center;
    color: white; font-size: 1.2rem; font-weight: bold; text-shadow: 0 0 5px rgba(0,0,0,1);
    pointer-events: none;
  }
</style>
