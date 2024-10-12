import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import { connectToDB, getPool} from '../../../../utils/database';

export const authOptions = {
    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try{
                    await connectToDB();
                    const pool = getPool();
                    const user = await pool.query(` SELECT * FROM login WHERE lusername = $1`, [credentials.username]);
                    if(!user || user.rowCount === 0){
                        throw new Error('No user found');
                    }
                    const userRow = user.rows[0];

                    console.log(userRow)

                    const validPassword = await bcrypt.compare(credentials.password, userRow.lpassword);
                    if(!validPassword){
                        throw new Error('Password is incorrect');
                    }
                    return {
                        id: userRow.loginid,
                        name: userRow.lusername,
                    };

                } catch(error){
                    console.log('Error authorizing  user: ', error);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session ({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            return session;
        }
    },

    pages: {
        signIn : '/authentication/login',
        error: '/authentication/login',

    },
    secret: process.env.NextAuth_Secret,
}

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);