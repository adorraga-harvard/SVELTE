import { json } from '@sveltejs/kit';
// NOTE: Assuming runQuery is available in a library like $lib/old_db.ts and executes the SQL securely.
import { runQuery } from '$lib/dbSQLite';
// The new structure is imported from the client's data path
import { bridgeSchemas, type BridgeSchema } from '/etc/nginx/pdeaSchema';

/**
 * Dynamically builds the detailed SQL query string from a BridgeSchema (New Structure).
 * * NOTE: The old implementation is replaced entirely by the pre-calculated 'subQuery'.
 *
 * @param {BridgeSchema} schema The schema definition for the bridge, containing the full subQuery.
 * @returns {string} The fully constructed SQL query.
 */
function buildBridgeQuery(schema: BridgeSchema): string {
    // In the new structure, the subQuery property already contains the complete SELECT and JOIN logic.
    return schema.subQuery;
}

/** * Handles GET requests.
 * Executes either a generic SQL query provided by the client, or the default query
 * based on the 'tab' parameter.
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ url }) {
    const customSqlQuery = url.searchParams.get('sql'); // <-- NEW: Generic SQL parameter
    const bridgeName = url.searchParams.get('tab');
    let sql: string;
    let dataSource: any;
    if (customSqlQuery) {
        // --- CASE 1: EXECUTE CUSTOM SQL (For Chart/Map aggregation) ---
        // This handles the client's request to execute the aggregated chartSQL.
        sql = customSqlQuery;

        try {
            // Execute the raw SQL string provided by the client
            dataSource = await runQuery(sql);
        } catch (e: any) {
            console.error('Error executing custom SQL:', e.message);
            // Return 400 for bad query execution
            return json({ error: 'Invalid or failed custom SQL query' }, { status: 400 });
        }

    } else {
        // --- CASE 2: EXECUTE DEFAULT DATATABLE SQL (Standard tab load) ---

        if (!bridgeName) {
            return json({ error: 'Missing tab parameter' }, { status: 400 });
        }

        const schema = bridgeSchemas.find(s => s.name === bridgeName);
        if (!schema) {
            return json({ error: 'Invalid bridge name' }, { status: 404 });
        }

        // Use the new simplified structure: the subQuery is the full query itself.
        sql = buildBridgeQuery(schema);
        try {
            // Execute the default query for the main data table
            dataSource = await runQuery(sql);
        } catch (e: any) {
            console.error(`Error fetching default data for bridge ${bridgeName}:`, e.message);
            return json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    // Always return the superset payload { dataSource: data, sql: query }
    return json({ dataSource: dataSource, sql: sql });
}
