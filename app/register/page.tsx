'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { Outfit } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData();
		console.log(name, email, password);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);

		const response = await fetch('/api/register', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			console.log('Register successful!');
			router.push('/');
		} else {
			console.log('Register failed.');
		}
	};

	return (
		<div className="flex h-screen flex-col">
			<nav className="flex items-start px-14 pt-14">
				<a href="/" className="self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
			</nav>
			<main className="flex w-full grow flex-col items-center justify-center pb-14">
				<section className="grainy w-full max-w-lg space-y-4 border-2 border-black bg-rose-500 p-10 text-white shadow-calm">
					<h1 className="mb-7 text-2xl font-bold">Register</h1>
					<form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label htmlFor="name">Name</label>
							<Input
								type="text"
								id="name"
								name="name"
								placeholder="Name"
								autoComplete="off"
								className="w-full text-black placeholder:text-black"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="email">Email</label>
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								autoComplete="off"
								className="w-full text-black placeholder:text-black"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								autoComplete="off"
								className="w-full"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button className="h-12 w-full" colour={'bg-indigo-500'} type="submit">
							Register
						</Button>
					</form>
				</section>
			</main>
		</div>
	);
}
