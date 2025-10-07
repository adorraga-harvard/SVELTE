<script lang="ts">
  import * as echarts from 'echarts';
  import { onMount } from 'svelte';

  // --- Props ---
  export let gridCoordinate: string = "Region 8 - Latitude 15.5 / Longitude 123.33";

  let chartDiv: HTMLDivElement;

  // --- Parse the input string ---
  function parseGridCoordinate(input: string) {
    // Regex to extract latitude and longitude
    const match = input.match(/Latitude\s*([-\d.]+)\s*\/\s*Longitude\s*([-\d.]+)/i);
    if (!match) return null;
    return {
      lat: parseFloat(match[1]),
      lon: parseFloat(match[2]),
      name: input.split('-')[0].trim() // take "Region 8"
    };
  }

  const location = parseGridCoordinate(gridCoordinate);

  onMount(async () => {
    if (!location) return;

    // Load geoJSON for Philippines (replace with actual JSON import or fetch)
    const response = await fetch('/geojson/philippines.json');
    const geoJsonData = await response.json();
    echarts.registerMap('philippines', geoJsonData);

    const chart = echarts.init(chartDiv);
    chart.setOption({
      geo: {
        map: 'philippines',
        roam: true,
        center: [location.lon, location.lat],
        zoom: 5,
        label: { show: true }
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [{ name: location.name, value: [location.lon, location.lat] }],
          symbolSize: 20,
          label: { show: true, formatter: '{b}' },
          itemStyle: { color: 'limegreen' }
        }
      ]
    });
  });
</script>

<div bind:this={chartDiv} class="w-full h-[500px]"></div>

<style>
  div {
    width: 100%;
    height: 500px;
  }
</style>
