import { connectToDB, getPool } from '../../../../utils/database';

export const GET = async (req, { params }) => {
    const id = params.id;
    console.log(id);

    try {
        await connectToDB();
        const pool = getPool();

        // Step 1: Check if cid exists for stdid
        const cidResult = await pool.query(`SELECT cid FROM membership WHERE stdid = $1`, [id]);

        if (cidResult.rowCount === 0) {
            return new Response(JSON.stringify({ message: 'No cid found for the provided stdid' }), { status: 404 });
        }

        const cid = cidResult.rows[0].cid;

        // Step 2: Get count of male and female members and total members in the club,
        // joining with the programme table to get pname based on pid
        const result = await pool.query(`
            SELECT m.stdid, m.stdname, m.stdgender, m.stdyear, m.stdemail, m.cid, p.pname 
            FROM membership m
            JOIN programme p ON m.pid = p.pid
            WHERE m.cid = $1;
        `, [cid]);

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Error getting the items' }), { status: 500 });
    }
};
