<script lang="ts">
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import * as echarts from 'echarts/core';
  import { BarChart, PieChart, LineChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { fade } from 'svelte/transition';
  import { BarChart2, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp, CircleDashed } from 'lucide-svelte';

  echarts.use([BarChart, PieChart, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

  const dispatch = createEventDispatcher();

  const CHART_TYPES = [
    { value: 'bar_v', label: 'Vertical Bar', icon: BarChart2, color: 'text-blue-500' },
    { value: 'bar_h', label: 'Horizontal Bar', icon: BarChart3, color: 'text-green-500' },
    { value: 'pie', label: 'Pie Chart', icon: PieChartIcon, color: 'text-yellow-500' },
    { value: 'donut', label: 'Donut Chart', icon: CircleDashed, color: 'text-orange-500' },
    { value: 'line', label: 'Line Chart', icon: LineChartIcon, color: 'text-red-500' },
    { value: 'area', label: 'Area Chart', icon: TrendingUp, color: 'text-purple-500' }
  ];

  export let data: any[] = [];
  export let xKey: string = '';
  export let yKey: string = '';
  export let chartType: string = '';

  let chartContainer: HTMLDivElement;
  let chart: echarts.ECharts | null = null;
  let currentTheme: 'light' | 'dark' = 'light';

  function detectTheme() {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }
  }

  let themeColors = {
    textColor: '#333',
    tooltipBg: 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: '#ccc',
    labelColor: '#333',
    lineColor: '#6e7079'
  };

  $: {
    if (currentTheme === 'dark') {
      themeColors = {
        textColor: '#e5e5e5',
        tooltipBg: 'rgba(51, 51, 51, 0.9)',
        tooltipBorder: '#666',
        labelColor: '#e5e5e5',
        lineColor: '#aaa'
      };
    } else {
      themeColors = {
        textColor: '#333',
        tooltipBg: 'rgba(255, 255, 255, 0.9)',
        tooltipBorder: '#ccc',
        labelColor: '#333',
        lineColor: '#6e7079'
      };
    }
  }

  const colorPalette = [
    '#5470C6','#91CC75','#EE6666','#73C0DE','#FAC858',
    '#3BA272','#FC8452','#9A60B4','#EA7CCC','#FF9F7F',
    '#2EC7C9','#B6A2DE','#5AB1EF','#FFB980','#D87A80',
    '#8D98B3','#E5CF0D','#97B552','#95706D','#DC69AA',
    '#07A2A4','#9A7FD1'
  ];

  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const DAYS_LC = DAYS.map(d => d.toLowerCase());
  const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const MONTHS_LC = MONTHS.map(m => m.toLowerCase());

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

  let procCategories: string[] = [];
  let procValues: number[] = [];
  let procSeriesForPie: Array<{name:string, value:number}> = [];

  function detectKeys(sample: any) {
    if (!sample) return;
    const keys = Object.keys(sample);
    if (!xKey) {
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

    let lc = s.toLowerCase();

    if (DAY_ABBREV[lc]) lc = DAY_ABBREV[lc];
    if (MONTH_ABBREV[lc]) lc = MONTH_ABBREV[lc];

    lc = lc.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').trim();

    const title = lc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return title;
  }

  function buildProcessedData() {
    procCategories = [];
    procValues = [];
    procSeriesForPie = [];

    if (!Array.isArray(data) || data.length === 0) return;

    detectKeys(data[0]);

    const map = new Map<string, number>();
    const orderSeen: string[] = [];

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

    const keys = Array.from(map.keys());
    const keysLc = keys.map(k => k.toLowerCase());

    const allDays = keysLc.every(k => DAYS_LC.includes(k));
    const allMonths = keysLc.every(k => MONTHS_LC.includes(k));

    let sortedKeys: string[] = [];

    if (allDays) {
      const order = new Map(DAYS_LC.map((d,i) => [d, i]));
      sortedKeys = keys.slice().sort((a,b) => order.get(a.toLowerCase())! - order.get(b.toLowerCase())!);
    } else if (allMonths) {
      const order = new Map(MONTHS_LC.map((m,i) => [m, i]));
      sortedKeys = keys.slice().sort((a,b) => order.get(a.toLowerCase())! - order.get(b.toLowerCase())!);
    } else {
      sortedKeys = orderSeen;
    }

    for (const k of sortedKeys) {
      const v = map.get(k) ?? 0;
      procCategories.push(k);
      procValues.push(v);
      procSeriesForPie.push({ name: k, value: v });
    }
  }

  function drawChart() {
    if (!chart || !Array.isArray(data) || data.length === 0) {
      chart?.clear();
      return;
    }

    buildProcessedData();

    const count = procCategories.length;
    if (!chartType) {
      chartType = count <= 10 ? 'pie' : (count > 20 ? 'bar_h' : 'bar_v');
    }

    const hideLabels = procCategories.length > 20;
    const colorMap = procCategories.map((_, i) => colorPalette[i % colorPalette.length]);

    let option: any = {
      textStyle: {
        color: themeColors.textColor
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: themeColors.tooltipBg,
        borderColor: themeColors.tooltipBorder,
        textStyle: {
          color: themeColors.textColor
        }
      },
      legend: {
        textStyle: {
          color: themeColors.textColor
        }
      }
    };

    switch (chartType) {
      case 'bar_v':
        option = {
          ...option,
          xAxis: {
            type: 'category',
            data: procCategories,
            axisLabel: {
              rotate: hideLabels ? 0 : -45,
              interval: 0,
              show: !hideLabels,
              color: themeColors.labelColor
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: themeColors.labelColor
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            },
            splitLine: {
              lineStyle: { color: themeColors.lineColor + '33' }
            }
          },
          series: [{
            type: 'bar',
            data: procValues.map((v, i) => ({ value: v, itemStyle: { color: colorMap[i] } })),
            emphasis: { focus: 'series' }
          }]
        };
        break;

      case 'bar_h':
        option = {
          ...option,
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          yAxis: {
            type: 'category',
            data: procCategories,
            axisLabel: {
              show: true,
              color: themeColors.labelColor,
              formatter: (value: string) => {
                const limit = 20;
                return value.length > limit ? value.substring(0, limit) + '...' : value;
              }
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            }
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              color: themeColors.labelColor
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            },
            splitLine: {
              lineStyle: { color: themeColors.lineColor + '33' }
            }
          },
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
          ...option,
          legend: null,
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          series: [{
            type: 'pie',
            radius: chartType === 'donut' ? ['40%', '70%'] : '70%',
            data: procSeriesForPie.map((d, i) => ({ name: d.name, value: d.value, itemStyle: { color: colorMap[i] } })),
            label: {
              formatter: '{b|{b}:} {c|{c}} {per|({d}%)}',
              rich: {
                b: { color: themeColors.textColor, fontSize: 12 },
                c: { color: themeColors.textColor, fontSize: 12, fontWeight: 'bold' },
                per: { color: themeColors.textColor, fontSize: 12 }
              }
            },
            labelLine: { lineStyle: { color: themeColors.lineColor } },
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }
          }]
        };
        break;

      case 'line':
      case 'area':
        option = {
          ...option,
          xAxis: {
            type: 'category',
            data: procCategories,
            axisLabel: {
              color: themeColors.labelColor
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: themeColors.labelColor
            },
            axisLine: {
              lineStyle: { color: themeColors.lineColor }
            },
            splitLine: {
              lineStyle: { color: themeColors.lineColor + '33' }
            }
          },
          series: [{
            type: 'line',
            data: procValues.map((v, i) => ({ value: v, itemStyle: { color: colorMap[i] } })),
            areaStyle: chartType === 'area' ? { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#91CC75'
              }, {
                offset: 1, color: '#91CC7533'
              }]) } : null,
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
    chart.setOption(option, true);

    chart.off('click');
    chart.on('click', params => {
      let name = params.name ?? (params.data && params.data.name) ?? null;
      let value = params.value ?? (params.data && params.data.value) ?? null;
      dispatch('selectCategory', { category: name, value });
    });
  }

  function selectChartType(type: string) {
    if (chartType !== type) {
      chartType = type;
    }
  }

  function initChart() {
    if (!chartContainer) return;
    if (!chart) {
      detectTheme();
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
    drawChart();
  });

  onDestroy(() => {
    window.removeEventListener('resize', resizeHandler);
    chart?.dispose();
    chart = null;
  });
</script>

<div class="relative w-full h-full text-2xl">
  <div class="absolute top-0 inset-x-0 z-10 flex justify-center space-x-2 p-2">
    {#each CHART_TYPES as type}
      <button
        class="btn btn-sm btn-square btn-ghost hover:bg-base-200 {chartType === type.value ? 'btn-active' : ''} {type.color} hover:text-primary transition-transform duration-200"
        on:click={() => selectChartType(type.value)}
        aria-label="Change chart type to {type.label}"
        title={type.label}
      >
        <svelte:component this={type.icon} size={12} />
      </button>
    {/each}
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
</style>