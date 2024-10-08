import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();
        const pool = getPool();
        console.log(id)
        const result = await pool.query(`SELECT * FROM EVENTS WHERE cid = $1`, [id]);

        if(result.rowCount === 0 ){
            return new Response('There is no event for the club', { status: 404 });
        }
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.log('Error getting the events for the club', error);
        return new Response('Error getting the events for the club', { status: 500 });
    }
}

export const POST = async (req, { params}) => {
    const id = params.id;
    try {
        await connectToDB();
        const { eName, eDate,eVenue, eDescription, eDresscode, cid} = await req.json();
        const pool = getPool();
    
        const result = await pool.query(`UPDATE events SET ename = $1, edate = $2, evenue = $3, edescription = $4, edresscode = $5, cid = $6 WHERE eid = $7`,
            [eName, eDate, eVenue, eDescription, eDresscode, cid, id]);
        
        if(result.rowCount === 0){
            return new Response('There is no such event', { status: 404 });
        }
        return new Response('Event updated successfully', { status: 200 });
    } catch (error) {
        console.log('Error updating the event', error);
        return new Response('Error updating the event', { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    const id = params.id
    try {
        await connectToDB();
        const pool = getPool();
        const result = await pool.query(`DELETE FROM events WHERE eid = $1`, [id]);

        if(result.rowCount === 0){
            return new Response('No such events exists', { status: 404 });
        }

        return new Response('Event delted sucessfully', { status: 200 });
        
    } catch (error) {
        console.log('Error delteing the event', { status: 500 });
        return new Response('Error Deleting Event', { status: 500 });
    }
}