'use server';

import { neon, NeonQueryFunction } from '@neondatabase/serverless';

interface Avenue {
	id: string;
	name: string;
	description: string;
	profile_image: string;
}

async function getAvenue(avenueID: string, sql: NeonQueryFunction<false, false>) {
	try {
		const res = (await sql`SELECT * FROM avenues WHERE id = ${avenueID}`)[0] as Avenue;
		return res;
	} catch (error) {
		console.error('Error fetching avenue:', error);
		return null;
	}
}

export default async function avenue({ params }: { params: Promise<{ avenueID: string }> }) {
	const sql = neon(process.env.DATABASE_URL || '');
	const avenueID = (await params).avenueID[0];
	const avenue = await getAvenue(avenueID, sql);
	if (!avenue)
		return (
			<div>
				<h1>Error no avenue found</h1>
			</div>
		);
	return (
		<div>
			<h1>avenue</h1>
			<h1>{avenue?.id}</h1>
			<h1>{avenue?.description}</h1>
			<h1>{avenue?.name}</h1>
			<h1>{avenue?.profile_image}</h1>
		</div>
	);
}
