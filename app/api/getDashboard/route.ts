import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const session = await getServerSession();
	const user = session?.user;
	const sql = neon(process.env.DATABASE_URL || '');
	const statsRes =
		await sql`SELECT COUNT(*) FROM statistics WHERE avenue_id = (SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${user?.email}))`;
	if (!statsRes) {
		return NextResponse.json({ message: 'Error with getting aggegrate clicks' }, { status: 500 });
	}
	const linksRes =
		await sql`SELECT COUNT(*) FROM links WHERE avenue_id = (SELECT id FROM avenues WHERE user_id = (SELECT id FROM users WHERE email = ${user?.email}))`;
	if (!linksRes) {
		return NextResponse.json({ message: 'Error with getting links' }, { status: 500 });
	}
	return NextResponse.json(
		{ aggregateClicks: statsRes[0]['count'], linksRes: linksRes[0]['count'] },
		{ status: 200 }
	);
}
