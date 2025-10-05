import { findRouteData } from '../project_Utils';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = ({ params, url }) => {
    const { currentRoute, agencyRoot, breadcrumbs } = findRouteData(params.slug);
    if (!currentRoute || !agencyRoot) throw error(404, 'Not found');
    const basePath = '/MMDA/' + agencyRoot.fs_path;
    return { sidebarTree: agencyRoot.children || [], sidebarTitle: agencyRoot.title, basePath: basePath, breadcrumbs: breadcrumbs, pathname: url.pathname };
}
