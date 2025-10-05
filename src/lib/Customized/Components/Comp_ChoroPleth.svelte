<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // --- PROPS ---
  // Note: While the parent component passes data and groupingColumn,
  // this map currently uses hardcoded colors/data for visualization structure.
  // Integration with props is placeholder for now.

  // Viewbox size used for projection math (keeps visuals similar to your beautiful map)
  const VIEW_W = 900;
  const VIEW_H = 700;
  const PADDING = 16;

  // DOM refs
  let containerEl: HTMLDivElement | null = null;
  let svgEl: SVGSVGElement | null = null;
  let tooltipEl: HTMLDivElement | null = null;

  // data + state
  let features: {
    feature: any;
    name: string;
    color: string;
    id: string;
    center: [number, number];
  }[] = [];
  let error: string | null = null;

  // bbox for current dataset (used by the simple projection)
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;

  // pan/zoom transform state
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let lastClientX = 0;
  let lastClientY = 0;
  let dragThresholdExceeded = false;

  // --- TOOLTIP/HOVER STATE ---
  let tooltipFeature: { feature: any; name: string; color: string; id: string; center: [number, number] } | null = null;
  let tooltipStyle = "position:absolute; display:none; pointer-events:none; transform: translate(-50%,-120%); opacity: 0;";


  // color scale (deterministic by name)
  const colorScale = d3.scaleOrdinal(d3.schemeSet3);

  // --- DRILL-DOWN STATE ---
  let currentLevel: "country" | "region" = "country";
  let currentRegionId: string | null = null;
  let currentMapTitle = "Philippine Country Map";


  function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
  }

  // --- projection helpers (same approach as your beautiful map) ---
  function project([lon, lat]: number[]): [number, number] {
    if (!(maxLon > minLon) || !(maxLat > minLat)) return [0, 0];
    const innerW = VIEW_W - PADDING * 2;
    const innerH = VIEW_H - PADDING * 2;
    const x = PADDING + ((lon - minLon) / (maxLon - minLon)) * innerW;
    const y = PADDING + ((maxLat - lat) / (maxLat - minLat)) * innerH; // flip y (north up)
    return [x, y];
  }

  // Reactive function to get the screen position of a geographic center
  function getScreenCenter(center: [number, number]): [number, number] {
      const [x, y] = project(center);

      // Apply pan and zoom transformation
      const scaledX = x * scale + translateX;
      const scaledY = y * scale + translateY;

      // Scale to fit the container size (assuming 900x700 viewBox matches initial size)
      const containerWidth = containerEl?.clientWidth || VIEW_W;
      const factor = containerWidth / VIEW_W;

      return [scaledX * factor, scaledY * factor];
  }


  function ringToD(ring: number[][]): string {
    return ring
      .map((c, i) => {
        const [x, y] = project(c);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + " Z";
  }

  function ringsToPath(rings: number[][][]): string {
    return rings.map(ringToD).join(" ");
  }

  function polygonFeatureToPaths(feature: any): string[] {
    if (!feature || !feature.geometry) return [];
    if (feature.geometry.type === "Polygon") {
      return [ringsToPath(feature.geometry.coordinates)];
    } else if (feature.geometry.type === "MultiPolygon") {
      return feature.geometry.coordinates.map((poly: number[][][]) => ringsToPath(poly));
    }
    return [];
  }

  // --- Tooltip handlers (re-implemented for hover only) ---
  function showTooltip(f: { feature: any; name: string; color: string; id: string; center: [number, number] }, clientX: number, clientY: number) {
    if (!tooltipEl || !containerEl) return;
    tooltipFeature = f;

    const rect = containerEl.getBoundingClientRect();
    const left = clientX - rect.left;
    const top = clientY - rect.top;

    tooltipStyle = `
      position:absolute;
      display:block;
      pointer-events:none;
      transform: translate(-50%,-120%);
      left: ${left}px;
      top: ${top}px;
      z-index: 30;
      opacity: 1;
    `;
  }

  function hideTooltip() {
    tooltipStyle = "position:absolute; display:none; pointer-events:none; transform: translate(-50%,-120%); opacity: 0;";
    tooltipFeature = null;
  }
  // --- End Tooltip handlers ---

  // --- Marker-specific Tooltip Handlers ---
  function onMarkerEnter(e: PointerEvent, f: any) {
      console.log(`13. Marker Hover: Entering ${f.name}`);
      showTooltip(f, e.clientX, e.clientY);
  }

  function onMarkerMove(e: PointerEvent, f: any) {
      // Passes client coordinates for smooth tooltip following
      showTooltip(f, e.clientX, e.clientY);
  }

  function onMarkerLeave() {
      console.log(`14. Marker Hover: Leaving.`);
      hideTooltip();
  }
  // --- End Marker Handlers ---


  // --- pan & zoom with pointer + wheel (cursor-centered zoom) ---
  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return;

    // FIX: Only initiate map drag if the target is the SVG/map background itself
    // We check if the target has the class 'map-marker'. If it does, we exit early
    // allowing the marker's own event handlers (like on:click) to fire normally.
    if ((e.target as HTMLElement).classList.contains('map-marker')) {
        console.log("15. PointerDown on Marker. Preventing Map Drag Initiation.");
        isDragging = false;
        dragThresholdExceeded = false;
        return;
    }

    isDragging = true;
    dragThresholdExceeded = false; // Reset drag check
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    try { svgEl?.setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(e: PointerEvent) {
    if (isDragging) {
      const dx = e.clientX - lastClientX;
      const dy = e.clientY - lastClientY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          dragThresholdExceeded = true;
      }

      translateX += dx;
      translateY += dy;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
    }
  }

  function onPointerUp(e: PointerEvent) {
    isDragging = false;
    try { svgEl?.releasePointerCapture(e.pointerId); } catch {}
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    if (!svgEl || !containerEl) return;
    const rect = svgEl.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const oldScale = scale;
    const zoomFactor = Math.exp(-e.deltaY * 0.0012);
    scale = Math.max(0.25, Math.min(10, scale * zoomFactor));
    translateX = mouseX - (mouseX - translateX) * (scale / oldScale);
    translateY = mouseY - (mouseY - translateY) * (scale / oldScale);
  }

  // --- data loading & processing ---
  async function loadCountry() {
    console.log("1. Starting loadCountry...");
    try {
      currentLevel = "country";
      currentRegionId = null;
      currentMapTitle = "Philippine Country Map: Click Markers to Drill Down";
      resetView();
      await loadAndProcess("/mapping/country.0.01.json", "country");
    } catch (err: any) {
      error = err?.message || String(err);
      console.error("loadCountry error:", err);
    }
  }

  async function loadProvincesForRegion(regionId: string, regionName: string) {
    console.log("4. Attempting to load Region Map for ID:", regionId);
    try {
      currentLevel = "region";
      currentRegionId = regionId;
      currentMapTitle = `${regionName} Map: Click Markers for Info`;
      resetView();

      const regionCode = regionId.substring(0, 2);
      const path = `/mapping/provdists-region-${regionCode}.0.01.json`;
      console.log("5. Constructed map path:", path);

      await loadAndProcess(path, "region");
    } catch (err: any) {
      error = err?.message || String(err);
      console.error("loadProvincesForRegion error:", err);
      // Fallback to country map if regional map fails to load
      loadCountry();
    }
  }

  // Helper to calculate the centroid of a GeoJSON feature
  function calculateCentroid(feature: any): [number, number] {
      if (!feature.geometry) return [0, 0];

      // Use D3's centroid calculation for accurate placement
      const [lon, lat] = d3.geoCentroid(feature);

      // Fallback if D3 centroid fails (e.g., non-standard geometries)
      if (isNaN(lon) || isNaN(lat)) {
          console.warn(`Centroid failed for feature: ${feature.properties?.adm1_en || feature.properties?.adm2_en}`);
          return [0, 0];
      }
      return [lon, lat];
  }


  // core: fetch geojson, compute bbox, set features[] with colors
  async function loadAndProcess(path: string, level: "country" | "region") {
    console.log(`6. Loading and processing map data from: ${path} (Level: ${level})`);
    features = [];
    error = null;

    const res = await fetch(path);
    if (!res.ok) {
      console.error(`7. ERROR: Failed to fetch ${path} (status ${res.status})`);
      throw new Error(`Failed to fetch ${path} (status ${res.status})`);
    }
    const data = await res.json();
    console.log(`8. Successfully fetched GeoJSON. Feature count: ${data.features.length}`);

    // reset bbox
    minLon = Infinity; maxLon = -Infinity; minLat = Infinity; maxLat = -Infinity;

    // compute bbox robustly (unchanged)
    data.features.forEach((f: any) => {
      const geom = f.geometry;
      if (!geom) return;
      if (geom.type === "Polygon") {
        geom.coordinates.forEach((ring: number[][]) =>
          ring.forEach(([lon, lat]) => {
            if (lon < minLon) minLon = lon;
            if (lon > maxLon) maxLon = lon;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
          })
        );
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach((poly: number[][][]) =>
          poly.forEach((ring: number[][]) =>
            ring.forEach(([lon, lat]) => {
              if (lon < minLon) minLon = lon;
              if (lon > maxLon) maxLon = lon;
              if (lat < minLat) minLat = lat;
              if (lat > maxLat) lat = lat;
            })
          )
        );
      }
    });

    if (!(maxLon > minLon) || !(maxLat > minLat)) {
      throw new Error("Invalid GeoJSON bounds (min/max lon/lat).");
    }
    console.log(`9. BBox calculated: MinLon=${minLon}, MaxLon=${maxLon}, MinLat=${minLat}, MaxLat=${maxLat}`);


    // Determine name and ID keys based on level
    const nameKey = level === "country" ? "adm1_en" : "adm2_en";
    const idKey = level === "country" ? "adm1_psgc" : "adm2_psgc";

    const names = data.features.map((f: any) => (f.properties?.[nameKey] || "Unknown").toString());
    colorScale.domain(names);

    // build features array with colors and IDs
    features = data.features.map((feature: any) => {
      const name = (feature.properties?.[nameKey] || "Unknown").toString();
      const id = (feature.properties?.[idKey] || name).toString();
      const center = calculateCentroid(feature); // Calculate center

      if (level === "country") {
          console.log(`10a. Country Feature: ${name}, PSGC ID: ${id}, Center: ${center}`);
      } else {
          console.log(`10b. Region Feature: ${name}, PSGC ID: ${id}, Center: ${center}`);
      }

      return {
        feature,
        name,
        id,
        color: colorScale(name),
        center,
      };
    });
    console.log("11. Map features updated. Map should redraw.");
  }

  // New function to handle click from the superimposed circle
  async function handleCircleClick(f: { feature: any; name: string; color: string; id: string; center: [number, number] }) {
      console.log("12. === CLICK HANDLER FIRED ===");
      console.log(`12a. Marker clicked for: ${f.name} (PSGC ID: ${f.id})`);
      console.log("12b. Current Level:", currentLevel);

      // CRITICAL CHECK: Ignore click if a drag was just performed (prevents accidental clicks after panning)
      if (dragThresholdExceeded) {
          console.warn("12c. Click event ignored: Drag threshold exceeded (Pan action detected).");
          dragThresholdExceeded = false; // Reset for next interaction
          return;
      }

      console.log("12d. Processing drill-down...");

      if (currentLevel === "country") {
          const regionId = f.id;
          const regionName = f.name;

          // Extract the lookups two characters (Region Code)
          const regionCode = regionId.substring(0, 2);

          console.log("12e. Country Click: Extracted Region Code for URL:", regionCode);

          if (regionCode && regionCode.length >= 2 && !isNaN(parseInt(regionCode))) {
              await loadProvincesForRegion(regionCode, regionName);
          } else {
              console.warn("12f. Marker click skipped drill-down (Invalid or missing region code). Full properties:", f.feature.properties);
          }
      }
      // If at 'region' level, you would handle a different action here (e.g., displaying a chart).
  }

  function backToCountry() {
    console.log("Back button clicked. Returning to Country View.");
    loadCountry();
  }

  // initial load
  onMount(() => {
    loadCountry().catch(e => {
      error = e?.message || String(e);
      console.error("Initial load error:", e);
    });
  });
</script>

<div class="map-wrap" bind:this={containerEl} style="position:relative;">
  <h2 class="text-xl font-bold mb-4">{currentMapTitle}</h2>

  <!-- Tooltip: REPURPOSED as a simple hover label (for the SVG paths) -->
  <div
    bind:this={tooltipEl}
    class="map-tooltip z-30"
    style={tooltipStyle}
    aria-hidden={!tooltipFeature}
  >
    {#if tooltipFeature}
        <div class="p-1">
            <div class="font-bold">{tooltipFeature.name}</div>
        </div>
    {/if}
  </div>

  <!-- Back to Country button (SPA-friendly) -->
  {#if currentLevel === "region"}
    <button
      class="absolute right-4 top-4 bg-white border rounded px-3 py-1 shadow text-sm z-20"
      on:click={backToCountry}
      aria-label="Back to country view"
    >
      ⬅ Back to Country
    </button>
  {/if}

  <!-- SVG MAP -->
  <svg
    bind:this={svgEl}
    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    class="choro-svg"
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:pointercancel={onPointerUp}
    on:mouseleave={onPointerUp}
    on:wheel|preventDefault={onWheel}
    style="width:100%; height:70vh; background:#eef2f7; touch-action:none; user-select:none; border-radius:8px;"
    role="img"
    aria-label="Choropleth map"
  >
    <g transform={`translate(${translateX},${translateY}) scale(${scale})`}>
      {#if error}
        <text x="20" y="40" fill="red" font-size="20">{error}</text>
      {:else}
        {#each features as f (f.name)}
          {#each polygonFeatureToPaths(f.feature) as d}
            <path
              d={d}
              fill={f.color}
              stroke="#222"
              stroke-width="0.6"
              style="vector-effect:non-scaling-stroke; fill-rule:evenodd; cursor:default; transition: opacity 0.1s; pointer-events: none;"
              on:mouseenter={(e) => {
                showTooltip(f, (e as PointerEvent).clientX, (e as PointerEvent).clientY);
                (e.currentTarget as SVGPathElement).style.opacity = "0.8";
              }}
              on:mousemove={(e) => {
                showTooltip(f, (e as PointerEvent).clientX, (e as PointerEvent).clientY);
              }}
              on:mouseleave={(e) => {
                hideTooltip();
                (e.currentTarget as SVGPathElement).style.opacity = "";
              }}
            >
              <!-- REMOVED: Native <title> tag to prevent double tooltip -->
            </path>
          {/each}
        {/each}
      {/if}
    </g>
  </svg>

  <!-- CLICKABLE MARKERS -->
  {#each features as f (f.id)}
    <button
        class="map-marker"
        style="
            left: {getScreenCenter(f.center)[0]}px;
            top: {getScreenCenter(f.center)[1]}px;
            /* Scale marker size inversely to map zoom to keep it readable */
            width: {12 / scale}px;
            height: {12 / scale}px;
            transform: translate(-50%, -50%) scale({scale});
            /* Ensure marker is always visible and clickable */
            pointer-events: {currentLevel === 'country' ? 'auto' : 'none'};
        "
        title={`Click to view ${f.name}`}
        on:click|preventDefault={() => handleCircleClick(f)}
        on:mouseenter={(e) => onMarkerEnter(e, f)}
        on:mousemove={(e) => onMarkerMove(e, f)}
        on:mouseleave={onMarkerLeave}
    >
        <span class="marker-label">{f.name}</span>
    </button>
  {#if currentLevel === "country" && !isNaN(getScreenCenter(f.center)[0])}
    <div
      class="marker-data-label"
      style="
        left: {getScreenCenter(f.center)[0]}px;
        top: {getScreenCenter(f.center)[1] - (12 / scale) * 1.5}px; /* Position above the marker */
        transform: translate(-50%, -50%) scale({scale});
        pointer-events: none;
      "
    >
      <!-- Placeholder: This is where you would show aggregated crime count -->
      {f.name.substring(0, 3).toUpperCase()}
    </div>
  {/if}
  {/each}
</div>

<style>
  .map-wrap {
    min-height: 75vh;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  /* Clickable Markers */
  .map-marker {
    position: absolute;
    background: #007bff;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    cursor: pointer;
    z-index: 100;
    transition: background 0.15s ease;
    opacity: 1 !important;
    visibility: visible !important;
  }
  .map-marker:hover {
    background: #dc3545;
  }

  .map-marker .marker-label {
      position: absolute;
      top: -150%;
      left: 50%;
      /* The font size here is fine, but the marker size is scaled */
      transform: translateX(-50%) scale(calc(1 / var(--current-scale, 1)));
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
  }
  .map-marker:hover .marker-label {
       opacity: 1;
  }

  /* Marker Data Label (for showing count/name above the marker) */
  .marker-data-label {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    z-index: 99; /* Ensure label is just below marker */
    text-shadow: 0 0 5px white;
    pointer-events: none;
    transition: transform 0.1s ease;
  }


  /* Tooltip (Hover Label) */
  .map-tooltip {
    background: rgba(17, 24, 39, 0.95);
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    pointer-events: none;
    white-space: nowrap;
    z-index: 30;
    transition: opacity 0.2s ease-in-out;
  }
  .map-tooltip[aria-hidden="false"] {
      opacity: 1;
  }

  .choro-svg {
    display:block;
    border-radius:8px;
    overflow:visible !important;
  }

  /* FIX: Ensure SVG paths do not interfere with HTML markers/tooltips */
  .choro-svg path {
    pointer-events: none;
  }

  @media (max-width: 640px) {
    .map-tooltip { font-size: 12px; padding: 5px 8px; }
  }
</style>
