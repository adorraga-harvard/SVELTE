import Database from 'better-sqlite3';
import path from 'path';
import process from 'process';

// --- DATABASE EXECUTION UTILITY ---
export function runQuery<T>(
    query: string,
    params: any[] = [],
    sqlFile: string = 'pdea'
): T[] {
    const dbPath = path.resolve(process.cwd(), `/etc/nginx/${sqlFile}.sqlite`);
    let db: Database | null = null;
    try {
        db = new Database(dbPath, { readonly: true });
        console.log(`[DB] Connected to database: ${sqlFile}.sqlite`);
        return db.prepare(query).all(...params) as T[];
    } catch (e) {
        console.error(`[DB ERROR] Failed to execute query against ${sqlFile}:`, e);
        throw new Error(`Database query failed for ${sqlFile}.`);
    } finally {
        if (db) {
            db.close();
        }
    }
}

// --- CORE RELATIONAL UTILITIES ---
interface ForeignKey {
    id: number;
    seq: number;
    table: string; // The target table name (e.g., lookup_regions)
    from: string;  // The column in the source table (e.g., region_fk)
    to: string;    // The column in the target table (e.g., id)
}

interface ColumnInfo {
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: any;
    pk: number; // 1 if Primary Key
}

function singularizeSimple(word: string): string {
    if (word === 'classifications') return 'classification';
    if (word === 'statuss') return 'status';
    if (word.endsWith('s')) {
        return word.slice(0, -1);
    }
    return word;
}

// Helper to check if a column name suggests a timestamp
function isDateTimeColumn(columnName: string): boolean {
    const lowerName = columnName.toLowerCase();
    // Check for _on, _date, _at, or _dt suffixes (and _ts)
    return lowerName.endsWith('_on') || lowerName.endsWith('_date') || lowerName.endsWith('_at') || lowerName.endsWith('_dt') || lowerName.endsWith('_ts');
}

// Helper function to wrap a column in a readable datetime format
function formatTimestamp(column: string, tableAlias: string): string {
    const alias = `${tableAlias}."${column}"`;
    return `datetime(${alias}, 'unixepoch') AS "${column}"`;
}

// Helper to check if a column is a universally required descriptive dimension
function isUniversalDimension(columnName: string): boolean {
    const lowerName = columnName.toLowerCase();
    return lowerName === 'region' || lowerName === 'province' || lowerName === 'city' || lowerName === 'barrio' || lowerName === 'location';
}

// Helper to wrap a boolean (0/1) column in a readable string
function formatBoolean(column: string, tableAlias: string): string {
    const alias = `${tableAlias}."${column}"`;
    // Use a SQL CASE statement to convert 1/0 to 'Checked'/'No'
    return `CASE ${alias} WHEN 1 THEN 'Checked' ELSE 'No' END AS "${column}"`;
}

/**
 * Executes PRAGMA table_info to find the true Primary Key column name of a table.
 * @param targetTableName The table to inspect.
 * @returns The name of the PK column (e.g., 'id', 'creator_id'), or 'id' as a fallback.
 */
function getPrimaryKeyColumn(targetTableName: string): string {
    try {
        const columns = runQuery<ColumnInfo[]>(`PRAGMA table_info("${targetTableName}")`, [], 'sentinel');
        const pkColumn = columns.find(col => col.pk === 1);

        return pkColumn ? pkColumn.name : 'id';
    } catch (e) {
        return 'id';
    }
}

// Define the output structure for the utility function
interface RelationalQueryOutput {
    finalQuery: string;
    groupingCandidates: string[];
}

