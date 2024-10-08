import { connectToDB, getPool } from "../../../utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(`SELECT * FROM events`);

        return new Response(JSON.stringify(result.rows), { status: 200 });

    } catch (error) {
        return new Response('Error getting events', { status: 500 });
    }
}

export const POST = async (req) => {
    const { eId, eName, eDate, eVenue, eDescription, eDresscode, cid } = await req.json();

    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(`INSERT INTO EVENTS(eId, eName, eDate, eVenue,eDescription,eDresscode, cid) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [eId, eName, eDate, eVenue, eDescription, eDresscode, cid]
        )
        return new Response('Events Added Successfully',{ status: 201 } )
    } catch (error) {
        console.log('Error adding the events', { status: 500 })
        return new Response('Error adding the events', { status: 500 } )
    }
}