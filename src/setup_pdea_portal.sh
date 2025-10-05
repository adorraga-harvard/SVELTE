#!/bin/bash

# ==============================================================================
# PDEA Portal Scaffolding Script for SvelteKit (Visually Enhanced)
# ==============================================================================
# This script automates the creation of the directory structure and boilerplate
# files for the PDEA Unified Enforcement Portal proof-of-concept. This version
# includes an enhanced, professional design.
#
# To run:
# 1. Save this file as `setup_pdea_portal.sh` in your project root.
# 2. Make it executable: `chmod +x setup_pdea_portal.sh`
# 3. Run it: `./setup_pdea_portal.sh`
# ==============================================================================

# --- Configuration ---
BASE_DIR="src/routes/pdea"
MODULES=(
  "case-management"
  "evidence-tracking"
  "intelligence-hub"
  "field-operations"
  "legal-compliance"
)

# --- Script Start ---
echo "🚀 Starting PDEA Portal setup..."

# --- 1. Create Directory Structure ---
echo "   - Creating base directories..."
for module in "${MODULES[@]}"; do
  mkdir -p "$BASE_DIR/$module"
done
echo "   ✅ Directory structure created successfully."

# --- 2. Create and Populate Top-Level Files ---
echo "   - Creating top-level route files..."

# Create /pdea/+layout.server.ts
cat > "$BASE_DIR/+layout.ts" << EOF
import type { LayoutLoad } from './\$types';

/**
 * This load function runs on the server and in the browser.
 * It determines the base path of this entire route section using the route.id,
 * which is the file-system path of the route. This makes all navigation
 * within this section completely portable. If you rename the '/pdea' folder,
 * all links will automatically update.
 */
export const load: LayoutLoad = ({ route }) => {
  const basePath = route.id;

  // This basePath ('/pdea') is passed as a \`data\` prop to the corresponding
  // +layout.svelte file and will be provided to all child layouts via context.
  return {
    basePath: basePath
  };
};
EOF

# Create /pdea/+layout.svelte
cat > "$BASE_DIR/+layout.svelte" << EOF
<script lang="ts">
  import '/src/app.css'; // NOTE: Ensure this imports TailwindCSS
  import { page } from '\$app/stores';
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import Navbar from '\$lib/Components/Comp_Navbar.svelte';

  export let data;

  setContext('basePath', data.basePath);

  const mainNavItems = [
    { href: data.basePath, label: 'Dashboard' },
    { href: \`\${data.basePath}/case-management\`, label: 'Case Management' },
    { href: \`\${data.basePath}/evidence-tracking\`, label: 'Evidence Tracking' },
    { href: \`\${data.basePath}/intelligence-hub\`, label: 'Intelligence Hub' },
    { href: \`\${data.basePath}/field-operations\`, label: 'Field Operations' },
    { href: \`\${data.basePath}/legal-compliance\`, label: 'Legal & Compliance' }
  ];
</script>

<!--
  For best results, add the Inter font to your app.html <head>:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  And add 'Inter' to your tailwind.config.js fontFamily.
-->
<div class="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
  <header class="sticky top-0 z-50 bg-slate-800 text-white shadow-md">
    <div class="container mx-auto px-6 py-3 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <div class="flex items-center space-x-3">
        <svg class="h-9 w-9 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path></svg>
        <h1 class="text-xl font-bold tracking-wide">PDEA Portal</h1>
      </div>
      <Navbar navItems={mainNavItems} />
    </div>
  </header>

  <main class="flex-grow container mx-auto p-6">
    <div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }} key={\$page.url.pathname}>
      <slot />
    </div>
  </main>

  <footer class="bg-slate-200 text-slate-600 text-center p-4 text-sm">
    <p>&copy; {new Date().getFullYear()} Philippine Drug Enforcement Agency. All rights reserved.</p>
  </footer>
</div>
EOF

# Create /pdea/+page.svelte
cat > "$BASE_DIR/+page.svelte" << EOF
<script lang="ts">
  const modules = [
    { href: './case-management', title: 'Case Management', description: 'Manage investigations, suspects, and outcomes.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { href: './evidence-tracking', title: 'Evidence Tracking', description: 'Oversee chain of custody, tagging, and audit logs.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z' },
    { href: './intelligence-hub', title: 'Intelligence Hub', description: 'Consolidate data from informants, leads, and agencies.', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { href: './field-operations', title: 'Field Operations', description: 'Plan and coordinate raids, surveillance, and missions.', icon: 'M10 20l4-16m4 4l-4 4-4-4 4-4' },
    { href: './legal-compliance', title: 'Legal & Compliance', description: 'Prepare documentation and ensure court readiness.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];
</script>

<div class="space-y-8">
  <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
    <h1 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Unified Enforcement Portal</h1>
    <p class="mt-3 text-lg text-slate-600 max-w-3xl mx-auto">
      A proof-of-concept demonstrating scalable technology to modernize drug enforcement operations.
    </p>
  </div>

  <div>
    <h2 class="text-lg font-semibold text-slate-600 mb-4 px-1">Modules</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each modules as module}
        <a href={module.href} class="group relative block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-start space-x-4">
            <div class="bg-blue-100 text-blue-600 p-3 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={module.icon}></path></svg>
            </div>
            <div class="flex-grow">
              <h2 class="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{module.title}</h2>
              <p class="text-slate-500 text-sm mt-1">{module.description}</p>
            </div>
          </div>
          <div class="absolute bottom-5 right-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
EOF

echo "   ✅ Top-level files created."

# --- 3. Create and Populate Submodule Files ---
echo "   - Creating submodule layouts and pages..."

for module in "${MODULES[@]}"; do
  title=$(echo "$module" | sed -r 's/(^|-)([a-z])/\U\2/g' | sed 's/-/ /g')

  cat > "$BASE_DIR/$module/+layout.svelte" << EOF
<script lang="ts">
  import { getContext } from 'svelte';
  import VerticalNavbar from '\$lib/Components/Comp_VerticalNavBar.svelte';

  const basePath = getContext<string>('basePath');
  const modulePath = \`\${basePath}/$module\`;

  const moduleNav = {
    title: '$title',
    items: [
      { href: \`\${modulePath}/\`, label: 'Dashboard' },
      // TODO: Add more specific links for this module here
    ]
  };
</script>

<div class="flex flex-row flex-grow bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
  <aside class="w-64 flex-shrink-0 bg-slate-50 border-r border-slate-200">
    <VerticalNavbar navItems={moduleNav.items} moduleTitle={moduleNav.title} />
  </aside>

  <div class="flex-grow p-6 md:p-8 overflow-y-auto">
    <slot />
  </div>
</div>
EOF

  cat > "$BASE_DIR/$module/+page.svelte" << EOF
<div class="space-y-4">
  <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
    $title Dashboard
  </h1>
  <div class="border-b border-slate-200"></div>
</div>

<div class="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
  <p class="text-slate-700">
    Welcome to the $title module. Use the navigation on the left to access different sections.
  </p>
</div>
EOF
done

echo "   ✅ Submodule files created."
echo "✅ All files for the PDEA portal have been created successfully!"
echo "🎉 Happy coding!"
