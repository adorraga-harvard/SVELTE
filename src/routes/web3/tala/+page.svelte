
<style>
  /* The styles from project_Scoped.css will be applied globally. */
</style>

<div class="hero min-h-screen bg-base-200 w-full">
  <div class="hero-content text-center w-full">
    <div class="w-full">
      <p class="py-6 italic text-base-400 text-left px-4 md:px-0">
        The name TALA, the Filipino word for "star," evokes the idea of a guiding light and a shining beacon of readiness and efficiency. Total Asset Logistics Application clearly defines the project's scope, emphasizing comprehensive visibility and control over all assets. This system will be the central nervous system for the Philippine Air Force, ensuring mission readiness from Clark Air Base to every corner of the archipelago.
      </p>

      <div class="card bg-base-100 shadow-xl p-6 mt-8 w-full">
        <h2 class="text-3xl font-bold mb-4 text-primary text-center">Core Functional Modules</h2>

        <div class="divider"></div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div class="p-6 rounded-lg bg-primary text-primary-content text-left">
            <h3 class="text-2xl font-bold mb-4">Total Asset Visibility (TAV) & Inventory Management</h3>
            <p class="mt-2 text-primary-content">This is the foundational layer. The system must provide 100% real-time tracking of every part and asset, from the central depot at Clark to the most remote operating base. Key data elements include:</p>
            <ul class="list-none space-y-2 mt-4">
              <li><strong>National Stock Number (NSN) / Part Number:</strong> The core identifier for every item, linked to its full history.</li>
              <li><strong>Real-Time Location Data (GPS/RFID):</strong> Pinpoints the location of all assets, crucial for rapid redistribution in a disaster-prone archipelago.</li>
              <li><strong>Material Condition Code (MCC):</strong> Tracks the status of each part (Serviceable, Condemned, or in Repair).</li>
              <li><strong>Shelf Life / Hazardous Material (HAZMAT):</strong> Automated tracking of expiration dates and compliance with national regulations.</li>
              <li><strong>National Audit & Compliance Data:</strong> Ensures all assets and transactions comply with Commission on Audit (COA) standards.</li>
              <li><strong>Deployed Container Inventory:</strong> Provides real-time inventory of pre-positioned kits for HADR or combat missions.</li>
            </ul>
          </div>

          <div class="p-6 rounded-lg bg-secondary text-secondary-content text-left">
            <h3 class="text-2xl font-bold mb-4">Weapon System Readiness & Maintenance</h3>
            <p class="mt-2">This section focuses on the health, status, and maintenance needs of high-value assets, ensuring mission readiness. Key metrics and functionalities include:</p>
            <ul class="list-none space-y-2 mt-4">
              <li><strong>Aircraft Mission Capable (MC) Rate:</strong> The single most important metric for operational readiness, viewable in real-time.</li>
              <li><strong>Awaiting Parts (AWP) Status:</strong> A crucial dashboard showing grounded aircraft, the part they need, its location, and ETA.</li>
              <li><strong>Predictive Maintenance Diagnostics (AI/ML):</strong> Uses AI to forecast component failure, shifting from reactive to proactive maintenance.</li>
              <li><strong>Work Order Management Status:</strong> Tracks all maintenance actions in real-time.</li>
              <li><strong>Total Ownership Cost (TOC):</strong> Comprehensive reporting on the lifetime cost of each airframe.</li>
            </ul>
          </div>

          <div class="p-6 rounded-lg bg-accent text-accent-content text-left">
            <h3 class="text-2xl font-bold mb-4">Supply Chain & Procurement Velocity</h3>
            <p class="mt-2">This ensures parts move quickly and procurement decisions are optimized, especially for an air force that relies on international partners. Key functions include:</p>
            <ul class="list-none space-y-2 mt-4">
              <li><strong>Supplier Performance Scorecards:</strong> Real-time rating of suppliers based on lead times and quality.</li>
              <li><strong>Global Demand Forecasting (AI-Driven):</strong> Uses AI to calculate optimal safety stock and reorder points.</li>
              <li><strong>Logistics Pipeline Visualization:</strong> End-to-end mapping of part movement from supplier to flightline.</li>
              <li><strong>Automated Sourcing & Redistribution:</strong> Automatically identifies the best source for a part and initiates rapid delivery.</li>
              <li><strong>Integrated Procurement Workflows:</strong> Streamlines the entire procurement process to ensure compliance and efficiency.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl p-6 mt-8 w-full">
        <h2 class="text-3xl font-bold mb-4 text-primary text-center">Database Design & Naming Rules</h2>
        <div class="divider"></div>
        <div class="text-left">
          <p class="mb-4">To ensure a scalable and maintainable database, we will strictly adhere to the following naming conventions. This rule-based approach is non-negotiable and will be applied to all tables and columns without exception.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="p-6 rounded-lg bg-base-200">
              <h3 class="text-2xl font-bold mb-4 text-primary">Table Naming Rules</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>All tables are named in singular form.</li>
                <li>Core tables are prefixed with `core_`.</li>
                <li>Lookup tables are prefixed with `lookup_`.</li>
              </ul>
            </div>
            <div class="p-6 rounded-lg bg-base-200">
              <h3 class="text-2xl font-bold mb-4 text-secondary">Column Naming Rules</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Primary Keys are suffixed with `_id` (e.g., `asset_id`).</li>
                <li>Primary Key names have a `_name` counterpart (e.g., `asset_name`).</li>
                <li>Foreign Keys use the name of the primary key they reference, suffixed with `_fk` (e.g., `user_role_id_fk`).</li>
                <li>All other columns are prefixed with the singular noun of the table (e.g., `asset_nsn`, `personnel_rank`).</li>
                <li>Date-only fields use `_date` (e.g., `order_date`).</li>
                <li>Datetime fields use `_dt` (e.g., `order_start_dt`).</li>
                <li>Long text fields use `_description` (e.g., `work_order_description`).</li>
              </ul>
            </div>
          </div>
          <div>
          <p class="mt-4">Our Entity Relationship Diagrams (ERDs) will also follow these rules to maintain visual and structural consistency across our documentation.</p>
          <img src="/img/tala-diagram.png" class="w-240" alt="" >

          </div>
        </div>
      </div>
    </div>
  </div>
</div>