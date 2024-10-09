import { connectToDB, getPool } from "../../../utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const pool = getPool();
    const { rows } = await pool.query("SELECT * FROM programme");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error retrieving programme:", error);
    return new Response("Error retrieving programme", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const pool = getPool(); // Get the existing pool instance
    const body = await req.json();
    const { pid, pname } = body;

    const result = await pool.query(
      `INSERT INTO programme (pid,pname) VALUES ($1, $2) RETURNING *`,
      [pid, pname]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating programme:", error);
    return new Response("Error creating programme", { status: 500 });
  }
};
