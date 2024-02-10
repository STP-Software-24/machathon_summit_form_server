import { Pool } from 'pg';

const DEFAULT_PORT=5432;

export const dbPool = new Pool({
    //connectionString: process.env.PROD_DB_CONNECTION_STRING
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD || 'postgres',
    port: Number(process.env.DB_PORT) || DEFAULT_PORT
});