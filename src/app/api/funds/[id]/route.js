import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
    const id = params.id;
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(
            `
            SELECT fund.*, events.edate, events.ename
            FROM fund
            JOIN events ON fund.eid = events.eid
            WHERE fund.cid = $1
            `,
            [id]
          );
          

        if (result.rows.length === 0) {
            pool.end()
            return new Response('There is no such fund', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error getting the fund' }), { status: 500 });

    }
}
export const PUT = async (req, { params }) => {
    const id = params.id;
    const { ename, amount,category, notes, cid } = await req.json(); // Receive ename instead of eId
    try {
        await connectToDB();
        const pool = getPool();

        // Step 1: Retrieve the eid from the events table using the ename
        const eventResult = await pool.query(`SELECT eid FROM events WHERE ename = $1`, [ename]);
        
        if (eventResult.rowCount === 0) {
            return new Response('Event not found', { status: 404 });
        }

        const eId = eventResult.rows[0].eid; // Get the eid from the query result

        // Step 2: Perform the update in the fund table using the retrieved eid
        const result = await pool.query(
            `UPDATE fund SET eid = $1, amount = $2, category = $3, notes = $4, cid = $5 WHERE fundid = $6`,
            [eId, amount, category, notes,cid, id]
        );

        if (result.rowCount === 0) {
            return new Response('No matching fund record found', { status: 404 });
        }

        return new Response('Fund updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error updating the fund record:', error);
        return new Response('Error updating fund', { status: 500 });
    }
};
   


export const DELETE = async (req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query('DELETE FROM fund WHERE fundid = $1', [id]);
        if (result.rowCount === 0) {
            return new Response('There is no such fund', { status: 404 });
        }
        return new Response('Fund delted sucessfully', { status: 200 })
    } catch (error) {
        console.error('Error deleting fund:', error);
        return new Response('Error deleting fund', { status: 500 });
    }
}