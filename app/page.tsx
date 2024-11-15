'use client';
import Button from '@/components/Button';
import { DoodleArrowIcon } from '@/lib/icons/DoodleArrowIcon';
import { DoodleArrowRightIcon } from '@/lib/icons/DoodleArrowRightIcon';
import { Outfit } from 'next/font/google';
import { useEffect, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function Home() {
	const [randomNumber, setRandomNumber] = useState<number[]>([]);
	useEffect(() => {
		const numbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 400));
		setRandomNumber(numbers);
	}, []);

	return (
		<>
			<nav className="flex flex-row items-center justify-between gap-3 p-14">
				<a href="/" className="self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
				<div className="flex flex-row items-center justify-center gap-8">
					<a href="/login">
						<Button
							className="h-12 w-44"
							hover="hover:bg-rose-600 transition-all"
							colour="bg-rose-500"
						>
							Login
						</Button>
					</a>
					<a href="/register">
						<Button
							className="h-12 w-44"
							hover="hover:bg-rose-600 transition-all"
							colour="bg-rose-500"
						>
							Register
						</Button>
					</a>
				</div>
			</nav>
			<main className="mb-20 space-y-14 px-14">
				<section className="grainy flex h-[40vh] w-full flex-col items-center justify-center gap-6 border-2 border-black bg-rose-500 p-10 shadow-brutal">
					<h1 className="text-center font-rubik text-5xl font-bold text-rose-100">
						Organize your links in a chaotic,
						<br />
						beautiful way.
					</h1>

					<h3 className="text-center font-rubik text-xl font-semibold tracking-wide text-rose-200">
						Build a hub to connect all your links in one place.
					</h3>

					<div className="relative flex w-64 flex-col items-center justify-end">
						<DoodleArrowIcon className="rotate absolute -bottom-12 -right-10 h-16 w-16 fill-rose-200" />
						<Button className={'h-12 w-44'} colour={'bg-indigo-500'}>
							Try it now
						</Button>
					</div>
				</section>
				<section className="grid select-none grid-cols-3 gap-4">
					<div className="grainy relative z-0 col-span-2 h-[50vh] w-full border-2 border-black bg-indigo-500 p-12 shadow-brutal">
						<div id="nav-dots" className="absolute right-6 top-6 flex flex-row gap-2">
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-red-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-yellow-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-green-500" />
						</div>

						<div className="grainy group relative z-10 my-3 flex h-full w-full flex-col space-y-4 border-2 border-black bg-rose-400 p-8 shadow-brutal">
							<div className="flex flex-row items-center justify-between">
								<h4 className="text-lg font-medium">Dashboard</h4>
								<div className="flex flex-row gap-4">
									<Button className={'h-10 w-32 text-xs'} colour={'bg-teal-500'} showcase>
										Edit Description
									</Button>
									<Button className={'h-10 w-32 text-xs'} colour={'bg-indigo-500'} showcase>
										Visit Avenue
									</Button>
								</div>
							</div>
							<div className="flex w-full flex-row justify-between gap-4">
								<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-orange-500 p-5 shadow-brutal sm:justify-between">
									<span className="grainy rounded-full border-2 border-black bg-amber-500 p-3 text-black sm:order-last"></span>
									<div className="relative">
										<p className="absolute -top-12 left-14 z-30 hidden text-nowrap text-xl font-semibold text-white group-hover:block">
											Live statistics
										</p>
										<DoodleArrowRightIcon className="absolute -top-7 left-5 z-30 hidden h-8 w-8 rotate-180 fill-white group-hover:block" />
										<p className="font-bold text-gray-900">
											{randomNumber[0] ? randomNumber[0] : 0}
										</p>

										<p className="text-xs font-medium">Total Avenue Clicks</p>
									</div>
								</div>
								<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-orange-500 p-5 shadow-brutal sm:justify-between">
									<span className="grainy rounded-full border-2 border-black bg-amber-500 p-3 text-black sm:order-last"></span>
									<div>
										<p className="font-bold text-gray-900">
											{randomNumber[1] ? randomNumber[1] : 0}
										</p>

										<p className="text-xs font-medium">Number of links</p>
									</div>
								</div>
							</div>
							<div className="absolute -top-4 left-0 z-20 hidden h-full w-full bg-black/50 transition-colors group-hover:block" />
						</div>
					</div>
					<div className="grainy h-[50vh] w-full border-2 border-black bg-rose-500 p-12 shadow-brutal">
						Box 2
					</div>
				</section>
				<section className="grid grid-cols-3 grid-rows-2 gap-4">
					<div className="grainy h-[40vh] w-full border-2 border-black bg-rose-500 p-10 shadow-brutal">
						Box 3
					</div>
					<div className="grainy col-span-2 h-[40vh] w-full border-2 border-black bg-indigo-500 p-10 shadow-brutal">
						Box 4
					</div>
					<div className="grainy col-span-2 h-[40vh] w-full border-2 border-black bg-indigo-500 p-10 shadow-brutal">
						Box 5
					</div>
					<div className="grainy h-[40vh] w-full border-2 border-black bg-rose-500 p-10 shadow-brutal">
						Box 6
					</div>
				</section>
			</main>
		</>
	);
}
