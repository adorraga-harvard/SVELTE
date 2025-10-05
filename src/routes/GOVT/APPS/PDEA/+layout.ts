import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

/**
 * This is the static version of the load function, perfect for prototyping.
 * It runs before the PDEA layout and page are rendered.
 */
export const load: LayoutLoad = async ({ parent }) => {
	// The `parent` function safely gets the data loaded by the parent layout (`/GOVT/+layout.server.ts`).
	const { applications } = await parent();

	// For this prototype, we hardcode the ID of the application we want to load.
	const appId = 'PDEA';

	// Find the full definition for this specific application from the global list.
	const currentApp = applications.find((app) => app.id === appId);

	// If the application isn't found in the main project_Config, it's a configuration error.
	if (!currentApp) {
		throw error(404, `Configuration for application "${appId}" not found.`);
	}

	// Return the found data. It will now be available to +layout.svelte and +page.svelte,
	// completely eliminating any race conditions.
	return {
		currentApp: currentApp
	};
};

