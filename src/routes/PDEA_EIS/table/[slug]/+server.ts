import { json } from '@sveltejs/kit';
import { runQuery } from '$lib/dbSQLite';
export async function GET({ params }) {
    const { slug: tableName } = params;
    try {
        const query = `SELECT * FROM "${tableName}" LIMIT 500`;
        const result = runQuery<Record<string, any>[]>(query);
        if (result.length === 0) {
            return json({ columns: [], rows: [], message: 'No data found.' });
        }
        const columns = Object.keys(result[0]);
        const rows = result;
        return json({ columns, rows });
    } catch (e: any) {
        console.error(`[DB] Query error for table "${tableName}":`, e.message);
        return new Response(e.message, { status: 500 });
    }
}
