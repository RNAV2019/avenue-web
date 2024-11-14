import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const sql = neon(process.env.DATABASE_URL || '');
	const avenueID = req.nextUrl.searchParams.get('avenueID');
	if (!avenueID) return NextResponse.json({ error: 'No avenueID provided' });
	try {
		const res = (await sql`SELECT * FROM avenues WHERE id = ${avenueID}`)[0];
		return NextResponse.json(res);
	} catch (error) {
		console.error('Error fetching avenue:', error);
		return NextResponse.json({
			error: 'Error fetching avenue'
		});
	}
}
