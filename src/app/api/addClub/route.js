import { connectToDB, getPool } from "../../../utils/database";
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