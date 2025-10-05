/**
 * engineer_Components.ts
 * =================================================================
 * COMPONENT FOUNDRY SCRIPT
 * -----------------------------------------------------------------
 * This script reads the raw Svelte markup from project_Endpoints.ts
 * and forges a library of reusable, prop-driven Svelte components.
 * Each component is saved to a relative 'Components/Templates/'
 * directory.
 *
 * This marks the project's transition to a component-lookups
 * architecture, enabling a more scalable and maintainable system
 * for all LGU sub-solutions.
 *
 * RUN: npx ts-node _TEMPLATES/STATIC_ONE/engineer_Components.ts
 * =================================================================
 */

import { endpointTemplates } from './project_Endpoints';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- HELPERS ---

/**
 * Converts a kebab-case string (like 'kpi-deck') to PascalCase (like 'KpiDeck').
 */
function kebabToPascalCase(kebab: string): string {
	return kebab
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

/**
 * Analyzes the markup to infer the necessary props (datasources, titles, etc.).
 */
function inferPropsFromMarkup(markup: string): Record<string, any> {
	const props: Record<string, any> = {
		// Default style/layout props for every component
		customClass: ''
	};

	// Infer page title and description
	if (markup.includes('data.pageData?.title')) props.title = 'Default Title';
	if (markup.includes('data.pageData?.description')) props.description = 'Default Description';

	// Infer common datasources by looking for `data.X` patterns
	const dataMatches = markup.matchAll(/data\.(\w+)/g);
	for (const match of dataMatches) {
		const key = match[1];
		if (key === 'pageData') continue; // Skip pageData as it's handled above

		// Assign default values based on common patterns
		if (
			key.toLowerCase().includes('items') ||
			key.toLowerCase().includes('records') ||
			key.toLowerCase().includes('datasets')
		) {
			props[key] = []; // Default array for lists
		} else if (key.toLowerCase().includes('filter')) {
			props[key] = {}; // Default object for filters
		} else {
			props[key] = null; // Default null for single objects
		}
	}

	return props;
}

/**
 * Generates the full <script lang="ts"> content for a component.
 */
function generateScriptContent(props: Record<string, any>): string {
	const propDefinitions = Object.entries(props)
		.map(([key, defaultValue]) => `    ${key}: ${JSON.stringify(defaultValue)}`)
		.join(',\n');

	return `<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
${propDefinitions}
    };
<\/script>`;
}

/**
 * Transforms the raw markup to use the new 'props' object.
 */
function transformMarkup(markup: string): string {
	let transformed = markup;
	// Replace `data.pageData?.title` with `props.title` etc.
	transformed = transformed.replace(/data\.pageData\?\.(title|description)/g, 'props.$1');
	// Replace all other `data.X` with `props.X`
	transformed = transformed.replace(/data\.(\w+)/g, 'props.$1');
	return transformed;
}

/**
 * Main build process.
 */
function main(): void {
	console.log('\n>>> Component Foundry (TypeScript) starting build...');

	// --- CORRECTED PATH (ES Module Safe) ---
	// My apologies. You were right to flag the __dirname issue.
	// This is the correct, modern way to get the script's directory in ES Modules.
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	// This path is now relative to THIS SCRIPT's location,
	// fulfilling the "run exclusively at" requirement.
	const outputDir = path.join(__dirname, 'Components', 'Templates');

	// Clean and recreate the output directory
	if (fs.existsSync(outputDir)) {
		fs.rmSync(outputDir, { recursive: true, force: true });
	}
	fs.mkdirSync(outputDir, { recursive: true });

	console.log(`  - Output directory prepared: ${outputDir}`);

	let count = 0;
	for (const [templateName, markup] of Object.entries(endpointTemplates)) {
		const componentName = kebabToPascalCase(templateName);
		const componentPath = path.join(outputDir, `${componentName}.svelte`);

		// 1. Analyze markup and determine props
		const props = inferPropsFromMarkup(markup);

		// 2. Generate the <script> block with the inferred props
		const scriptContent = generateScriptContent(props);

		// 3. Update the markup to use the new 'props' object
		const transformedMarkup = transformMarkup(markup);

		// 4. Assemble the final component file content
		const fileContent = `${scriptContent}\n\n${transformedMarkup}`;

		// 5. Write the component file
		fs.writeFileSync(componentPath, fileContent, 'utf-8');
		console.log(`    - ✔ Forged: ${componentPath}`);
		count++;
	}

	console.log(`\n  ✔ Construction complete. Forged ${count} components.`);
	console.log('  ✔ Your new component library is ready.\n');
}

// --- RUN THE FOUNDRY ---
main();

