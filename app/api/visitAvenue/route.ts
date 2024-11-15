import { neon } from '@neondatabase/serverless';
import { getServerSession } from 'next-auth';

type user = {
	id: string;
	name: string;
	profile_image: string | null;
};

export async function GET(req: Request) {
	const session = await getServerSession();
	const email = session?.user?.email;
	const sql = neon(process.env.DATABASE_URL || '');
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	// Check whether user has an avenue
	const user: user = (
		await sql`SELECT id, name, profile_image FROM users WHERE email = ${email}`
	)[0] as user;
	const defaultDescription: string = 'Enter a description';
	console.log(`user: ${user}`);
	// Check if user has an avenue
	const avenue = (await sql`SELECT id FROM avenues WHERE user_id = ${user.id}`)[0];
	if (!avenue) {
		const newAvenueID: string = (
			await sql`INSERT INTO avenues (user_id, description, profile_image, name) VALUES (${user.id}, ${defaultDescription}, ${user.profile_image}, ${user.name}) RETURNING id`
		)[0]['id'];
		return new Response(JSON.stringify({ avenueID: newAvenueID }), { status: 200 });
	} else {
		const avenueID = avenue['id'];
		console.log(`avenueID: ${avenueID}`);
		return new Response(JSON.stringify({ avenueID: avenueID }), { status: 200 });
	}
}
