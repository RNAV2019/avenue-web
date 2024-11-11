'use client';
import Button from '@/components/Button';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function Home() {
	return (
		<>
			<nav className="flex flex-row items-center justify-between gap-3 p-14">
				<a href="/" className="self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
				<div className="flex flex-row items-center justify-center gap-8">
					<a href="/login">
						<Button className="h-12 w-44" colour="bg-red-500">
							Login
						</Button>
					</a>
					<a href="/register">
						<Button className="h-12 w-44" colour="bg-red-500">
							Register
						</Button>
					</a>
				</div>
			</nav>
			<main className="p-14"></main>
		</>
	);
}
