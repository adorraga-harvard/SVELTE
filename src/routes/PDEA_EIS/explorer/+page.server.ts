import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes';
import { runQuery } from '$lib/dbSQLite';

export const load: PageServerLoad = async () => {
    console.log('[SvelteKit] Server-side load function is executing.');

    try {
        const tables = await runQuery<{ name: string }[]>(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        );
        return { tables: tables.map(t => t.name) };
    } catch (e: any) {
        console.error('[SvelteKit] Database load error:', e);
        return {
            tables: [],
            error: `Could not connect to the SQLite database. Please ensure your configuration is correct.`
        };
    }
};
