'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);

		const response = await fetch('/api/signup', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			console.log('Signup successful!');
			router.push('/');
		} else {
			console.log('Signup failed.');
		}
	};

	return (
		<main className="space-y-10 p-10">
			<h1>Signup</h1>
			<form className="flex w-1/3 flex-col space-y-4" onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
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
					Signup
				</Button>
			</form>
		</main>
	);
}
