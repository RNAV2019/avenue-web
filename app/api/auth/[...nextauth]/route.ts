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
						await sql`SELECT id, name, profile_image, password FROM users WHERE email = ${email} LIMIT 1`;
					const user = users[0];
					if (!user || !credentials) {
						return null;
					}
					const passwordsMatch = await compare(password, user.password);
					if (!passwordsMatch) {
						return null;
					}
					return {
						id: user.id,
						email: email,
						name: user.name,
						image: user.profile_image
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
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update') {
				return {
					name: token.name,
					email: token.email,
					sub: token.sub,
					picture: session.user.image
				};
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.email = token.email;
				session.user.image = token.picture;
				session.user.name = token.name;
			}
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/'
	}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
