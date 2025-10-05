// Assuming this file is in the same folder as navigation.ts
import type { LayoutServerLoad } from './$types';

// Corrected Path: Use './' for files in the same directory.
import { navigation, siteInfo } from './navigation';

export const load: LayoutServerLoad = async () => {
	return {
		targetPath: siteInfo.targetPath,
		friendlyName: siteInfo.friendlyName,
		navigation: navigation
	};
};