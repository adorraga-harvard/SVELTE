<script lang="ts">
  import { FileText, Download, Eye } from 'lucide-svelte';
  import * as Mock from '$lib/DataSources/DS_MockDataSource';

  export let props = {
    customClass: ""
  };

  const documents = [
    {
      name: "Business Permit Checklist",
      type: "PDF",
      size: "2.1MB",
      uploaded: Mock.R_DATE(),
      link: "#"
    },
    {
      name: "LGU Annual Report",
      type: "PDF",
      size: "8.5MB",
      uploaded: Mock.R_DATE(),
      link: "#"
    },
    {
      name: "Citizen's Charter",
      type: "PDF",
      size: "3.4MB",
      uploaded: Mock.R_DATE(),
      link: "#"
    },
    {
      name: "Zoning Ordinance 2024",
      type: "PDF",
      size: "1.2MB",
      uploaded: Mock.R_DATE(),
      link: "#"
    },
    {
      name: "Public Market Service Form",
      type: "DOCX",
      size: "0.8MB",
      uploaded: Mock.R_DATE(),
      link: "#"
    }
  ];
</script>

<section class="prose max-w-none space-y-4 {props.customClass}">
  <h2 class="text-2xl font-bold mb-4">Official Document Hub</h2>
  <p>
    Browse and download official documents, forms, and reports from various LGU departments.
  </p>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Document Title</th>
          <th>Type</th>
          <th>Size</th>
          <th>Uploaded</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each documents as doc}
          <tr>
            <td>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-base-300 rounded-md">
                  <svelte:component this={FileText} class="w-6 h-6" />
                </div>
                <div>
                  <div class="font-bold">{doc.name}</div>
                </div>
              </div>
            </td>
            <td>{doc.type}</td>
            <td>{doc.size}</td>
            <td>{doc.uploaded}</td>
            <td>
              <div class="flex justify-center gap-2">
                <a href={doc.link} target="_blank" class="btn btn-ghost btn-circle btn-sm tooltip" data-tip="View Document">
                  <svelte:component this={Eye} class="w-5 h-5" />
                </a>
                <a href={doc.link} download class="btn btn-ghost btn-circle btn-sm tooltip" data-tip="Download">
                  <svelte:component this={Download} class="w-5 h-5" />
                </a>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>