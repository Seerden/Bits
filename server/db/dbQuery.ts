import { QueryResult } from "pg";
import { withCamelCaseKeys } from "../lib/toCamelCase";
import pool from "./pool";

export type QueryArgs = {
    name?: string,
    values?: any[],
    text: string
}

/**
 * Make a single query to the PostgreSQL database
 * @returns postgres response
 */
export async function makePooledQuery(queryOptions: QueryArgs){ 
    const client = await pool.connect();

    try {
        const { rows } = await client.query({ ...queryOptions })
        return withCamelCaseKeys(rows);
    } catch (e) {
        throw(e);
    } finally {
        client.release();
    }
}

/**
 * Make multiple queries to the PostgreSQL database in a single go
 * @returns Array of postgres responses, one for each query that was made
 */
export async function makePooledQueries(queries: QueryArgs[]) {
    const client = await pool.connect();

    
    try {
        let responses: any[] = [];
        for (const query of queries) {
            let { rows } = await client.query({ ...query });
            responses.push(withCamelCaseKeys(rows));
        };
        return responses;
    } catch (e) {
        throw(e);
    } finally {
        client.release();
    }
}