import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getServerSession();
	const email = session?.user?.email;
	if (!session) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const sql = neon(process.env.DATABASE_URL || '');
	const { description } = await req.json();
	if (!description) {
		return NextResponse.json({ error: 'Missing description value' }, { status: 400 });
	}
	const res =
		await sql`UPDATE avenues SET description = ${description} WHERE user_id = (SELECT id FROM users WHERE email = ${email})`;
	if (res) {
		return NextResponse.json(
			{ message: 'Avenue description updated successfully' },
			{ status: 200 }
		);
	} else {
		return NextResponse.json({ error: 'Failed to update avenue description' }, { status: 500 });
	}
}
