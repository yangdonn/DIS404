import { connectToDB, getPool } from "../../../utils/database";

export const POST = async (req) =>{
    const { fundId, eID, fundGen, amount, cid } = await req.json();
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(
            `INSERT INTO fund (fundid, eid, fundgen, amount, cid) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [fundId, eID, fundGen, amount, cid]
        );
        return new Response('Funds recorded sucessfully', { status: 201 })
    } catch (error) {
        console.log('Error recording funds', error)
        return new Response('Failed to record funds', { status: 500 })
    }
}