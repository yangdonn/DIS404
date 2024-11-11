import { connectToDB, getPool } from "../../../utils/database";

export const POST = async (req) =>{
    const { fundId, ename, amount, category, notes, cid } = await req.json();
    console.log({ fundId, ename, amount, category, notes, cid })
    try {
        await connectToDB();
        const pool = getPool();

        const eventResult = await pool.query(`SELECT eid FROM events WHERE ename = $1`, [ename]);
        
        if (eventResult.rowCount === 0) {
            return new Response('Event not found', { status: 404 });
        }

        const eId = eventResult.rows[0].eid; // Get the eid from the query result

        const result = await pool.query(
            `INSERT INTO fund (fundid, eid, amount, category,notes, cid) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [fundId, eId, amount, category, notes, cid]
        );
        return new Response('Funds recorded sucessfully', { status: 201 })
    } catch (error) {
        console.log('Error recording funds', error)
        return new Response('Failed to record funds', { status: 500 })
    }
}