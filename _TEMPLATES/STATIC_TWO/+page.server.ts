// [...slug]/+server.ts
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { PageServerLoad } from './$types';

interface NavigationEntry {
	targetPath: string;
	friendlyName: string;
	sidebarTree?: any[];
	sidebarTitle?: string;
	children?: NavigationEntry[];
}

export const load: PageServerLoad = async ({ params }) => {
	// Load the YAML
	const yamlPath = path.resolve('./navigation.yaml');
	if (!fs.existsSync(yamlPath)) {
		throw new Error('navigation.yaml not found');
	}
	const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
	const navigationYaml = yaml.load(yamlContent) as NavigationEntry[];

	// Extract targetPath and friendlyName from root
	const rootEntry = navigationYaml[0];
	const ARGUMENT_ONE = rootEntry.targetPath || '';
	const ARGUMENT_TWO = rootEntry.friendlyName || '';

	const slugString = params.slug;

	// Determine current route
	let currentRoute: NavigationEntry | null = null;
	let agencyRoot: NavigationEntry | null = null;

	if (!slugString) {
		currentRoute = rootEntry;
		agencyRoot = rootEntry;
	} else {
		const segments = slugString.split('/');
		let currentItems = navigationYaml;
		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			if (!currentItems) break;
			const found = currentItems.find(
				(item: any) => item.targetPath === segment || item.slug === segment
			);
			if (!found) break;
			currentRoute = found;
			currentItems = found.children;
			if (i === 0) agencyRoot = found;
		}
	}

	if (!currentRoute || !agencyRoot) {
		throw new Error('Route not found');
	}

	// Feedback for debugging / verification
	console.log(`Loaded route:
  - ARGUMENT_ONE (targetPath): ${ARGUMENT_ONE}
  - ARGUMENT_TWO (friendlyName): ${ARGUMENT_TWO}
  - Current route: ${currentRoute.targetPath || currentRoute.slug}
  - Agency root: ${agencyRoot.targetPath || agencyRoot.slug}`);

	return {
		ARGUMENT_ONE,
		ARGUMENT_TWO,
		currentRoute,
		agencyRoot
	};
};
