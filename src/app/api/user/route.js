import { connectToDB } from "../../../utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        console.log('Database is connected?!!!');

        return new Response(JSON.stringify({ message: 'Database is connected' }), { status: 200 });
    } catch (error) {
        console.error('Error connecting to Postgres:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
