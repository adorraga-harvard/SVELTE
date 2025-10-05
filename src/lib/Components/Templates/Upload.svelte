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
  <div class="project-card-body items-center text-center">
    <h2 class="project-card-title">{props.title || 'File Upload'}</h2>
    <p class="project-card-description">{props.description || 'Submit your documents for processing.'}</p>
    <div class="w-full max-w-md p-8 mt-4 border-2 border-dashed border-base-300 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      <p class="mt-4 font-semibold">Drag & drop files here</p>
      <p class="text-sm text-base-content/60">PDF, JPG, PNG up to 10MB</p>
      <button class="btn btn-primary btn-sm mt-4">Or Click to Browse</button>
    </div>
  </div>
</div>
