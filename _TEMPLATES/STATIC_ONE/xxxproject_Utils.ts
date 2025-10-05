
import { config, type Route } from './project_Config';
export function findRouteData(slugString: string | undefined) {
    const result = { currentRoute: null as Route | null, agencyRoot: null as Route | null, breadcrumbs: [{ text: 'ARGUMENT_TWO', href: '/ARGUMENT_ONE', icon: 'Home' }] };
    if (!slugString) {
        if (config && config.length > 0) {
            result.currentRoute = config[0]; result.agencyRoot = config[0];
            result.breadcrumbs.push({ text: config[0].navTitle || config[0].title, href: '/ARGUMENT_ONE/' + config[0].fs_path, icon: null });
        }
        return result;
    }
    const segments = slugString.split('/');
    let currentItems: Route[] | undefined = config;
    let currentPath = '/ARGUMENT_ONE';
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (!currentItems) break;
        const found = currentItems.find(item => item.fs_path === segment);
        if (!found) break;
        currentPath += '/' + found.fs_path;
        result.breadcrumbs.push({ text: found.navTitle || found.title, href: currentPath, icon: null });
        result.currentRoute = found;
        currentItems = found.children;
        if (i === 0) result.agencyRoot = found;
    }
    return result;
}
