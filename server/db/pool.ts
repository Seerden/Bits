import { Client, Pool } from 'pg';
import { config } from 'dotenv';

config();

const { PG_PASS, PG_HOST, PG_USER, PG_DATABASE } = process.env;

export default new Pool({
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASS,
    database: PG_DATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});