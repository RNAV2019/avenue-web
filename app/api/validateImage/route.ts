import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { imageURL } = await req.json();
		const response = await fetch(imageURL, { method: 'HEAD' });

		if (response.ok) {
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.startsWith('image/')) {
				return NextResponse.json({ valid: true });
			}
		}
		return NextResponse.json({ valid: false });
	} catch (error) {
		return NextResponse.json({ valid: false });
	}
}
