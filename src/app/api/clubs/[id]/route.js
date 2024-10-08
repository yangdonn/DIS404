
import { connectToDB, getPool } from "../../../../utils/database"


export const GET = async (req,{ params }) => {
    const id = params.id;
    try {
        await connectToDB();
        const pool = getPool();

        const result = await pool.query('SELECT * FROM club WHERE clubid = $1', [id]);
        
        if(result.rows.length === 0 ){
            pool.end()
            return new Response('There is no such club', { status: 404 });
        }

        return new Response(JSON.stringify(result.rows[0]), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error getting the club'}), { status: 500 });
        
    }
}

export const PUT = async (req, {params}) =>{
    const id = params.id;
    const { clubName, clubDescription, clubImage, clubCoordinator, clubAdvisor } = await req.json();


    try {
        await connectToDB();
        const pool = getPool();
        console.log(id)
        const result = await pool.query('UPDATE club SET clubname = $1, clubdescription = $2, clubImage = $3, clubCoordinator = $4, clubAdvisor = $5 WHERE clubid = $6',
            [clubName, clubDescription, clubImage, clubCoordinator, clubAdvisor, id]
        )

        if(result.row === 0 ){

            return new Response('There is so such club', { status: 404 });
        }

        return new Response(JSON.stringify({ mesasge: 'Club updated sucessfully'}), { status: 200 });
    } catch (error) {
        console.error('Error updating club:', error);
        return new Response('Error updating club', { status: 500 });
    }
}

export const DELETE = async (req, { params}) => {
    const id = params.id;

    console.log(id)

    try {
         await connectToDB();
         const pool= getPool();

         const result = await pool.query('DELETE FROM club WHERE clubid = $1', [id]);

         if(result.rowCount === 0){
            return new Response(' There is no such club', { status: 404 });
         }
         return new Response(JSON.stringify({ message: 'Club deleted successfully'}), { status: 200 });

    } catch (error) {
        console.error('Error deleting club:', error);
        return new Response('Error deleting club', { status: 500 });
    }
}