import { Pool } from 'pg';

let pool;
let isConnection = false;

export const connectToDB = async () => {
    if (isConnection) {
        console.log('Postgres is already connected');
        return;
    }

    try {
        if (!pool) {
            pool = new Pool({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DB_NAME,
                ssl: { rejectUnauthorized: false } // This may be needed based on your setup
            });
        }

        // Ensure the connection is established
        await pool.connect();
        isConnection = true;
        console.log('Postgres is connected');
    } catch (error) {
        console.error('Error connecting to Postgres:', error);
        throw error; // Re-throw the error so the calling function can handle it
    }
};

export const getPool = () => pool;
