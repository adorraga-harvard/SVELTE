<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { fade } from 'svelte/transition';

  const geoFolder = '/etc/GEO/lowres/';
  export let dataSource: {category: string; quantity: number}[] = [];

  console.log('Component initialized. Data source:', dataSource);
  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts | null = null;
  let dataMap: Record<string, number> = {};

  // Reactive statement to convert the array into a map for quick lookups
  $: {
    dataMap = {};
    dataSource.forEach(d => {
      // Normalize and trim the data source key to ALL CAPS for consistent lookup
      const normalizedCategory = d.category.toUpperCase().trim();
      dataMap[normalizedCategory] = d.quantity;
    });
    // Trigger a map re-render when the data map changes
    if (chart && Object.keys(dataMap).length > 0) {
      if (currentLevel === "country") {
        renderMap('country.0.001.json', "country");
      }
    }
  }

  let currentLevel: "country" | "region" | "province" | "municity" | "barangay" = "country";
  let currentRegionId: string | null = null;
  let currentProvinceId: string | null = null;
  let currentMunicityId: string | null = null;
  let currentBarangayId: string | null = null;

  let showVisualMapHelp = false;

  // Add a mapping for regions to their PSGC codes
  const regionPSGCMap: Record<string, string> = {
    "REGION I (ILOCOS REGION)": "100000000",
    "REGION II (CAGAYAN VALLEY)": "200000000",
    "REGION III (CENTRAL LUZON)": "300000000",
    "REGION IV-A (CALABARZON)": "400000000",
    "MIMAROPA REGION": "1700000000",
    "REGION V (BICOL REGION)": "500000000",
    "REGION VI (WESTERN VISAYAS)": "600000000",
    "NEGROS ISLAND REGION": "1800000000",
    "REGION VII (CENTRAL VISAYAS)": "700000000",
    "REGION VIII (EASTERN VISAYAS)": "800000000",
    "REGION IX (ZAMBOANGA PENINSULA)": "900000000",
    "REGION X (NORTHERN MINDANAO)": "1000000000",
    "REGION XI (DAVAO REGION)": "1100000000",
    "REGION XII (SOCCSKSARGEN)": "1200000000",
    "NATIONAL CAPITAL REGION (NCR)": "1300000000",
    "CORDILLERA ADMINISTRATIVE REGION (CAR)": "1400000000",
    "BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO (BARMM)": "1900000000",
    "REGION XIII (CARAGA)": "1600000000",
  };

  // ---------------------------
  // Helpers
  // ---------------------------
  function getRegionPSGC(regionName: string): string | null {
    const normalizedName = regionName.toUpperCase();
    return regionPSGCMap[normalizedName] || null;
  }

  // Normalize PSGC codes to a standard length
  function padPSGC(code: string, length = 10) {
    return code.padEnd(length, '0');
  }

  // A more robust function to normalize GeoJSON names
  function normalizeRegionNames(name: string): string[] {
    const allCaps = name.toUpperCase().trim();
    let normalizedNames = [allCaps]; // Always include the original, trimmed name

    // Check for the format 'REGION X (NAME)'
    const regionNameMatch = allCaps.match(/REGION [IVXLC]+ \(([^)]+)\)/);
    if (regionNameMatch && regionNameMatch[1]) {
      normalizedNames.push(regionNameMatch[1].trim());
    }

    // Check for names with an acronym in parentheses
    const acronymMatch = allCaps.match(/(.+)\s+\((.+)\)/);
    if (acronymMatch && acronymMatch[1] && acronymMatch[2]) {
      // GeoJSON name outside of the parentheses
      normalizedNames.push(acronymMatch[1].trim());
      // GeoJSON name inside the parentheses
      normalizedNames.push(acronymMatch[2].trim());
    }

    // Check for names with a trailing 'REGION'
    if (allCaps.endsWith(' REGION')) {
      normalizedNames.push(allCaps.replace(' REGION', '').trim());
    }

    // Return a unique array of names to check, starting with the most specific match
    return [...new Set(normalizedNames)];
  }

  // ---------------------------
  // Load GeoJSON
  // ---------------------------
  async function loadGeoJSON(filename: string): Promise<any> {
    const res = await fetch(`/api/GEO/${filename}`);
    if (!res.ok) throw new Error('GeoJSON file not found');
    return res.json();
  }

  // ---------------------------
  // Render Map
  // ---------------------------
  async function renderMap(filename: string, level: "country" | "region" | "province" | "municity" | "barangay") {
    if (!chartDiv) return;
    if (!chart) chart = echarts.init(chartDiv);

    const geoData = await loadGeoJSON(filename);
    const mapName = level === "country" ? "COUNTRY_MAP" : `MAP_${Date.now()}`;

    const seriesData = geoData.features.map((f: any) => {
      let nameKey: string;
      if (level === "country") nameKey = "adm1_en";
      else if (level === "region") nameKey = "adm2_en";
      else if (level === "province") nameKey = "adm3_en";
      else if (level === "municity") nameKey = "adm4_en";
      else nameKey = "adm4_en";

      const geoJsonName = f.properties[nameKey]?.toUpperCase() || "";

      const normalizedNames = normalizeRegionNames(geoJsonName);

      let value = 0;
      for (const name of normalizedNames) {
        if (dataMap[name] !== undefined) {
          value = dataMap[name];
          break;
        }
      }

      return {
        name: f.properties[nameKey] || f.properties.name,
        value: value,
        properties: f.properties,
      };
    });

    const featureValues = seriesData.map(d => d.value).filter(v => !isNaN(v) && v > 0);
    const finalMin = featureValues.length ? Math.min(...featureValues) : 0;
    const finalMax = featureValues.length ? Math.max(...featureValues) : 100;

    let colorRange;
    if (dataSource && dataSource.length > 0) {
      colorRange = ['#FFFF99', '#FF9933', '#CC0000', '#800000'];
    } else {
      colorRange = ['#a5abb6', '#c9cfd8', '#f2f4f8', '#8f95a2', '#7b8089', '#5b6169'];
    }

    echarts.registerMap(mapName, geoData);

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const name = params.name;
          const value = params.value || 0;
          return `
            <div style="padding:5px; font-weight:bold; font-size:14px; border-bottom:1px solid #ccc; margin-bottom:4px;">${name}</div>
            <div style="padding:0 5px; font-size:12px; color: #333;">
              <span style="color:#666;">Total Incidents:</span>
              <span style="font-weight:bold; float:right;">${value.toLocaleString()}</span>
            </div>
          `;
        }
      },
      visualMap: {
        min: finalMin,
        max: finalMax,
        left: 'left',
        top: 'middle',
        orient: 'vertical',
        text: ['High', 'Low'],
        textStyle: {
          color: '#333'
        },
        calculable: true,
        itemWidth: 50,
        itemHeight: 250,
        inRange: {
          color: colorRange
        },
        formatter: (v, i) => i === 0 ? 'Drag handles to filter' : `${v}+`
      },
      series: [{
        type: "map",
        map: mapName,
        roam: true,
        data: seriesData,
        layoutCenter: ['50%', '50%'],
        layoutSize: '95%',
        nameProperty: level === "country" ? "adm1_en" : level === "region" ? "adm2_en" : level === "province" ? "adm3_en" : level === "municity" ? "adm4_en" : "adm4_en",
        label: {
          show: level !== "country",
          color: '#333',
          fontSize: 8
        },
        itemStyle: {
          borderColor: '#000',
          borderWidth: 1,
          areaColor: 'rgba(255, 255, 255, 0.1)'
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(255, 215, 0, 0.6)',
            borderColor: '#FF4500',
            borderWidth: 2
          }
        }
      }]
    }, true);

    // --- Click handler ---
    chart.off("click");
    chart.on("click", async (params: any) => {
      if (level === "country") {
        const clickedData = params.data || {};
        const regionName = clickedData.properties?.adm1_en;
        const psgcId = getRegionPSGC(regionName);

        if (!psgcId) {
          console.error("PSGC ID not found for region:", regionName);
          return;
        }

        currentLevel = "region";
        currentRegionId = psgcId;
        await renderMap(`provdists-region-${currentRegionId}.0.001.json`, "region");
      } else if (level === "region") {
        const clickedData = params.data || {};
        const provincePsgc = clickedData.properties?.adm2_psgc;
        if (!provincePsgc) return;

        currentLevel = "province";
        currentProvinceId = provincePsgc;
        await renderMap(`municities-provdist-${currentProvinceId}.0.001.json`, "province");
      } else if (level === "province") {
        const clickedData = params.data || {};
        const municityPsgc = clickedData.properties?.adm3_psgc;
        if (!municityPsgc) return;

        currentLevel = "municity";
        currentMunicityId = municityPsgc;
        await renderMap(`bgysubmuns-municity-${currentMunicityId}.0.001.json`, "municity");
      } else if (level === "municity") {
        const clickedData = params.data || {};
        const barangayPsgc = clickedData.properties?.adm4_psgc;
        if (!barangayPsgc) return;

        currentLevel = "barangay";
        currentBarangayId = barangayPsgc;
        await renderMap(`bgysubmuns-municity-${currentMunicityId}.0.001.json`, "barangay");
      }
    });
  }

  function backToCountry() {
    currentLevel = "country";
    currentRegionId = null;
    currentProvinceId = null;
    currentMunicityId = null;
    renderMap('country.0.01.json', "country");
  }

  onMount(async () => {
    if (chartDiv) {
      chart = echarts.init(chartDiv);
      window.addEventListener('resize', () => chart?.resize());
    }

    await renderMap('country.0.001.json', "country");

    return () => {
      window.removeEventListener('resize', () => chart?.resize());
      chart?.dispose();
    }
  });
