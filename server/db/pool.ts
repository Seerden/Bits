import { Pool } from "pg";
import { config } from "dotenv";

config();

const { PG_PASS, PG_HOST, PG_USER, PG_DATABASE } = process.env;

/*  Using environment variables, construct a node-postgres pool object 
    to be used for all database queries.  */

export default new Pool({
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASS,
    database: PG_DATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
