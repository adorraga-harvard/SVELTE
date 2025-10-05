import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// By defining a static glob pattern, we allow Vite to find all possible project_Config files at build time.
// This makes the dynamic import much more reliable.
const configGlobs = import.meta.glob('../*/project_Config.ts');

/**
 * This is the dynamic load function for any application.
 * It runs before the layout renders, ensuring all data is ready.
 */
export const load: LayoutLoad = async ({ params, parent }) => {
	// 1. Get data from the root layout (the global list of all apps).
	const { applications } = await parent();
	const { appId } = params; // Get the app's ID from the URL.

	// 2. Find the full definition for the current application.
	const currentApp = applications.find((app) => app.id === appId);
	if (!currentApp) {
		throw error(404, `Application not found: ${appId}`);
	}

	// 3. Construct the key to look up the correct project_Config file in our glob object.
	const key = `../${appId}/config.ts`;
	const loader = configGlobs[key];

	if (!loader) {
		throw error(404, `Configuration file (config.ts) for application "${appId}" not found.`);
	}

	try {
		// 4. Execute the loader function to dynamically import the project_Config file.
		const moduleConfigFile: any = await loader();
		const modules = moduleConfigFile.applications; // The array is named 'applications' in the project_Config

		// 5. Return both the current app's data and its specific list of modules.
		return {
			currentApp: currentApp,
			modules: modules
		};
	} catch (e) {
		console.error(`Could not load or parse config.ts for application "${appId}"`, e);
		throw error(500, `Error loading configuration for "${appId}".`);
	}
};

