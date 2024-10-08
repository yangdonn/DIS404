import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
    const id = params.id;
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query('SELECT * FROM fund WHERE cid = $1', [id]);

        if (result.rows.length === 0) {
            pool.end()
            return new Response('There is no such fund', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows[0]), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error getting the fund' }), { status: 500 });

    }
}
export const PUT = async (req, { params }) => {
    const id = params.id;
    const {eId, fundGen, amount,cid } = await req.json();
    try {
        await connectToDB();
        const pool = getPool();

        const result = pool.query(`UPDATE fund SET eID = $1, fundGen = $2, amount = $3, cid = $4 WHERE fundid = $5`, 
            [eId, fundGen, amount, cid, id]);
        if(result.rowCount === 0){
            return new Response('There is no such fund', { status: 404 });
        }
        return new Response('Fund updated successfully', { status: 201 });
    } catch (error) {
        console.log('Error updating the fundRecord', error);
        return new Response('Error updaing FUnd', { status: 500 })
    }
}
    


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