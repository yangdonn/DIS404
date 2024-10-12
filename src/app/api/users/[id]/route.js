import { connectToDB, getPool } from "../../../../utils/database";

export const DELETE = async (req, { params }) => {
    const id = params.id
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query(
            `DELETE FROM users WHERE id = $1`,
            [id]
        );
        if(result.rowCounts === 0){
            return new Response({ message: 'User not found' }, { status: 404 })
        }
        return new Response({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log('Error deleting user', error);
        return new Response({ message: 'Failed to delete user' }, { status: 500 });
    }
}