export function buildRelationalQuery(tableName: string): RelationalQueryOutput {
    // 1. Fetch Foreign Key Schema and Source Table Columns
    const fkList = runQuery<ForeignKey[]>(`PRAGMA foreign_key_list("${tableName}")`, [], 'sentinel');
    const sourceColumns = runQuery<ColumnInfo[]>(`PRAGMA table_info("${tableName}")`, [], 'sentinel');

    let selectClauses: string[] = [];
    let joinClauses: string[] = [];
    let groupingCandidates: string[] = [];

    // Determine which columns in T1 are foreign keys
    const fkColumnNames = fkList.map(fk => fk.from);

    // 2. Build SELECT clauses from source table, EXCLUDING FKs
    sourceColumns.forEach(col => {
        const lowerName = col.name.toLowerCase();

        // --- CRITICAL FIX: EXCLUDE ALL ID/FK/REF COLUMNS ---
        // Exclude foreign key columns, and exclude any column ending in _id
        if (fkColumnNames.includes(col.name) || lowerName.endsWith('_id')) {
            return;
        }

        // --- APPLY PREFIXING & FORMATTING (Non-FK Columns) ---

        // 1. Format Date/Time columns and prefix * for the candidate list
        if (isDateTimeColumn(col.name)) {
            selectClauses.push(formatTimestamp(col.name, 'T1'));
            groupingCandidates.push(`*${col.name}`);
        }
        // 2. Select and Format Boolean columns (is_)
        else if (lowerName.startsWith('is_')) {
            selectClauses.push(formatBoolean(col.name, 'T1'));
            groupingCandidates.push(col.name);
        }
        // 3. Select universally important descriptive columns and add them to candidates
        else if (isUniversalDimension(col.name)) {
            selectClauses.push(`T1."${col.name}"`);
            groupingCandidates.push(col.name);
        }
        // 4. Select standard original columns (add non-FK PK/ID to grouping candidates)
        else {
            selectClauses.push(`T1."${col.name}"`);
            // Add non-ID columns that are not FKs to candidates
            if (col.name.toLowerCase() !== 'id' && col.name.toLowerCase() !== 'pk') {
                 groupingCandidates.push(col.name);
            }
        }
    });

    // 3. Dynamic JOINs and SELECT descriptive columns
    fkList.forEach((fk, index) => {
        const joinAlias = `T${index + 2}`;
        const targetTable = fk.table;
        const sourceColumn = fk.from;

        const targetColumn = getPrimaryKeyColumn(targetTable);

        const aliasPrefix = sourceColumn.replace(/_fk$/i, '');

        // Add the INNER JOIN clause (always required)
        joinClauses.push(
            `INNER JOIN "${targetTable}" AS ${joinAlias} ON T1."${sourceColumn}" = ${joinAlias}."${targetColumn}"`
        );

        // --- Conditional Logic for Descriptive Columns ---

        if (targetTable === 'external_creators') {
            // CUSTOM RULE: Use fixed columns and specific aliases
            selectClauses.push(
                `${joinAlias}."creator_ext" AS ${aliasPrefix}_name`,
                `${joinAlias}."full_name" AS ${aliasPrefix}_description`
            );
            // ADD the descriptive columns to candidates
            groupingCandidates.push(`${aliasPrefix}_name`);
        }
        else if (targetTable.startsWith('lookup_')) {
            const targetParts = targetTable.split('_');
            const pluralSuffix = targetParts[targetParts.length - 1];
            const descriptivePrefix = singularizeSimple(pluralSuffix);

            // Lookup tables: Clean aliases (e.g., level_name, level_description)
            selectClauses.push(
                `${joinAlias}."${descriptivePrefix}_name" AS ${descriptivePrefix}_name`,
                `${joinAlias}."description" AS ${descriptivePrefix}_description`
            );
            // ADD the descriptive name column to candidates
            groupingCandidates.push(`${descriptivePrefix}_name`);
        } else {
            // Generic fallback for other core_ or non-lookup tables.
            selectClauses.push(
                `${joinAlias}."name" AS ${aliasPrefix}_name`,
                `${joinAlias}."id" AS ${aliasPrefix}_id_ref` // Include ID Ref for internal grouping/debug
            );
            // ADD the generic name to candidates
            groupingCandidates.push(`${aliasPrefix}_name`);
        }
    });

    // 4. Filter out any remaining ID/Reference columns from the candidates list
    // This removes numeric keys and keeps only human-readable dimensions
    const finalCandidates = groupingCandidates.filter(candidate => {
        return !candidate.endsWith('_id') && !candidate.endsWith('_id_ref');
    });

    // 5. Assemble the raw SQL template (without LIMIT)
    const rawTemplate = `
        SELECT 
          ${selectClauses.join(', ')}
        FROM 
          "${tableName}" AS T1
        ${joinClauses.join('\n')}
    `;

    // 6. Return the query and the final, clean list of safe grouping columns
    return {
        finalQuery: rawTemplate,
        groupingCandidates: finalCandidates,
    };
}
