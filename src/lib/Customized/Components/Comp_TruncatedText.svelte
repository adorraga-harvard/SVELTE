<script lang="ts">
  export let text: string;
  const TRUNCATE_LENGTH = 50;
  $: truncated = text.slice(0, TRUNCATE_LENGTH);
  $: fullText = text;
</script>

<div class="relative group">
  <span class="text-base-content/80">
    {truncated}
  </span>
  <span class="badge badge-outline animate-blink badge-sm ml-1 cursor-help group-hover:bg-primary group-hover:text-primary-content">
    ...
  </span>
  <div class="absolute top-0 left-1/2 -translate-x-1/2 mt-8 z-50 p-2 bg-base-300 text-base-content rounded-md shadow-lg hidden group-hover:block w-max max-w-lg">
    <span class="text-xs">{fullText}</span>
  </div>
</div>