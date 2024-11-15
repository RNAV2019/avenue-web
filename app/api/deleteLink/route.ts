import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
	const session = await getServerSession();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	const email = session.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	const link_id = req.nextUrl.searchParams.get('id');
	// SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})
	const res =
		await sql`DELETE FROM links WHERE id = ${link_id} AND avenue_id = (SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email}))`;
	if (!res) {
		return NextResponse.json({ message: 'Error deleting link' }, { status: 500 });
	}
	return NextResponse.json({ message: 'Link deleted' }, { status: 200 });
}
