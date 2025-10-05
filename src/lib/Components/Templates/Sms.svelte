<script lang="ts">
  import { MailPlus, Check, X } from 'lucide-svelte';
  import * as Mock from '$lib/DataSources/DS_MockDataSource';

  export let props = {
    customClass: ""
  };

  let phoneNumber = '';
  let message = '';
  let isSending = false;
  let sentStatus: 'success' | 'error' | null = null;

  async function sendSms() {
    isSending = true;
    sentStatus = null;
    await new Promise(r => setTimeout(r, 1500)); // Simulate API call

    if (Math.random() > 0.1) {
      sentStatus = 'success';
      phoneNumber = '';
      message = '';
    } else {
      sentStatus = 'error';
    }
    isSending = false;
  }
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">Send SMS Notification</h2>
  <p>
    Use this tool to send important alerts and messages to the public or specific groups.
  </p>

  <form on:submit|preventDefault={sendSms} class="space-y-4">
    <div class="form-control">
      <label class="label" for="phone-number">
        <span class="label-text">Recipient Phone Number</span>
      </label>
      <input
        id="phone-number"
        type="tel"
        placeholder="e.g., 0917-123-4567"
        class="input input-bordered w-full"
        bind:value={phoneNumber}
        required
      />
    </div>

    <div class="form-control">
      <label class="label" for="message">
        <span class="label-text">Message</span>
      </label>
      <textarea
        id="message"
        class="textarea textarea-bordered h-24 w-full"
        placeholder="Type your message here..."
        bind:value={message}
        required
      ></textarea>
      <label class="label">
        <span class="label-text-alt">{160 - message.length} characters remaining</span>
      </label>
    </div>

    <div class="flex items-center gap-2">
      <button type="submit" class="btn btn-primary" disabled={isSending}>
        {#if isSending}
          <span class="loading loading-spinner"></span>
          Sending...
        {:else}
          <svelte:component this={MailPlus} class="w-5 h-5" />
          Send Message
        {/if}
      </button>

      {#if sentStatus === 'success'}
        <div class="text-success flex items-center gap-1 font-medium">
          <svelte:component this={Check} class="w-5 h-5" />
          Message sent successfully!
        </div>
      {:else if sentStatus === 'error'}
        <div class="text-error flex items-center gap-1 font-medium">
          <svelte:component this={X} class="w-5 h-5" />
          Failed to send message.
        </div>
      {/if}
    </div>
  </form>
</section>