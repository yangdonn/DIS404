import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async(req, { params }) => {
    const id = params.id;

    console.log(`this is id ${id}`)

    try {
        await connectToDB();
        const pool = getPool();
        const result = await pool.query(`SELECT * FROM feedback WHERE eID = $1`, [id]);
        if(result.rows.length === 0 ){
            return new Response('There is no feedback for the event', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows), { status: 200 });

    } catch (error) {
        console.log('Error getting the feedback', error)
        return new Response('Error getting the feedback', { status: 500});
    }
}

export const POST = async(req, { params }) => {
    const id = params.id;
    const { feedId, mId, feedComments } = await req.json();
    console.log({
        id,
        feedId,
        mId,
        feedComments
    })

    try {
        await connectToDB();
        const pool = getPool();
        await pool.query(`INSERT INTO feedback (feedId, eID, mID, feedcomments) VALUES ($1, $2, $3, $4)`, [feedId, id, mId, feedComments]);
        return new Response('Feedback added successfully', { status: 201 });
    } catch (error) {
        console.log('Error adding the feedback', error)
        return new Response('Error adding the feedback', { status: 500});
    }
}

export const DELETE = async(req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(`DELETE FROM feedback WHERE feedid = $1`, [id]);
        if(result.rowCount === 0 ){
            return new Response('There is no feedback for the event', { status: 404 });
        }
        return new Response('Feedback deleted successfully', { status: 200 });
    } catch (error) {
     console.log('Error deleting the feedback', error)
     return new Response('Error deleting the feedback', { status: 500});  
    }
}