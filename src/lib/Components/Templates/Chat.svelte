<script lang="ts">
import * as Mock from '$lib/DataSources/DS_MockDataSource';

    // A single export 'props' for easy management.
    export let props = {
    customClass: ""
    };
</script>


<div class="project-card h-[36rem] flex flex-col">
  <div class="p-4 border-b border-base-300">
      <h2 class="card-title">Live Chat Support</h2>
      <p class="text-sm">Connected with: {Mock.randomName}</p>
  </div>
  <div class="project-card-body flex-grow p-4 space-y-4 overflow-y-auto bg-base-200">
    <div class="chat chat-start">
      <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-7.jpg" /></div></div>
      <div class="chat-bubble chat-bubble-secondary">Welcome to live support!</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-image avatar"><div class="w-10 rounded-full"><img src="/avatars/stock-user.jpg" /></div></div>
      <div class="chat-bubble chat-bubble-primary">Hello, I need assistance.</div>
    </div>
  </div>
  <div class="p-4 border-t bg-base-100"><input type="text" placeholder="Type your message..." class="input input-bordered w-full" /></div>
</div>
