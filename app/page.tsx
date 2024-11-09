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
					<span>- logged in as ryannav2019@gmail.com</span>
				</div>
				<div className="flex flex-row items-center justify-center gap-8">
					{session.data?.user?.name}
					<img src={''} alt="Profile" className="h-12 w-12 rounded-full border-2 border-black" />
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
			<div className="shadow-brutal grainy flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-6">
				<div className="flex flex-row items-center justify-between">
					<h1 className="ml-2 text-xl font-medium">Dashboard</h1>
					<div className="flex gap-3">
						<Button className="h-12 w-44" colour="bg-teal-500">
							Edit Description
						</Button>
						<Button className="h-12 w-44" colour="bg-indigo-500">
							Visit my avenue
						</Button>
					</div>
				</div>
				<section className="flex flex-row justify-between gap-3">
					<article className="shadow-brutal grainy flex flex-1 items-center gap-4 border-2 border-black bg-orange-500 p-6 sm:justify-between">
						<span className="grainy rounded-full border-2 border-black bg-amber-500 p-3 text-black sm:order-last"></span>

						<div>
							<p className="text-3xl font-bold text-gray-900">9</p>

							<p className="text-sm font-medium">Total Avenue Clicks</p>
						</div>
					</article>
					<article className="shadow-brutal grainy flex flex-1 items-center gap-4 border-2 border-black bg-orange-500 p-6 sm:justify-between">
						<span className="grainy rounded-full border-2 border-black bg-amber-500 p-3 text-black sm:order-last"></span>

						<div>
							<p className="text-3xl font-bold text-gray-900">3</p>

							<p className="text-sm font-medium">Number of links</p>
						</div>
					</article>
				</section>
				<section>
					<article className="shadow-brutal grainy border-2 border-black bg-sky-500 p-6">
						<canvas id="lineGraph" width="400" height="200" />
					</article>
				</section>
			</div>
		</main>
	);
}
