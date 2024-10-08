import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params} ) => {
    const id = params.id

    console.log(`id is ${id}`);

    try{
        await connectToDB();
        const pool = getPool();
        console.log(`id is ${id}`);

        const result = await pool.query('SELECT * FROM membership where cid = $1', [id]);

        if(result.row === 0){
            return new Response('There is no membership for such club', { status: 404});
        } 
        return new Response(JSON.stringify(result.rows), { status: 200});    
    } catch(error){
        console.log("Error getting the membership", error);
        return new Response('Error getting the membership', { status: 500});
    }
}

export const PUT = async (req, { params }) => {
    const id  = params.id

    try {
        await connectToDB();
        const pool = getPool();
        const id = params.id
        const { stdID, stdName, stdgender, pid, stdemail} = await req.json();
        
        const result = await pool.query(`INSERT INTO MEMBERSHIP (stdId, stdname,stdgender, stdyear, pid, stdemail, cid), VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [stdID, stdName, stdgender, pid, stdemail, id]);
        return new Response('Member added sucessfully', { status: 201})
    } catch (error) {
        console.log('Error entering Member', { status: 500})
        return new Response('Failed to enter member', { status: 500})
    }
}

export const DELETE = async (req,{ params}) => {
    const id  = params.id

    try {
        await connectToDB();
        const pool = getPool();
        const result = pool.query(`DELETE from Membership WHERE MID = $1`, [id])
        if(result.rowCount === 0){
            return new Response('No such member exists', { status: 404 })
        }
        return new Response('Member delted sucessfully', { status: 200})
    } catch (error) {
        console.log('Error delteing the member', { status: 500 })
        return new Response('Error Deleting Member', { status: 500 })
    }
}