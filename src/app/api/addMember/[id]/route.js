import { connectToDB, getPool } from "@/utils/database";
export const PUT = async (req, { params }) => {
    const id  = params.id;  // Declare id once outside the try block

    try {
        await connectToDB();
        const pool = getPool();
        const { stdName, stdyear, stdgender, stdemail, pid, cid } = await req.json();
        
        // Log data to verify values before querying
        console.log('Data to update:', { stdName, stdyear, stdgender, stdemail, pid, cid, id });
        
        const result = await pool.query(
            `UPDATE MEMBERSHIP 
             SET stdname = $1, stdyear = $2, stdgender = $3, stdemail = $4, pid = $5, cid = $6
             WHERE stdId = $7 
             RETURNING *`,
            [stdName, stdyear, stdgender, stdemail, pid, cid, id] // Use correct params
        );
        
        if(result.rows.length > 0) {
            return new Response('Member Edited successfully', { status: 200 });
        } else {
            return new Response('No member found to edit', { status: 404 });
        }
    } catch (error) {
        console.error('Error editing Member:', error); // Log the actual error
        return new Response('Failed to edit member', { status: 500 });
    }
}
