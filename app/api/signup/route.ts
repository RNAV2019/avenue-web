'use server';
import { neon } from '@neondatabase/serverless';
import { hash, genSalt } from 'bcryptjs';

export async function POST(req: Request) {
	const form = await req.formData();
	const email = form.get('email');
	if (!email) {
		return new Response(JSON.stringify({ success: false }), {
			headers: { 'Content-Type': 'application/json' },
			status: 400,
			statusText: 'Email is required'
		});
	}
	const name = form.get('name');
	if (!name) {
		return new Response(JSON.stringify({ success: false }), {
			headers: { 'Content-Type': 'application/json' },
			status: 400,
			statusText: 'Name is required'
		});
	}
	const password = form.get('password');
	if (!password) {
		return new Response(JSON.stringify({ success: false }), {
			headers: { 'Content-Type': 'application/json' },
			status: 400,
			statusText: 'Password is required'
		});
	}
	const salt = await genSalt();
	const hashedPassword = await hash(password?.toString(), salt);
	const sql = neon(process.env.DATABASE_URL ?? '');
	const res =
		await sql`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword})`;
	if (res) {
		return new Response(JSON.stringify({ success: true }), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	}
	return new Response(JSON.stringify({ success: false }), {
		headers: { 'Content-Type': 'application/json' },
		status: 500,
		statusText: 'Internal Server Error'
	});
}
