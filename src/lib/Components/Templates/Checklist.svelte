<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description",
    checklistItems: []
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <h2 class="project-card-title">{props.title || 'Process Checklist'}</h2>
    <p class="project-card-description">{props.description || 'Follow these steps to complete your request.'}</p>
    <ul class="steps steps-vertical lg:steps-horizontal mt-6">
      {#if props.checklistItems && props.checklistItems.length > 0}
        {#each props.checklistItems as item}
          <li data-content={item.content} class="step {item.statusClass}">{item.taskName}</li>
        {/each}
      {:else}
        <li class="step">Checklist not available.</li>
      {/if}
    </ul>
  </div>
</div>
