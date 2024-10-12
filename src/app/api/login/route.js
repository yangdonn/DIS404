import { connectToDB, getPool } from '../../../utils/database';
import bcrypt from 'bcrypt';


export const POST = async (req) => {
    try {
        await connectToDB();
        const pool = getPool();
        
        const { userName, password } = await req.json();
        
        const checkUser = await pool.query('SELECT * FROM users WHERE lusername = $1', [userName]);
        if (checkUser.rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 404 });
        }

        const userPassword = checkUser.rows[0].lpassword;

        const match = await bcrypt.compare(password, userPassword);
        if (!match) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Login Successful' }), { status: 200 });
        
    } catch (error) {
        console.error('Error getting the credentials:', error);
        return new Response(JSON.stringify({ message: 'Error getting the credentials' }), { status: 500 });
    }
};
