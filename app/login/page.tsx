'use client';
import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GET() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false
			});
			if (res?.error) {
				console.log(res.error);
			}
			router.replace('dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className="space-y-10 p-10">
			<h1>Login</h1>
			<form className="flex w-1/3 flex-col space-y-4" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button className="h-12 w-44" colour={'bg-red-500'} type="submit">
					Login
				</Button>
			</form>
		</main>
	);
}
