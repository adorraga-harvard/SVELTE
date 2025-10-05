<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { fade } from 'svelte/transition';

  const geoFolder = '/etc/GEO/lowres/';
  export let dataSource: Record<string, number> = {};

  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts | null = null;

  let currentLevel: "country" | "region" | "province" = "country";
  let currentRegionId: string | null = null;
  let currentProvinceId: string | null = null;

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
  async function loadTSV(path: string): Promise<Record<string, number>> {
    try {
      const text = await fetch(path).then(r => {
        if (!r.ok) throw new Error(`Failed to load TSV data: ${r.statusText}`);
        return r.text();
      });
      const rows = text.trim().split('\n').slice(1);
      const map: Record<string, number> = {};
      rows.forEach(line => {
        const [region, count] = line.split('\t');
        if (region) map[region.toUpperCase()] = parseInt(count || '0');
      });
      return map;
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  function getRegionPSGC(regionName: string): string | null {
    const normalizedName = regionName.toUpperCase();
    return regionPSGCMap[normalizedName] || null;
  }

  // Normalize PSGC codes to a standard length
  function padPSGC(code: string, length = 10) {
    return code.padEnd(length, '0');
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
  async function renderMap(filename: string, level: "country" | "region" | "province") {
    const geoData = await loadGeoJSON(filename);
    const mapName = level === "country" ? "COUNTRY_MAP" : `MAP_${Date.now()}`;

    if (!chart) return;

    const seriesData = geoData.features.map((f: any) => {
      const nameKey = level === "country" ? "adm1_en" : level === "region" ? "adm2_en" : "adm3_en";
      const regionName = f.properties[nameKey]?.toUpperCase() || "";
      const value = dataSource[regionName] || 0;

      f.value = value;

      return {
        name: f.properties[nameKey] || f.properties.name,
        value: value,
        properties: f.properties,
      };
    });

    const featureValues = seriesData.map(d => d.value).filter(v => !isNaN(v));
    const finalMax = featureValues.length ? Math.max(...featureValues) : 100;

    echarts.registerMap(mapName, geoData);

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const name = params.name;
          const value = params.value || 0;
          return `
            <div style="padding:5px; font-weight:bold; font-size:14px; border-bottom:1px solid #ccc; margin-bottom:4px;">${name}</div>
            <div style="padding:0 5px; font-size:13px;">
              <span style="color:#666;">Total Incidents:</span>
              <span style="font-weight:bold; float:right;">${value.toLocaleString()}</span>
            </div>
          `;
        }
      },
      visualMap: {
        min: 0,
        max: finalMax,
        left: 'left',
        top: 'middle',
        orient: 'vertical',
        text: ['High', 'Low'],
        calculable: true,
        itemWidth: 50,
        itemHeight: 250,
        inRange: {
          color: [
            'rgba(255, 255, 153, 0.4)',
            'rgba(255, 153, 51, 0.5)',
            'rgba(204, 0, 0, 0.6)',
            'rgba(128, 0, 0, 0.8)'
          ]
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
        nameProperty: level === "country" ? "adm1_en" : level === "region" ? "adm2_en" : "adm3_en",
        label: { show: level !== "country", color: '#fff', fontSize: 10 },
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
        currentProvinceId = padPSGC(String(provincePsgc), 10);
        await renderMap(`provdists-province-${currentProvinceId}.0.001.json`, "province");
      }
    });
  }

  function backToCountry() {
    currentLevel = "country";
    currentRegionId = null;
    currentProvinceId = null;
    renderMap('country.0.001.json', "country");
  }

  onMount(async () => {
    dataSource = await loadTSV("/mapping/data_source.tsv");

    if (chartDiv) chart = echarts.init(chartDiv);
    await renderMap('country.0.001.json', "country");

    window.addEventListener('resize', () => chart?.resize());
    return () => {
      window.removeEventListener('resize', () => chart?.resize());
      chart?.dispose();
    }
  });
</script>

<div class="map-wrap relative">
  {#if currentLevel !== "country"}
    <button
      class="absolute left-1/2 top-4 transform -translate-x-1/2 bg-white border border-gray-300 rounded px-3 py-1 shadow text-sm z-20 hover:bg-gray-100 transition-colors"
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