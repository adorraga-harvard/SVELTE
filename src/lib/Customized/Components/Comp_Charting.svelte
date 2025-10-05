<script lang="ts">
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import * as echarts from 'echarts/core';
  import { BarChart, PieChart, LineChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';

  echarts.use([BarChart, PieChart, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

  const dispatch = createEventDispatcher();

  const CHART_TYPES = [
    { value: 'bar_v', label: 'Vertical Bar' },
    { value: 'bar_h', label: 'Horizontal Bar' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'donut', label: 'Donut Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area', label: 'Area Chart' }
  ];

  export let data: any[] = [];
  export let xKey: string = '';
  export let yKey: string = '';
  export let chartType: string = '';

  let chartContainer: HTMLDivElement;
  let chart: echarts.ECharts | null = null;

  // Palette
  const colorPalette = [
    '#5470C6','#91CC75','#EE6666','#73C0DE','#FAC858',
    '#3BA272','#FC8452','#9A60B4','#EA7CCC','#FF9F7F',
    '#2EC7C9','#B6A2DE','#5AB1EF','#FFB980','#D87A80',
    '#8D98B3','#E5CF0D','#97B552','#95706D','#DC69AA',
    '#07A2A4','#9A7FD1'
  ];

  // canonical lists
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const DAYS_LC = DAYS.map(d => d.toLowerCase());
  const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const MONTHS_LC = MONTHS.map(m => m.toLowerCase());

  // abbrev maps
  const MONTH_ABBREV: Record<string,string> = {
    jan: 'january', feb: 'february', mar: 'march', apr: 'april',
    may: 'may', jun: 'june', jul: 'july', aug: 'august',
    sep: 'september', sept: 'september', oct: 'october',
    nov: 'november', dec: 'december'
  };
  const DAY_ABBREV: Record<string,string> = {
    sun: 'sunday', mon: 'monday', tue: 'tuesday', tues: 'tuesday',
    wed: 'wednesday', thu: 'thursday', thur: 'thursday', thurs: 'thursday',
    fri: 'friday', sat: 'saturday'
  };

  // processed arrays used for chart
  let procCategories: string[] = [];
  let procValues: number[] = [];
  let procSeriesForPie: Array<{name:string, value:number}> = [];

  // helper: detect keys if not provided
  function detectKeys(sample: any) {
    if (!sample) return;
    const keys = Object.keys(sample);
    if (!xKey) {
      // choose category-like key
      xKey = keys.find(k => /category|label|name|group|key/i.test(k)) ?? keys[0];
    }
    if (!yKey) {
      yKey = keys.find(k => /quantity|count|value|sum|qty|total/i.test(k)) ?? keys[1] ?? keys[0];
    }
  }

  function normalizeRawCategory(raw: any): string {
    if (raw == null) return 'Unknown';
    let s = String(raw).trim();
    s = s.replace(/\s+/g, ' ');

    // lowercase for mapping
    let lc = s.toLowerCase();

    // map day abbrev -> full
    if (DAY_ABBREV[lc]) lc = DAY_ABBREV[lc];
    // map month abbrev -> full
    if (MONTH_ABBREV[lc]) lc = MONTH_ABBREV[lc];

    // try to capitalize nicely
    // if it's 'dayofweek' or 'dayofweek' style join parts:
    // replace separators like '-' and camelCase detection:
    lc = lc.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').trim();

    // Title case
    const title = lc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return title;
  }

  function buildProcessedData() {
    procCategories = [];
    procValues = [];
    procSeriesForPie = [];

    if (!Array.isArray(data) || data.length === 0) return;

    detectKeys(data[0]);

    // build normalized map and aggregate duplicates
    const map = new Map<string, number>();
    const orderSeen: string[] = []; // preserve insertion order for fallback ordering

    for (const row of data) {
      const rawCat = row[xKey];
      const norm = normalizeRawCategory(rawCat);
      const num = Number(row[yKey]) || 0;

      if (!map.has(norm)) {
        map.set(norm, num);
        orderSeen.push(norm);
      } else {
        map.set(norm, map.get(norm)! + num);
      }
    }

    // Decide if categories are days or months (use lowercase membership)
    const keys = Array.from(map.keys());
    const keysLc = keys.map(k => k.toLowerCase());

    const allDays = keysLc.every(k => DAYS_LC.includes(k));
    const allMonths = keysLc.every(k => MONTHS_LC.includes(k));

    let sortedKeys: string[] = [];

    if (allDays) {
      // sort by DAYS order
      const order = new Map(DAYS_LC.map((d,i) => [d, i]));
      sortedKeys = keys.slice().sort((a,b) => order.get(a.toLowerCase())! - order.get(b.toLowerCase())!);
    } else if (allMonths) {
      const order = new Map(MONTHS_LC.map((m,i) => [m, i]));
      sortedKeys = keys.slice().sort((a,b) => order.get(a.toLowerCase())! - order.get(b.toLowerCase())!);
    } else {
      // fallback: preserve original seen order
      sortedKeys = orderSeen;
    }

    // Build final arrays
    for (const k of sortedKeys) {
      const v = map.get(k) ?? 0;
      procCategories.push(k);
      procValues.push(v);
      procSeriesForPie.push({ name: k, value: v });
    }
  }

  // draw chart with processed data
  function drawChart() {
    if (!chart || !Array.isArray(data) || data.length === 0) {
      // clear and show no-data layer
      chart?.clear();
      return;
    }

    buildProcessedData();

    // default chartType heuristics if not provided
    const count = procCategories.length;
    if (!chartType) {
      chartType = count <= 10 ? 'pie' : (count > 20 ? 'bar_h' : 'bar_v');
    }

    const hideLabels = procCategories.length > 20;
    const colorMap = procCategories.map((_, i) => colorPalette[i % colorPalette.length]);

    let option: any = {};

    switch (chartType) {
      case 'bar_v':
        option = {
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: procCategories, axisLabel: { rotate: hideLabels ? 0 : -45, interval: 0, show: !hideLabels } },
          yAxis: { type: 'value' },
          series: [{
            type: 'bar',
            data: procValues.map((v, i) => ({ value: v, itemStyle: { color: colorMap[i] } })),
            emphasis: { focus: 'series' }
          }]
        };
        break;

      case 'bar_h':
        option = {
          tooltip: { trigger: 'axis' },
          yAxis: { type: 'category', data: procCategories, axisLabel: { show: !hideLabels } },
          xAxis: { type: 'value' },
          series: [{
            type: 'bar',
            data: procValues.map((v, i) => ({ value: v, itemStyle: { color: colorMap[i] } })),
            emphasis: { focus: 'series' }
          }]
        };
        break;

      case 'pie':
      case 'donut':
        option = {
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          series: [{
            type: 'pie',
            radius: chartType === 'donut' ? ['40%', '70%'] : '70%',
            data: procSeriesForPie.map((d, i) => ({ name: d.name, value: d.value, itemStyle: { color: colorMap[i] } })),
            label: { formatter: '{b}: {c} ({d}%)', fontSize: 12, color: '#000' },
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }
          }]
        };
        break;

      case 'line':
      case 'area':
        option = {
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: procCategories },
          yAxis: { type: 'value' },
          series: [{
            type: 'line',
            data: procValues.map((v, i) => ({ value: v, itemStyle: { color: colorMap[i] } })),
            areaStyle: chartType === 'area' ? {} : null,
            smooth: true,
            emphasis: { focus: 'series' }
          }]
        };
        break;

      default:
        console.error('Unknown chart type:', chartType);
        return;
    }

    chart.clear();
    chart.setOption(option);

    chart.off('click');
    chart.on('click', params => {
      // params may vary by chart type
      let name = params.name ?? (params.data && params.data.name) ?? null;
      let value = params.value ?? (params.data && params.data.value) ?? null;
      dispatch('selectCategory', { category: name, value });
    });
  }

  function initChart() {
    if (!chartContainer) return;
    if (!chart) {
      chart = echarts.init(chartContainer);
    }
    drawChart();
  }

  let resizeHandler = () => chart?.resize();

  onMount(() => {
    initChart();
    window.addEventListener('resize', resizeHandler);
  });

  afterUpdate(() => {
    // redraw when data or chartType change
    drawChart();
  });

  onDestroy(() => {
    window.removeEventListener('resize', resizeHandler);
    chart?.dispose();
    chart = null;
  });
</script>

<div class="relative w-full h-full">
  <div class="absolute top-2 right-4 z-10">
    <label for="chart-type-select" class="label">
      <span class="label-text text-xs text-gray-500 mr-2 hidden sm:inline">Chart Type:</span>
    </label>
    <select
      id="chart-type-select"
      class="select select-sm select-bordered w-full max-w-xs bg-white shadow-md"
      bind:value={chartType}
    >
      {#each CHART_TYPES as type}
        <option value={type.value}>{type.label}</option>
      {/each}
    </select>
  </div>

  <div bind:this={chartContainer} class="chart-wrapper"></div>

  {#if !Array.isArray(data) || data.length === 0}
    <div class="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      No data available to generate chart.
    </div>
  {/if}
</div>

<style>
  .chart-wrapper {
    width: 100%;
    height: 100%;
  }

  :global(.select) {
    z-index: 10;
  }
</style>
