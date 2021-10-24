import { QueryResult } from "pg";
import pool from "./pool";

type QueryArgs = {
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
    let response: QueryResult<any> | undefined;

    try {
        response = await client.query({ ...queryOptions })
    } catch (e) {
        throw(e);
    } finally {
        client.release();
        return response;
    }
}

/**
 * Make multiple queries to the PostgreSQL database in a single go
 * @returns Array of postgres responses, one for each query that was made
 */
export async function makePooledQueries(queries: QueryArgs[]) {
    const client = await pool.connect();

    let responses: QueryResult<any>[] = [];

    try {
        for (const query of queries) {
            let response = await client.query({ ...query });
            responses.push(response);
        }
    } catch (e) {
        throw(e);
    } finally {
        client.release();
        return responses;
    }
}