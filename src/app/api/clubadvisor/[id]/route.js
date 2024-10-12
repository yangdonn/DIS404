import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query(
      "SELECT * FROM clubAdvisor WHERE cid = $1",
      [id]
    );

    if (result.rows.length === 0) {
      pool.end();
      return new Response("There is no such club", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.log("Errir getting adviosrs", error);
    return new Response(JSON.stringify({ message: "Error getting the club" }), {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  const id = params.id;
  const { aname, cid } = await req.json();

  try {
    await connectToDB();
    const pool = getPool();
    console.log(id);
    const result = await pool.query(
      "UPDATE clubAdvisor SET aname = $1, cid = $2 WHERE aid = $3",
      [aname, cid, id]
    );

    if (result.row === 0) {
      return new Response("There is so such club", { status: 404 });
    }

    return new Response(
      JSON.stringify({ mesasge: "Club updated sucessfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating club:", error);
    return new Response("Error updating club", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;

  console.log(id);

  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query("DELETE FROM clubAdvisor WHERE aid = $1", [
      id,
    ]);

    if (result.row == -0) {
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