</script>

<div class="map-wrap relative">
  {#if currentLevel !== "country"}
    <button
      class="absolute left-1/2 top-4 transform -translate-x-1/2 bg-gray-800 text-white font-bold border-2 border-gray-600 rounded-md px-4 py-2 shadow-lg text-sm z-30 hover:bg-gray-700 transition-colors"
      on:click={backToCountry}
      aria-label="Back to country view"
    >
      ⬅ Back
    </button>
  {/if}

  <div class="relative w-full h-[100vh]">
    <div bind:this={chartDiv} class="w-full h-full"></div>

    <div
      class="absolute left-4 z-30 cursor-help"
      style="top: calc(50% - 125px);"
      on:mouseenter={() => showVisualMapHelp = true}
      on:mouseleave={() => showVisualMapHelp = false}
    >
      {#if showVisualMapHelp}
        <div class="visual-map-tooltip" transition:fade>
          <div class="tooltip-header">Visual Map Filter</div>
          <p class="text-gray-700 text-sm">
            Drag the handles to dynamically filter the map's data range.
          </p>
          <ul class="mt-2 space-y-1 text-sm text-gray-800">
            <li>Regions outside the selected range appear <strong>grayed out</strong>.</li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .map-wrap {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    background: linear-gradient(to bottom, #001f3f, #003366, #0055a5);
  }
  .visual-map-tooltip {
    position: absolute;
    left: 40px;
    width: 280px;
    background-color: white;
    border: 1px solid #a8b0c0;
    border-radius: 8px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
    padding: 12px;
    z-index: 100;
    pointer-events: auto;
  }
  .tooltip-header {
    font-weight: 700;
    font-size: 1.05em;
    color: #1d4ed8;
    margin-bottom: 6px;
    padding-bottom: 3px;
    border-bottom: 1px solid #3b82f6;
  }
</style>