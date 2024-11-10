import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query(
      `SELECT club.*, clubAdvisor.aname
      FROM club
      JOIN clubAdvisor ON club.clubadvisor = clubAdvisor.AID
      WHERE club.clubid = $1`, 
      [id]
    );


    if (result.rows.length === 0) {
      pool.end();
      return new Response("There is no such club", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error getting the club" }), {
      status: 500,
    });
  }
};

// export const PUT = async (req, {params}) =>{
//     const id = params.id;
//     const { clubName, clubDescription, clubImage, clubCoordinator, clubAdvisor } = await req.json();

//     try {
//         await connectToDB();
//         const pool = getPool();
//         console.log(id)
//         const result = await pool.query('UPDATE club SET clubname = $1, clubdescription = $2, clubImage = $3, clubCoordinator = $4, clubAdvisor = $5 WHERE clubid = $6',
//             [clubName, clubDescription, clubImage, clubCoordinator, clubAdvisor, id]
//         )

//         if(result.row === 0 ){

//             return new Response('There is so such club', { status: 404 });
//         }

//         return new Response(JSON.stringify({ mesasge: 'Club updated sucessfully'}), { status: 200 });
//     } catch (error) {
//         console.error('Error updating club:', error);
//         return new Response('Error updating club', { status: 500 });
//     }
// }

export const PUT = async (req, { params }) => {
  const id = params.id;
  console.log("Received ID:", id);
  const { clubName, advisorName, coordinatorName, clubDescription } =
    await req.json();

  console.log("Received data:", {
    clubName,
    advisorName,
    coordinatorName,
    clubDescription,
  });

  try {
    await connectToDB();
    console.log("connected successfully");
    const pool = getPool();

    // Use placeholders for all dynamic data
    const result = await pool.query(
      `UPDATE club
       SET 
         clubname = $1,
         clubadvisor = (SELECT aid FROM clubadvisor WHERE aname = $2),
         clubcoordinator = (SELECT stdid FROM membership WHERE stdname = $3),
         clubdescription = $4
       WHERE clubid = $5`,
      [clubName, advisorName, coordinatorName, clubDescription, id]
    );

    console.log("Query result:", result); // Log the query result

    if (result.rowCount === 0) {
      return new Response("No such club found", { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Club updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating club:", error);
    return new Response(`Error updating club: ${error.message}`, {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;

  console.log(id);

  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query("DELETE FROM club WHERE clubid = $1", [id]);

    if (result.rowCount === 0) {
      return new Response(" There is no such club", { status: 404 });
    }
    return new Response(
      JSON.stringify({ message: "Club deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting club:", error);
    return new Response("Error deleting club", { status: 500 });
  }
};
