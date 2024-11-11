import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
    const id = params.id;
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(`SELECT * FROM login Where mid = $1`, [id]);

        return new Response(JSON.stringify(result.rows), { status: 200 });

    } catch (error) {
        return new Response('Error getting profile', { status: 500 });
    }
}

export const POST = async (req, { params }) => {

    const id = params.id;

    try {
        await connectToDB();
        const pool = getPool();
        const { mid, lusername, lpassword, status } = await req.json();
        const hashedPassword = await bcrypt.hash(lpassword, 10);

        const result = await pool.query(`Update login set lusername = $1, lpassword = $2, status = $3, mid = $4 where loginid = $5`, [lusername, hashedPassword, status, mid, id]);
        return new Response('Profile Updated Successfully', { status: 201 });
    } catch (error) {
     return new Response('Error updating profile', { status: 500 });   
    }

}
