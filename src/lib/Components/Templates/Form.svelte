<script lang="ts">
  import * as Mock from '$lib/DataSources/DS_MockDataSource';

  // Reusable props for shape, layout, and style
  export let props = {
    customClass: "w-full max-w-3xl", // default width + container size
    title: "Data Submission Form",
    description: "Please provide the necessary information below.",
    inputShape: "input-bordered", // alternatives: input-ghost, input-primary, etc.
    selectShape: "select-bordered",
    textareaShape: "textarea-bordered",
    layout: "vertical" // or "horizontal"
  };

  // mock pre-filled values
  let fullName = Mock.randomName();
  let department = Mock.randomDept();
  let departments = Mock.DEPARTMENTS; // all available options
</script>

<div class={`project-card ${props.customClass}`}>
  <div class="project-card-body">
    <div>
      <h2 class="project-card-title">{props.title}</h2>
      <p class="project-card-description">{props.description}</p>
    </div>
    <div class="project-card-divider"></div>

    <form method="POST" action="?/submit"
          class={props.layout === "horizontal"
                 ? "grid grid-cols-2 gap-6"
                 : "space-y-6"}>

      <!-- Full Name -->
      <div class="form-control w-full">
        <label class="label" for="fullName">
          <span class="label-text">Full Name</span>
        </label>
        <input type="text" id="fullName" bind:value={fullName}
               class={`input ${props.inputShape} w-full`} />
      </div>

<!-- Department -->
<div class="form-control w-full">
  <label class="label" for="department">
    <span class="label-text">Concerned Department</span>
  </label>
  <select id="department" bind:value={department}
          class={`select ${props.selectShape} w-full`}>
    {#each departments as dept}
      <option value={dept}>{dept}</option>
    {/each}
  </select>
</div>


      <!-- Reason -->
      <div class="form-control w-full col-span-2">
        <label class="label" for="reason">
          <span class="label-text">Reason for Request</span>
        </label>
        <textarea id="reason"
                  class={`textarea ${props.textareaShape} w-full min-h-[6rem]`}
                  placeholder="Please state your reason..."></textarea>
      </div>

      <!-- Comments -->
      <div class="form-control w-full col-span-2">
        <label class="label" for="comments">
          <span class="label-text">Additional Comments</span>
        </label>
        <textarea id="comments"
                  class={`textarea ${props.textareaShape} w-full min-h-[6rem]`}
                  placeholder="Any other comments..."></textarea>
      </div>

      <!-- Remarks -->
      <div class="form-control w-full col-span-2">
        <label class="label" for="remarks">
          <span class="label-text">Remarks</span>
        </label>
        <textarea id="remarks"
                  class={`textarea ${props.textareaShape} w-full min-h-[6rem]`}
                  placeholder="Final remarks..."></textarea>
      </div>

      <!-- Actions -->
      <div class="project-card-actions col-span-2 flex justify-end gap-2">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
</div>
