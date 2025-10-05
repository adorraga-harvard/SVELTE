import { writable } from 'svelte/store';

// Define the shape of a Module object that the store will hold.
export type ModuleDefinition = {
	id: string;
	name: string;
};

/**
 * A dedicated Svelte store for the PDEA application.
 * This store will hold the currently selected module object.
 *
 * - If its value is `null`, the PDEA dashboard (grid of modules) should be displayed.
 * - If it holds a module object, the content for that specific module should be displayed.
 *
 * This allows for seamless, SPA-style navigation within the PDEA app without changing the browser URL.
 */
export const selectedModule = writable<ModuleDefinition | null>(null);

