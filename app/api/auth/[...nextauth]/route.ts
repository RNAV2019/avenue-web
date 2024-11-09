'use server';
import { neon } from '@neondatabase/serverless';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as { email: string; password: string };
				try {
					const sql = neon(process.env.DATABASE_URL ?? '');
					const users =
						await sql`SELECT id, email, password FROM users WHERE email = ${email} LIMIT 1`;
					const user = users[0];
					if (!user || !credentials) {
						return null;
					}
					console.log(user.password);
					const passwordsMatch = await compare(password, user.password);
					if (!passwordsMatch) {
						return null;
					}
					return {
						id: user.id,
						email: user.email,
						name: user.name
					};
				} catch (error) {
					console.log('Authentication error:', error);
					return null;
				}
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/'
	}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
