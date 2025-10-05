<script lang="ts">
  import * as Mock from '$lib/DataSources/DS_MockDataSource';

    // A single export 'props' for easy management.
    export let props = {
    customClass: ""
    };
</script>


<section class="prose max-w-none space-y-4">
  <h2 class="text-2xl font-bold mb-2">{Mock.randomName()}'s Report</h2>
  <p>
    This article, prepared by <strong>{Mock.randomDept()}</strong>,
    provides a detailed review of the ongoing project 
    at <em>{Mock.randomLocation()}</em>.
  </p>
  <p>
    Current status: 
    <span class="badge {Mock.randomStatus().badge}">{Mock.randomStatus().label}</span>
  </p>
  <p>
    Latest task update: {Mock.randomTask()} ({Mock.R_DATE()} {Mock.R_TIME()})
  </p>
</section>
  