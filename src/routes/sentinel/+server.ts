import { json } from '@sveltejs/kit';
import { runQuery } from '$lib/dbSQLite';

// A more robust singularization function to handle lookup table suffixes
function singularize(word: string): string {
    if (word === 'classifications') return 'classification';
    if (word === 'statuss') return 'status';

    if (word.endsWith('s')) {
        return word.slice(0, -1);
    }
    return word;
}


export async function POST({ request }) {
    try {
        const body = await request.json();
        const { sql } = body;

        if (!sql || typeof sql !== 'string') {
            return json({ status: 400, error: 'Missing or invalid SQL string.' }, { status: 400 });
        }

        console.log("Running custom aggregation SQL:", sql);

        const result = await runQuery<Record<string, any>[]>(sql, [], 'sentinel');

        return json({ status: 200, data: result }, { status: 200 });

    } catch (e: any) {
        console.error("[SERVER ERROR] Failed to execute aggregation SQL:", e.message);
        return json({
            status: 500,
            error: 'Internal server error while executing aggregation SQL.',
            detail: e.message
        }, { status: 500 });
    }
}


export async function GET({ url }) {
    const tableName = url.searchParams.get('tableName');
    let dataSource: any;

    if (!tableName) {
        return json({ status: 400, error: 'Missing tableName parameter.' }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
        return json({ status: 400, error: 'Invalid tableName format.' }, { status: 400 });
    }

    try {
        const query = `SELECT * FROM "${tableName}" LIMIT 500`;
        console.log("QUERY : ", query);
        const result = await runQuery<Record<string, any>[]>(query, [], 'sentinel');

        if (tableName.includes("lookup_")) {
            const parts = tableName.split('_');
            const suffix = parts[parts.length - 1];

            const finalColumnPrefix = singularize(suffix);

            // Return a simple array of mapped objects for lookup tables
            dataSource = result.map((row: any) => {
                const idCol = `${finalColumnPrefix}_id`;
                const nameCol = `${finalColumnPrefix}_name`;

                if (row[idCol] === undefined || row[nameCol] === undefined) {
                    console.error(`Missing columns in ${tableName}: ${idCol}, ${nameCol}. Returning original row.`);
                    return row;
                }

                return {
                    id: row[idCol],
                    name: row[nameCol],
                    description: row.description || '',
                };
            });
            console.log(`[Server] Returning mapped lookup table data for: ${tableName}`);
        } else {
            // Return { columns, rows } for core tables
            dataSource = {
                columns: result.length > 0 ? Object.keys(result[0]) : [],
                rows: result
            };
            console.log(`[Server] Returning core table data for: ${tableName}`);
        }

        return json({ status: 200, data: dataSource }, { status: 200 });

    } catch (e: any) {
        console.error(`[SERVER ERROR] Failed to fetch data for ${tableName}:`, e.message);
        return json({
            status: 500,
            error: 'Internal server error while fetching database values.',
            detail: e.message
        }, { status: 500 });
    }
}