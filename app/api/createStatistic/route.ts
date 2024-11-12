import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

type Statistic = {
	avenueID: string;
};

export async function POST(req: NextRequest) {
	const statistic = (await req.json()) as Statistic;
	const sql = neon(process.env.DATABASE_URL || '');
	const res =
		await sql`INSERT INTO statistics (click_timestamp, avenue_id) VALUES (to_timestamp(${Date.now()} / 1000.0), ${statistic.avenueID}) RETURNING id`;
	if (res) {
		return new NextResponse(
			JSON.stringify({ message: 'Statistic created', statisticID: res[0]['id'] }),
			{ status: 200 }
		);
	}
	return new NextResponse(JSON.stringify({ message: 'Error with creating the statistic' }), {
		status: 500
	});
}
