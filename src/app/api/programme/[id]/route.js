import { connectToDB, getPool } from "../../../../utils/database";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query("SELECT * FROM programme WHERE pid = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      pool.end();
      return new Response("There is no such programme", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error getting the programme" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const id = params.id;
  const { pname } = await req.json();

  try {
    await connectToDB();
    const pool = getPool();
    console.log(id);
    const result = await pool.query(
      "UPDATE programme SET pname = $1 where pid =$2",
      [pname, id]
    );

    if (result.row === 0) {
      return new Response("There is so such programme", { status: 404 });
    }

    return new Response(
      JSON.stringify({ mesasge: "Programme updated sucessfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating programme:", error);
    return new Response("Error updating programme", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;

  console.log(id);

  try {
    await connectToDB();
    const pool = getPool();

    const result = await pool.query("DELETE FROM programme WHERE pid = $1", [
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
