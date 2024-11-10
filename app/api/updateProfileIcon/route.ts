import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const session = await getServerSession();
	if (!session) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const { imageURL, email } = await req.json();
	if (!imageURL) {
		return NextResponse.json({ message: 'No image URL provided' }, { status: 400 });
	}
	const response = await fetch(imageURL, { method: 'HEAD' });
	if (!response.ok) {
		return NextResponse.json({ status: 'error', message: 'Image URL is invalid' });
	}
	const sql = neon(process.env.DATABASE_URL ?? '');
	const result = await sql`UPDATE users SET profile_image = ${imageURL} WHERE email = ${email}`;
	if (result) {
		return NextResponse.json({ status: 'success', message: 'Image URL updated successfully' });
	} else {
		return NextResponse.json({ status: 'error', message: 'Failed to update image URL' });
	}
}
