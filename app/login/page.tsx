'use client';
import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Outfit } from 'next/font/google';
import Input from '@/components/Input';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
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
		<div className="flex h-screen flex-col">
			<nav className="flex items-start px-14 pt-14">
				<a href="/" className="self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
			</nav>
			<main className="flex w-full grow flex-col items-center justify-center pb-14">
				<section className="grainy w-full max-w-lg space-y-4 rounded-lg border-2 border-black bg-cyan-500 p-10">
					<h1 className="text-2xl font-bold">Login</h1>
					<form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label htmlFor="email">Email</label>
							<Input
								type="email"
								id="email"
								name="email"
								className="w-full"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								id="password"
								name="password"
								className="w-full"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button className="h-12 w-full self-end" colour={'bg-red-500'} type="submit">
							Login
						</Button>
					</form>
				</section>
			</main>
		</div>
	);
}
