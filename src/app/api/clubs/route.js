import { connectToDB, getPool } from "../../../utils/database";

// export const GET = async (req) => {
//   try {
//     await connectToDB();
//     const pool = getPool();
//     const { rows } = await pool.query("SELECT * FROM club");
//     return new Response(JSON.stringify(rows), { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving clubs:", error);
//     return new Response("Error retrieving clubs", { status: 500 });
//   }
// };
// import { connectToDB, getPool } from "../../../utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const pool = getPool();

    // Updated SQL query to join the tables
    const query = `
      SELECT 
        c.clubname AS club_name,
        c.clubid AS club_id,
        c.clubdescription AS club_description,
        ad.aname AS Advisor_name,
        m.stdname AS member_name
      FROM club c
      JOIN membership m ON c.clubid = m.cid
      JOIN clubadvisor ad ON c.clubid = ad.cid
      WHERE c.clubcoordinator = m.stdid;
    `;

    const { rows } = await pool.query(query);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return new Response("Error retrieving data", { status: 500 });
  }
};

// export const POST = async (req) => {
//   try {
//     await connectToDB();
//     const pool = getPool(); // Get the existing pool instance
//     const body = await req.json();
//     const {
//       clubid,
//       clubname,
//       clubdescription,
//       clubimage,
//       clubcoordinator,
//       clubadvisor,
//     } = body;

//     const result = await pool.query(
//       `INSERT INTO club (clubid, clubname, clubdescription, clubimage, clubcoordinator, clubadvisor)
//             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
//       [
//         clubid,
//         clubname,
//         clubdescription,
//         clubimage,
//         clubcoordinator,
//         clubadvisor,
//       ]
//     );

//     return new Response(JSON.stringify(result.rows[0]), { status: 201 });
//   } catch (error) {
//     console.error("Error creating club:", error);
//     return new Response("Error creating club", { status: 500 });
//   }
// };

export const POST = async (req) => {
  try {
    await connectToDB();
    const pool = getPool(); // Get the existing pool instance
    const body = await req.json();
    const {
      clubname,
      clubdescription,
      clubimage,
      clubcoordinator, // Name or identifier of the coordinator
      clubadvisor, // Name or identifier of the advisor
    } = body;

    // Fetching the IDs for coordinator and advisor
    const coordinatorResult = await pool.query(
      `SELECT stdid FROM membership WHERE stdname = $1`,
      [clubcoordinator]
    );

    const advisorResult = await pool.query(
      `SELECT aid FROM clubadvisor WHERE aname = $1`,
      [clubadvisor]
    );

    if (coordinatorResult.rowCount === 0 || advisorResult.rowCount === 0) {
      return new Response("Coordinator or Advisor not found", { status: 404 });
    }

    const coordinatorId = coordinatorResult.rows[0].stid;
    const advisorId = advisorResult.rows[0].aid;

    // Now insert the new club using the fetched IDs
    const result = await pool.query(
      `INSERT INTO club (clubname, clubdescription, clubimage, clubcoordinator, clubadvisor)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [clubname, clubdescription, clubimage, coordinatorId, advisorId]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating club:", error);
    return new Response("Error creating club", { status: 500 });
  }
};

// import { connectToDB, getPool } from "../../../utils/database";

// export const GET = async (req) => {
//   try {
//     await connectToDB();
//     const pool = getPool();
//     const { rows } = await pool.query(
//       "SELECT * FROM club JOIN events ON events.cid = club.clubid"
//     );
//     return new Response(JSON.stringify(rows), { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving clubs:", error);
//     return new Response("Error retrieving clubs", { status: 500 });
//   }
// };

// export const POST = async (req) => {
//   try {
//     await connectToDB();
//     const pool = getPool(); // Get the existing pool instance
//     const body = await req.json();
//     const {
//       clubid,
//       clubname,
//       clubdescription,
//       clubimage,
//       clubcoordinator,
//       clubadvisor,
//     } = body;

//     const result = await pool.query(
//       `INSERT INTO club (clubid, clubname, clubdescription, clubimage, clubcoordinator, clubadvisor)
//             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
//       [
//         clubid,
//         clubname,
//         clubdescription,
//         clubimage,
//         clubcoordinator,
//         clubadvisor,
//       ]
//     );

//     return new Response(JSON.stringify(result.rows[0]), { status: 201 });
//   } catch (error) {
//     console.error("Error creating club:", error);
//     return new Response("Error creating club", { status: 500 });
//   }
// };
