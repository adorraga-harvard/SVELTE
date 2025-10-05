import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { runQuery, buildRelationalQuery } from '$lib/dbSQLite';

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug;
    const tableName = `core_${slug}`;
    const limit = 500;

    try {
        // 1. Destructure the output of buildRelationalQuery (contains SQL and candidates list)
        const { finalQuery, groupingCandidates } = buildRelationalQuery(tableName);

        // 2. Append the LIMIT clause to the final query
        const queryWithLimit = `${finalQuery} LIMIT ${limit}`;

        console.log("QUERY:", queryWithLimit);

        // 3. Execute the complex relational query
        const data = await runQuery(queryWithLimit, [], 'sentinel');

        // Check for empty data set
        if (data.length === 0) {
            console.warn(`[SERVER WARN] No data found for table: ${tableName}`);
            return {
                tableData: {
                    columns: [],
                    rows: []
                },
                groupingCandidates: groupingCandidates, // Pass candidates even if data is empty
                finalQuery: finalQuery
            };
        }

        // 4. Return the fully structured data and candidates
        return {
            tableData: {
                // Columns are derived directly from the SQL output keys (which are clean)
                columns: data.length > 0 ? Object.keys(data[0]) : [],
                rows: data
            },
            // CRITICAL: Pass the list of machine-readable grouping columns to the front end
                groupingCandidates: groupingCandidates,
                finalQuery: finalQuery
        };
    } catch (e: any) {
        console.error(`[SERVER ERROR] Failed to load data for ${tableName}:`, e.message);
        throw error(500, `Could not load data for ${tableName}: ${e.message}`);
    }
};
