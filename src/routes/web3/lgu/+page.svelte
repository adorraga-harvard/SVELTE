<script lang="ts">
  import { fade } from 'svelte/transition';

  type LGUType = 'Barangay' | 'Municipality' | 'City' | 'Province';

  const lguServices: Record<LGUType, Record<string, string[]>> = {
    Barangay: {
      'Administrative Services': [
        'Issuance of Barangay Clearance and Certificates',
        'Barangay ID, Residency, and Indigency Verification',
        'Maintenance of Barangay Records and Ordinances',
        'Community Tax Certificate (Cedula) Issuance'
      ],
      'Social and Community Services': [
        'Health and Nutrition Program (Barangay Health Center)',
        'Supplementary Feeding and Childcare Support',
        'Assistance to Senior Citizens and PWDs',
        'Barangay Disaster Response and First Aid'
      ],
      'Peace, Order, and Mediation': [
        'Barangay Tanod Operations',
        'Lupong Tagapamayapa Mediation and Settlement',
        'Curfew and Minor Offense Resolution'
      ],
      'Environmental Management': [
        'Barangay Cleanliness and Waste Collection',
        'Tree Planting and Drainage Maintenance'
      ]
    },

    Municipality: {
      'Economic and Business Services': [
        'Business Permits and Licensing (BPLO)',
        'Market, Slaughterhouse, and Terminal Management',
        'Public Infrastructure for Local Commerce'
      ],
      'Social and Health Services': [
        'Municipal Health Office and Sanitation Services',
        'Social Welfare, Senior Citizens, and PWD Assistance',
        'Daycare Center Management'
      ],
      'Infrastructure and Engineering': [
        'Local Roads, Bridges, and Drainage Maintenance',
        'Water Supply and Public Lighting Maintenance'
      ],
      'Agriculture and Environment': [
        'Agricultural and Fisheries Support',
        'Solid Waste Management and Recycling',
        'Local Disaster Risk Reduction and Response'
      ]
    },

    City: {
      'Urban and Infrastructure Development': [
        'Urban Planning and Zoning',
        'City Engineering and Road Works',
        'Building Permits and Code Enforcement'
      ],
      'Public Safety and Services': [
        'Traffic Management and Public Safety Enforcement',
        'City Health Office and Hospitals',
        'Fire and Rescue Coordination'
      ],
      'Social Welfare and Education': [
        'City Social Welfare and Development Office (CSWDO)',
        'Public Education, Libraries, and Scholarships',
        'Cultural, Sports, and Tourism Programs'
      ],
      'Environmental and Economic Development': [
        'Waste Management and Recycling Programs',
        'Business Investment Promotion Office (BIPO)',
        'Housing and Urban Development Programs'
      ]
    },

    Province: {
      'Health and Social Services': [
        'Provincial Hospitals and Health Programs',
        'Welfare and Livelihood Support',
        'Medical Missions and Outreach Services'
      ],
      'Infrastructure and Engineering': [
        'Provincial Roads and Bridges Maintenance',
        'Flood Control and Drainage Programs',
        'Public Buildings and Infrastructure Projects'
      ],
      'Economic and Agricultural Development': [
        'Tourism Promotion and Investment Support',
        'Agricultural Modernization and Farmer Assistance',
        'Fishery and Livestock Development Programs'
      ],
      'Governance and Fiscal Oversight': [
        'Provincial Budget and Resource Management',
        'Coordination with National Agencies',
        'Disaster Risk and Emergency Management'
      ]
    }
  };

  const lguOfficials: Record<LGUType, string[]> = {
    Barangay: [
      'Punong Barangay (Chairperson)',
      'Barangay Kagawad (Councilors)',
      'Barangay Secretary',
      'Barangay Treasurer',
      'Barangay Tanod Head'
    ],
    Municipality: [
      'Municipal Mayor',
      'Vice Mayor',
      'Sangguniang Bayan Members',
      'Municipal Administrator',
      'Municipal Engineer',
      'Municipal Health Officer'
    ],
    City: [
      'City Mayor',
      'Vice Mayor',
      'Sangguniang Panlungsod Members',
      'City Administrator',
      'City Treasurer',
      'City Planning and Development Officer'
    ],
    Province: [
      'Provincial Governor',
      'Vice Governor',
      'Provincial Board Members',
      'Provincial Administrator',
      'Provincial Engineer',
      'Provincial Health Officer'
    ]
  };

  let selectedLGU: LGUType | '' = '';
</script>

<div class="p-8 max-w-5xl mx-auto">
  <h1 class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
    Local Government Services Portal
  </h1>

  <div class="flex justify-center mb-8">
    <select
      bind:value={selectedLGU}
      class="select select-primary w-full max-w-xs text-lg"
    >
      <option value="" disabled selected>Select LGU Type</option>
      <option value="Barangay">Barangay</option>
      <option value="Municipality">Municipality</option>
      <option value="City">City</option>
      <option value="Province">Province</option>
    </select>
  </div>

  {#if selectedLGU}
    <div transition:fade class="space-y-8">
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-blue-700">
          {selectedLGU} Constituent Services
        </h2>

        {#each Object.entries(lguServices[selectedLGU]) as [group, items], i}
          <details class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-3" open={i === 0}>
            <summary class="collapse-title text-lg font-medium text-indigo-600 cursor-pointer">
              {group}
            </summary>
            <div class="collapse-content">
              <ul class="list-disc pl-6 space-y-1 text-gray-700">
                {#each items as service}
                  <li>{service}</li>
                {/each}
              </ul>
            </div>
          </details>
        {/each}
      </section>

      <section>
        <h3 class="text-2xl font-semibold mb-4 text-indigo-700">
          {selectedLGU} Key Officials
        </h3>

        <div class="overflow-x-auto rounded-xl shadow">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="bg-indigo-100 text-indigo-800">
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {#each lguOfficials[selectedLGU] as position}
                <tr><td>{position}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  {/if}
</div>
