import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const session = await getServerSession();
	if (!session) {
		return NextResponse.json({ message: 'Unauthorized', status: 401 });
	}
	const email = session?.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	const res =
		await sql`SELECT description FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})`;
	const description = res[0]['description'] ?? '';
	if (res) {
		return NextResponse.json({ description: description, status: 200 });
	} else {
		return NextResponse.json({ message: 'Error getting the description', status: 500 });
	}
}
