import { writable } from 'svelte/store';
import type { AppDefinition } from './types';

/**
 * A global store that holds the currently selected application or module definition.
 * All navigation and state changes will be driven by this single store for consistency.
 */
export const selectedApp = writable<AppDefinition | null>(null);