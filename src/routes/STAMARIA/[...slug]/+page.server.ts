// src/routes/[...slug]/+server.ts
import type { PageServerLoad } from './$types';
// vvv 1. IMPORT YOUR DATA CATALOG (OR SPECIFIC GENERATORS) vvv
import { dataCatalog } from '$lib/DataSources/DS_MockDataSource';

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;') // Corrected: uses "/g"
		.replace(/'/g, '&#39;');
}
export const load: PageServerLoad = async ({ params, parent }) => {
	// ... (all your existing code for finding the route remains the same)
	const layoutData = await parent();
	const { targetPath, friendlyName, navigation } = layoutData as any;
	const slugString = params.slug ?? '';
	let currentRoute: any = null;
	let agencyRoot: any = null;
	function findBySlug(nodes: any[], slug: string): any | null {
		for (const node of nodes || []) {
			if (!node) continue;
			if (node.slug === slug) return node;
			if (Array.isArray(node.children)) {
				const found = findBySlug(node.children, slug);
				if (found) return found;
			}
		}
		return null;
	}
	function findByLastSegment(nodes: any[], last: string): any | null {
		for (const node of nodes || []) {
			if (!node) continue;
			const nodeLast = (node.slug || '').split('/').pop();
			if (nodeLast === last) return node;
			if (Array.isArray(node.children)) {
				const found = findByLastSegment(node.children, last);
				if (found) return found;
			}
		}
		return null;
	}
	if (!slugString) {
		currentRoute = {
			slug: targetPath,
			navTitle: friendlyName,
			children: navigation,
			provider: String(targetPath).replace(/^\/+/, '').toLowerCase(),
			description: `<p>Welcome to ${escapeHtml(String(friendlyName))}</p>`
		};
		agencyRoot = currentRoute;
	} else {
		currentRoute = findBySlug(navigation, slugString);
		if (!currentRoute) {
			const lastSeg = slugString.split('/').pop() || '';
			if (lastSeg) {
				currentRoute = findByLastSegment(navigation, lastSeg);
			}
		}
		if (currentRoute) {
			agencyRoot =
				(navigation || []).find((n: any) => {
					return typeof n.slug === 'string' && slugString.startsWith(n.slug);
				}) || null;
			const provKey = String(currentRoute.slug || '')
				.replace(/^\/+/, '')
				.toLowerCase();
			const rawDesc = currentRoute.description ?? `${currentRoute.navTitle ?? 'Page'}`;
			const htmlDesc = /<[^>]+>/.test(rawDesc) ? String(rawDesc) : `<p>${escapeHtml(String(rawDesc))}</p>`;
			currentRoute = {
				...currentRoute,
				provider: provKey,
				description: htmlDesc
			};
		}
	}
	// ... (end of your existing code)

	if (!currentRoute || !agencyRoot) {
		throw new Error(`Route not found for slug: '${params.slug ?? ''}'`);
	}

	// vvv 2. FETCH COMPONENT DATA BASED ON THE FOUND ROUTE vvv
	let componentData = {};
	// The 'provider' key (e.g., 'table', 'kpi-deck') is used to find the right data.
	const providerKey = currentRoute.provider;

	// Use your dataCatalog to find the correct data generator
	const generatorInfo = Object.values(dataCatalog).find(
		(item: any) => item.prop === providerKey
	);

	if (generatorInfo) {
		componentData = generatorInfo.generator();
	} else {
		// Fallback for other providers, you can add more logic here
		// For example, your 'investigation-reports' might map to the 'Table' generator
		if (providerKey === 'investigation-reports' && dataCatalog.Table) {
			componentData = dataCatalog.Table.generator();
		}
	}
	// ^^^ END OF NEW LOGIC ^^^

	// 3. MERGE the route data with your new component data and return it
	return {
		slug: currentRoute.slug,
		navTitle: currentRoute.navTitle,
		provider: currentRoute.provider,
		currentRoute,
		agencyRoot,
		...componentData // <-- This merges in your records, download info, etc.
	};
};