import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const sql = neon(process.env.DATABASE_URL || '');
	const session = await getServerSession();
	const email = session?.user?.email;
	const avenueID = req.nextUrl.searchParams.get('avenueID');
	let isOwner = email
		? (
				await sql`SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${email})`
			)[0]['id'] === avenueID
		: false;
	if (!avenueID) {
		return NextResponse.json({ message: 'No avenueID provided' }, { status: 400 });
	}
	const res = await sql`SELECT * FROM links WHERE avenue_id = ${avenueID}`;
	if (!res) {
		return NextResponse.json({ message: 'No links found' }, { status: 404 });
	}
	return NextResponse.json({ links: res, isOwner: isOwner }, { status: 200 });
}
