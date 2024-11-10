import { connectToDB, getPool } from "@/utils/database";
export const PUT = async (req, { params }) => {

    try {
        await connectToDB();
        const pool = getPool();
        const { stdID, stdName,stdgender, stdyear, pid, stdemail, cid} = await req.json();
        
        const result = await pool.query(`INSERT INTO MEMBERSHIP (stdId, stdname,stdgender, stdyear,pid, stdemail, cid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [stdID, stdName, stdgender,stdyear,pid ,stdemail, cid]);
        return new Response('Member added sucessfully', { status: 201})
    } catch (error) {
        console.log('Error entering Member', { status: 500})
        return new Response('Failed to enter member', { status: 500})
    }
}