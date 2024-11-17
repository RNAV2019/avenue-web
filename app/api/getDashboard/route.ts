import { AvenueUser } from '@/lib/helper';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const session = await getServerSession();
	const email = session?.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	// Get the user from db
	const user: AvenueUser = (
		await sql`SELECT id, name, profile_image FROM users WHERE email = ${email}`
	)[0] as AvenueUser;
	const defaultDescription: string = 'Enter a description';
	// Check if user has an avenue
	const avenue = (await sql`SELECT id FROM avenues WHERE user_id = ${user.id}`)[0];
	let avenueID: string = '';
	if (!avenue) {
		avenueID = (
			await sql`INSERT INTO avenues (user_id, description, profile_image, name) VALUES (${user.id}, ${defaultDescription}, ${user.profile_image}, ${user.name}) RETURNING id`
		)[0]['id'];
	} else {
		avenueID = avenue['id'];
	}

	const aggregateRes = await sql`SELECT COUNT(*) FROM statistics WHERE avenue_id = ${avenueID}`;
	if (!aggregateRes) {
		return NextResponse.json({ message: 'Error with getting aggegrate clicks' }, { status: 500 });
	}
	const chartRes =
		await sql`SELECT DATE(click_timestamp) AS click_date, COUNT(*) AS total_clicks FROM statistics WHERE avenue_id = ${avenueID} GROUP BY click_date ORDER BY click_date`;
	if (!chartRes) {
		return NextResponse.json({ message: 'Error with getting chart data' }, { status: 500 });
	}
	const linksRes = await sql`SELECT COUNT(*) FROM links WHERE avenue_id = ${avenueID}`;
	if (!linksRes) {
		return NextResponse.json({ message: 'Error with getting links' }, { status: 500 });
	}
	return NextResponse.json(
		{
			avenueID: avenueID,
			aggregateClicks: aggregateRes[0]['count'],
			linksRes: linksRes[0]['count'],
			chartData: chartRes
		},
		{ status: 200 }
	);
}
