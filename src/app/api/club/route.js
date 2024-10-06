
import { connectToDB, getPool } from "../../../utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const pool = getPool(); 
        const { rows } = await pool.query('SELECT * FROM club');
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error('Error retrieving clubs:', error);
        return new Response('Error retrieving clubs', { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        await connectToDB();
        const pool = getPool(); // Get the existing pool instance
        const body = await req.json();
        const { clubid, clubname, clubdescription, clubimage, clubcoordinator, clubadvisor } = body;

        const result = await pool.query(
            `INSERT INTO club (clubid, clubname, clubdescription, clubimage, clubcoordinator, clubadvisor) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [clubid, clubname, clubdescription, clubimage, clubcoordinator, clubadvisor]
        );

        return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (error) {
        console.error('Error creating club:', error);
        return new Response('Error creating club', { status: 500 });
    }
};
