// +page.server.ts

import { bridgeSchemas, type BridgeSchema } from '/etc/nginx/pdeaSchema';
import type { PageServerLoad } from './$types';

/**
 * @type {PageServerLoad}
 * Loads the static data for the client-side component on initial page load,
 * including the complete schema data for all bridges.
 */
export async function load(): Promise<{ tabs: any[], sqlQueries: Record<string, string>, schemas: BridgeSchema[] }> {

    // Maps schema into simple tab structures (for backwards compatibility)
    const tabs = bridgeSchemas.map(schema => ({
        name: schema.name,
        topDescription: schema.topDescription
    }));

    // Maps schema into a dictionary of executable SQL queries (for backwards compatibility)
    const sqlQueries = bridgeSchemas.reduce((acc, schema) => {
        acc[schema.name] = schema.subQuery;
        return acc;
    }, {} as Record<string, string>);

    // This is the complete, full schema data as requested
    const schemas = bridgeSchemas;

    return {
        tabs,
        sqlQueries,
        schemas // The full data, now available to the client
    };
}