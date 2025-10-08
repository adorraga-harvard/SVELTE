<script lang="ts">
  import { onMount } from 'svelte';

  let prompt = '';
  let response = '';
  let loading = false;
  let selectedModel = 'llama3';
  let listening = false;
  let recognition: SpeechRecognition | null = null;

  const models = {
    'llama3': {
      name: 'Llama 3 (Meta)',
      desc: 'Balanced all-rounder — great for reasoning, writing, and code assistance.',
      color: 'from-indigo-500 to-blue-600'
    },
    'mistral': {
      name: 'Mistral (Mistral AI)',
      desc: 'Fast and sharp — excellent for programming, logic, and data analysis.',
      color: 'from-emerald-500 to-teal-600'
    },
    'gemma': {
      name: 'Gemma 2B (Google DeepMind)',
      desc: 'Friendly conversationalist — ideal for chatbots and tone-sensitive writing.',
      color: 'from-rose-500 to-pink-600'
    }
  };

  async function sendPrompt() {
    if (!prompt.trim()) return;
    response = '';
    loading = true;

    try {
      const res = await fetch('https://ragaware.com/ai/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          prompt: prompt.trim()
        })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) response += json.response;
          } catch { /* ignore partial lines */ }
        }
      }
    } catch (err) {
      response = `⚠️ Error: ${(err as Error).message}`;
    } finally {
      loading = false;
    }
  }

  function clearAll() {
    prompt = '';
    response = '';
  }

  // 🎙️ Initialize Speech Recognition
  onMount(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        prompt = e.results[0][0].transcript;
        listening = false;
      };

      recognition.onerror = () => listening = false;
      recognition.onend = () => listening = false;
    }
  });

  function toggleVoiceInput() {
    if (!recognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }
    if (listening) {
      recognition.stop();
      listening = false;
    } else {
      recognition.start();
      listening = true;
    }
  }
</script>

<!-- 🌈 UI -->
<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4">
  <div class="max-w-2xl w-full space-y-6">

    <h1 class="text-4xl font-bold text-center mb-6">🤖 Ask <span class="text-blue-400">Ollama</span></h1>

    <!-- Model Selector -->
    <div class="bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-700">
      <label for="model" class="block text-sm font-semibold text-gray-300 mb-2">Select a Model:</label>
      <select id="model" bind:value={selectedModel}
        class="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {#each Object.keys(models) as key}
          <option value={key}>{models[key].name}</option>
        {/each}
      </select>

      <p class="mt-3 text-gray-400 text-sm">
        {models[selectedModel].desc}
      </p>
    </div>

    <!-- Prompt Input -->
    <div class="flex items-center space-x-2 bg-gray-800 rounded-2xl p-2 shadow-xl border border-gray-700">
      <input
        id="prompt"
        type="text"
        bind:value={prompt}
        placeholder="Type or dictate your prompt..."
        class="flex-1 rounded-xl bg-gray-900 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        on:keydown={(e) => e.key === 'Enter' && sendPrompt()} />

      <!-- 🎙️ Voice Button -->
      <button
        on:click={toggleVoiceInput}
        class={`px-4 py-3 rounded-xl font-semibold transition ${listening ? 'bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}>
        {listening ? 'Stop 🎤' : 'Speak 🎙️'}
      </button>

      <!-- 🧹 Clear Button -->
      <button
        on:click={clearAll}
        class="px-4 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 active:scale-95 transition">
        Clear
      </button>

      <button
        on:click={sendPrompt}
        class="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
        disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>

    <!-- Response Box -->
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-5 min-h-[200px] text-lg shadow-inner whitespace-pre-wrap">
      {#if response}
        {response}
      {:else if loading}
        <div class="animate-pulse text-gray-400">Generating response...</div>
      {:else}
        <span class="text-gray-500">Your answer will appear here...</span>
      {/if}
    </div>
  </div>
</div>

<style>
  input::placeholder {
    color: #9ca3af;
  }
</style>
