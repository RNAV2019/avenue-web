'use client';
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';

export default function Home() {
	const session = useSession();

	return (
		<main className="space-y-10 p-10">
			<nav className="flex flex-row items-center justify-between gap-3">
				<div className="flex flex-row items-center gap-1 text-xl font-bold">
					<h1>Avenue</h1>
				</div>
				<div className="flex flex-row items-center justify-center gap-8">
					<a href="/login">
						<Button className="h-12 w-44" colour="bg-red-500">
							Login
						</Button>
					</a>
					<a href="/signup">
						<Button className="h-12 w-44" colour="bg-red-500">
							Sign up
						</Button>
					</a>
				</div>
			</nav>
		</main>
	);
}
