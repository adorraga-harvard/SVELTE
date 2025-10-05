import { applications } from './config';
import type { LayoutLoad } from './$types';

/**
 * This is the root load function for the GOVT section.
 * It loads the master list of all applications and makes it available
 * to all child layouts (like the PDEA layout) via the `parent()` function.
 * This is the correct way to pass data down through layouts in SvelteKit.
 */
export const load: LayoutLoad = async () => {
	return {
		applications: applications
	};
};
