import { connectToDB, getPool } from "../../../utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const pool = getPool();
    const { rows } = await pool.query("SELECT * FROM clubadvisor");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error retrieving clubAdvisor:", error);
    return new Response("Error retrieving clubAdvisor", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const pool = getPool(); // Get the existing pool instance
    const body = await req.json();
    const { aid, aname, cid } = body;

    const result = await pool.query(
      `INSERT INTO clubadvisor (aid, aname, cid) VALUES ($1, $2,$3) RETURNING *`,
      [aid, aname, cid]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating clubAdvisor:", error);
    return new Response("Error creating clubAdvisor", { status: 500 });
  }
};
