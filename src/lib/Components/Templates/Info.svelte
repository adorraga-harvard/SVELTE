<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description"
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <div class="project-prose">
      <h1>{props.title || 'Information Hub'}</h1>
      <p>{props.description || 'This document provides key information and guidelines.'}</p>
    </div>
  </div>
</div>
