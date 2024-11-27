'use client';
import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Outfit } from 'next/font/google';
import Input from '@/components/Input';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');

		// Basic validation
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address');
			return;
		}

		// Password length validation
		if (password.length < 6) {
			setError('Password must be at least 6 characters long');
			return;
		}

		try {
			setIsLoading(true);
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false
			});

			if (res?.error) {
				setError('Invalid email or password');
				return;
			}

			router.replace('dashboard');
		} catch (error) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen flex-col">
			<nav className="flex flex-col items-center justify-between gap-3 p-4 py-6 md:flex-row md:p-14">
				<a href="/" className="self-center md:self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
			</nav>
			<main className="flex w-full grow flex-col items-center justify-center pb-14">
				<section className="grainy w-full max-w-xs space-y-4 border-2 border-black bg-rose-500 p-8 text-white shadow-calm sm:max-w-sm md:max-w-md md:p-9 lg:max-w-lg lg:p-10">
					<h1 className="mb-7 text-xl font-bold sm:text-2xl md:text-3xl">Login</h1>
					{error && (
						<div className="rounded-md border-2 border-black bg-red-100 p-3 text-sm font-medium text-red-600 shadow-calm">
							{error}
						</div>
					)}
					<form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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
								disabled={isLoading}
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
								className="w-full text-black placeholder:text-black"
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<Button
							className="h-12 w-full self-end"
							colour={'bg-indigo-500'}
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</section>
			</main>
		</div>
	);
}
