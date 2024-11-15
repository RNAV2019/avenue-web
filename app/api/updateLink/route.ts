import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getServerSession();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	const { url, name, id } = await req.json();
	if (!url) {
		return new Response('Missing url field', { status: 400 });
	}
	if (!name) {
		return new Response('Missing name field', { status: 400 });
	}
	if (!id) {
		return new Response('Missing id field', { status: 400 });
	}
	const email = session.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	// SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})
	const res =
		await sql`UPDATE links SET name = ${name}, url = ${url} WHERE id = ${id} AND avenue_id = (SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email}))`;
	if (!res) {
		return NextResponse.json({ message: 'Error updating link' }, { status: 500 });
	}
	return NextResponse.json({ message: 'Link updated' }, { status: 200 });
}
