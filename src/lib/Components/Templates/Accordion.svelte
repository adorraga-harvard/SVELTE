<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    faqItems: []
    };
</script>


<div class="space-y-2">
  {#if props.faqItems && props.faqItems.length > 0}
    {#each props.faqItems as item, i}
    <div class="collapse collapse-plus bg-base-200">
      <input type="radio" name="faq-accordion" checked={i === 0 ? 'checked' : null} /> 
      <div class="collapse-title text-xl font-medium">{item.question}</div>
      <div class="collapse-content"><div class="project-prose">{@html item.answer}</div></div>
    </div>
    {/each}
  {:else}
    <div class="text-center p-8 text-base-content/50">No FAQ items available.</div>
  {/if}
</div>
