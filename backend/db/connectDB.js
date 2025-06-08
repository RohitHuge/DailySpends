import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('PostgreSQL connected');
        client.release();
        return pool;
    } catch (err) {
        throw new Error(`PostgreSQL connection error: ${err.message}`);
    }
};

export { pool, connectDB as default };