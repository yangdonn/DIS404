import { connectToDB, getPool } from '../../../../utils/database';

export const GET = async (req, { params }) => {
    const cid  = params.id; // Assuming you send `cid` in the query parameters
    try {
        // Step 1: Establish DB connection
        await connectToDB();
        const pool = getPool();

        // Step 2: Find the latest event ID (eid) for the given cid
        const result = await pool.query(
            `SELECT fundid FROM fund ORDER BY fundid DESC LIMIT 1`,
        );

        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ message: 'No events found for the provided cid' }), { status: 404 });
        }

        // Step 3: Extract the latest event id (eid)
        const latestFundId = result.rows[0].fundid.trim();

        // Step 4: Return the latest event ID
        return new Response(JSON.stringify({ latestFundId }), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Error getting the items' }), { status: 500 });
    }
};
