import { connectToDB, getPool } from "../../../utils/database";

export const POST = async (req) =>{
   const { loginID, mid, luserName, lpassword, status} = await req.json();
    try {
        await connectToDB();
        const pool = getPool();
        const result = await pool.query(
            `INSERT INTO login (loginid, mid, lusername, lpassword, status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [loginID, mid, luserName, lpassword, status]
        );
        return new Response({ message: 'Login created successfully' }, { status: 201 });
        
    } catch (error) {
        console.log('Error creating login', error);
        return new Response({ message: 'Failed to create login' }, { status: 500 });
    }
}