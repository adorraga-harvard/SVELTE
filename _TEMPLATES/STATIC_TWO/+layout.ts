// [...slug]/+layout.server.ts
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from '@sveltejs/kit';

interface NavigationEntry {
	targetPath: string;
	friendlyName: string;
	sidebarTree?: any[];
	sidebarTitle?: string;
	children?: NavigationEntry[];
}

export const load: LayoutLoad = async ({ params, url, parent }) => {
	// Get navigation array from root +layout.server.ts
	const { navigation } = await parent() as { navigation: NavigationEntry[] };

	// Read YAML for ARGUMENT_ONE / ARGUMENT_TWO values
	const yamlPath = path.resolve('./navigation.yaml');
	if (!fs.existsSync(yamlPath)) throw error(500, 'navigation.yaml not found');

	const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
	const navigationYaml = yaml.load(yamlContent) as NavigationEntry[];

	// Extract targetPath and friendlyName from YAML
	const rootEntry = navigationYaml[0];
	const ARGUMENT_ONE = rootEntry.targetPath || '';
	const ARGUMENT_TWO = rootEntry.friendlyName || '';

	const slugString = params.slug;
	const result = {
		currentRoute: null as NavigationEntry | null,
		agencyRoot: null as NavigationEntry | null,
		breadcrumbs: [{ text: ARGUMENT_TWO, href: `/${ARGUMENT_ONE}`, icon: 'Home' }]
	};

	if (!slugString) {
		if (navigation && navigation.length > 0) {
			result.currentRoute = navigation[0];
			result.agencyRoot = navigation[0];
			result.breadcrumbs.push({
				text: navigation[0].navTitle || navigation[0].friendlyName || 'Untitled',
				href: `/${navigation[0].targetPath}`,
				icon: null
			});
		}
	} else {
		const segments = slugString.split('/');
		let currentItems = navigation;
		let currentPath = `/${ARGUMENT_ONE}`;

		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			if (!currentItems) break;

			const found = currentItems.find((item: any) => item.targetPath === segment || item.slug === segment);
			if (!found) break;

			currentPath += '/' + (found.targetPath || found.slug);
			result.breadcrumbs.push({
				text: found.navTitle || found.friendlyName || 'Untitled',
				href: currentPath,
				icon: null
			});

			result.currentRoute = found;
			currentItems = found.children;
			if (i === 0) result.agencyRoot = found;
		}
	}

	if (!result.currentRoute || !result.agencyRoot) throw error(404, 'Not found');

	const basePath = `/${ARGUMENT_ONE}/${result.agencyRoot.targetPath || result.agencyRoot.slug}`;

	return {
		sidebarTree: result.agencyRoot.children || [],
		sidebarTitle: result.agencyRoot.navTitle || result.agencyRoot.friendlyName,
		basePath,
		breadcrumbs: result.breadcrumbs,
		pathname: url.pathname
	};
};
