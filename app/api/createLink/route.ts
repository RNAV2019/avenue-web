import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getServerSession();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	const { url, name } = await req.json();
	if (!url) {
		return new Response('Missing url field', { status: 400 });
	}
	if (!name) {
		return new Response('Missing name field', { status: 400 });
	}
	const email = session.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	// SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})
	const res =
		await sql`INSERT INTO links (url, name, avenue_id) VALUES (${url}, ${name}, (SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})))`;
	if (!res) {
		return NextResponse.json({ message: 'Error creating link' }, { status: 500 });
	}
	return NextResponse.json({ message: 'Link created' }, { status: 200 });
}
