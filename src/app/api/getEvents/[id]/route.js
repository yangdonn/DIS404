import { connectToDB, getPool } from '../../../../utils/database';

export const GET = async (req, { params }) => {
    const id = params.id; // This should be the stdid
    try {
        await connectToDB();
        const pool = getPool();
        
        // Step 1: Check if cid exists for stdid
        const cidResult = await pool.query(`SELECT cid FROM membership WHERE stdid = $1`, [id]);

        if (cidResult.rowCount === 0) {
            return new Response(JSON.stringify({ message: 'No cid found for the provided stdid' }), { status: 404 });
        }
        
        const cid = cidResult.rows[0].cid;

        // Step 2: Get events for the retrieved cid
        // Change here to filter by cid instead of eid
        const result = await pool.query(`SELECT ename, edate FROM events WHERE cid = $1`, [cid]);

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Error getting the items' }), { status: 500 });
    }
};
