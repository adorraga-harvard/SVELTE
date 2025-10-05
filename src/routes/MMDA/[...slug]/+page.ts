import { findRouteData } from '../project_Utils';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => {
    const { currentRoute } = findRouteData(params.slug);
    if (!currentRoute) { throw error(404, 'Not found'); }
    return { pageData: currentRoute };
}
