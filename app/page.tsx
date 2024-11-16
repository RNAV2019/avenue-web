'use client';
import Button from '@/components/Button';
import CountdownTicker from '@/components/CountdownTicker';
import { DoodleArrowIcon } from '@/lib/icons/DoodleArrowIcon';
import { DoodleArrowRightIcon } from '@/lib/icons/DoodleArrowRightIcon';
import { DoodleArrowTopRightIcon } from '@/lib/icons/DoodleArrowTopRightIcon';
import { EditIcon } from '@/lib/icons/EditIcon';
import { GraphIcon } from '@/lib/icons/GraphIcon';
import { MoneyIcon } from '@/lib/icons/MoneyIcon';
import { OpenSourceIcon } from '@/lib/icons/OpenSource';
import { PaperClipIcon } from '@/lib/icons/PaperClipIcon';
import TickIcon from '@/lib/icons/TickIcon';
import { Outfit } from 'next/font/google';
import { useEffect, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function Home() {
	const [randomNumber, setRandomNumber] = useState<number[]>([]);
	useEffect(() => {
		const avenueClicks = Math.floor(Math.random() * 400);
		const numberOfLinks = Math.floor(Math.random() * 15);
		setRandomNumber([avenueClicks, numberOfLinks]);
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
			<main className="mb-10 space-y-14 px-14">
				<section className="grainy flex h-[45vh] w-full flex-col items-center justify-center gap-6 border-2 border-black bg-rose-500 p-10 shadow-brutal">
					<h1 className="text-center text-6xl font-bold text-rose-100">
						Organize your links in a chaotic,
						<br />
						beautiful way.
					</h1>

					<h3 className="text-center text-xl font-semibold tracking-wide text-rose-200">
						Build a hub to connect all your links in one place.
					</h3>

					<div className="relative flex w-64 flex-col items-center justify-end">
						<DoodleArrowIcon className="rotate absolute -bottom-12 -right-10 h-16 w-16 fill-rose-200" />
						<a href="/register">
							<Button className={'h-12 w-44'} colour={'bg-indigo-500'}>
								Try it now
							</Button>
						</a>
					</div>
				</section>
				<section className="grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-8">
					<div className="grainy relative z-0 col-span-2 h-[45vh] w-full select-none border-2 border-black bg-indigo-500 p-12 shadow-brutal">
						<div id="nav-dots" className="absolute right-6 top-6 flex flex-row gap-2">
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-red-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-yellow-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-green-500" />
						</div>

						<div className="grainy group relative z-10 my-3 flex h-full w-full flex-col space-y-4 border-2 border-black bg-rose-400 p-8 shadow-brutal">
							<div className="flex flex-row items-center justify-between">
								<h4 className="text-lg font-medium">Dashboard</h4>
								<div className="flex flex-row gap-2">
									<Button className={'h-10 w-32 text-xs'} colour={'bg-rose-500'} showcase>
										Edit Description
									</Button>
									<Button className={'h-10 w-32 text-xs'} colour={'bg-indigo-500'} showcase>
										Visit Avenue
									</Button>
									<Button className={'h-10 w-10 text-xs'} colour={'bg-fuchsia-500'} showcase>
										<PaperClipIcon className="h-5 w-5" />
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
										<DoodleArrowTopRightIcon className="absolute -top-7 left-5 z-30 hidden h-8 w-8 rotate-180 fill-white group-hover:block" />
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
					<div className="grainy flex h-[45vh] w-full flex-col gap-14 border-2 border-black bg-rose-400 p-12 shadow-brutal">
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-4xl font-bold text-rose-900">
								Statistics <GraphIcon className="h-9 w-9" />
							</h4>
							<p className="text-rose-700">
								Your avenue clicks and number of links shown directly on your dashboard. Our graph
								show the trends in the number of clicks on your avenue in the past month.
							</p>
						</div>
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-4xl font-bold text-rose-900">
								Quick Edit
								<EditIcon className="h-9 w-9" />
							</h4>
							<p className="text-rose-700">
								Seamlessly edit your avenue description. No need to leave the page, just click the
								edit button and make the changes. Let your creativity shine!
							</p>
						</div>
					</div>
					<div className="grainy flex h-[45vh] w-full flex-col gap-14 border-2 border-black bg-rose-400 p-12 shadow-brutal">
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-4xl font-bold text-rose-900">
								Totally FREE!
								<MoneyIcon className="h-9 w-9" />
							</h4>
							<p className="text-rose-700">
								No subscriptions. Just vibes. Our service is completely free—no hidden fees, no
								premium tiers, and no tricks up our sleeves.
							</p>
						</div>
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-4xl font-bold text-rose-900">
								Open Source
								<OpenSourceIcon className="h-9 w-9" />
							</h4>
							<p className="text-rose-700">
								Check the code on GitHub! It's open-source, so you can explore, contribute, or even
								make it your own.
							</p>
						</div>
						<a href="https://github.com/RNAV2019/avenue-web" target="_blank">
							<Button className={'h-14 w-full'} colour={'bg-rose-500'}>
								View on GitHub
							</Button>
						</a>
					</div>
					<div className="grainy relative col-span-2 flex h-[45vh] w-full flex-col gap-5 border-2 border-black bg-indigo-500 p-10 shadow-brutal">
						<div id="nav-dots" className="absolute right-6 top-6 flex flex-row gap-2">
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-red-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-yellow-500" />
							<div className="h-5 w-5 shrink-0 rounded-full border-2 border-black bg-green-500" />
						</div>
						<h4 className="text-center text-5xl font-semibold text-indigo-800">Pricing</h4>
						<div className="grainy flex h-full flex-col items-center gap-5 border-2 border-black bg-indigo-400 p-6 shadow-brutal">
							<h5 className="text-2xl font-bold text-indigo-900">Free tier</h5>
							<div className="mb-4 flex flex-col items-center">
								{/* Add number ticker animation */}
								<CountdownTicker />
								<span className="text-lg text-indigo-700">/month</span>
							</div>
							<ul className="space-y-4 text-center text-indigo-800">
								<li className="flex items-center gap-2">
									<TickIcon className="h-5 w-5 text-indigo-900" />
									Unlimited Links
								</li>
								<li className="flex items-center gap-2">
									<TickIcon className="h-5 w-5 text-indigo-900" />
									Dashboard with analytics
								</li>
								<li className="flex items-center gap-2">
									<TickIcon className="h-5 w-5 text-indigo-900" />
									Customise Description
								</li>
							</ul>
						</div>
					</div>
					<div className="grainy col-span-3 h-[45vh] w-full border-2 border-black bg-rose-400 p-10 shadow-brutal">
						<h4 className="mb-8 text-center text-5xl font-semibold text-rose-800">How it works</h4>
						<div className="flex h-3/4 items-center justify-between gap-3">
							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-4 space-y-6 border-2 border-black bg-rose-500 p-6 shadow-brutal">
								<div className="grainy flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-3xl font-bold text-rose-100">
									1
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-2xl font-bold text-rose-900">Register</h5>
									<p className="text-center text-sm font-medium text-rose-900">
										Create your free account in seconds
									</p>
								</div>
							</div>

							<DoodleArrowRightIcon className="h-8 w-8 shrink-0 fill-rose-200" />

							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-4 space-y-6 border-2 border-black bg-rose-500 p-6 shadow-brutal">
								<div className="grainy flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-3xl font-bold text-rose-100">
									2
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-2xl font-bold text-rose-900">Add Links</h5>
									<p className="text-center text-sm font-medium text-rose-900">
										Add all your important links to your avenue
									</p>
								</div>
							</div>

							<DoodleArrowRightIcon className="h-8 w-8 shrink-0 fill-rose-200" />

							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-4 space-y-6 border-2 border-black bg-rose-500 p-6 shadow-brutal">
								<div className="grainy flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-3xl font-bold text-rose-100">
									3
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-2xl font-bold text-rose-900">Share</h5>
									<p className="text-center text-sm font-medium text-rose-900">
										Share your avenue link with the world
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<footer className="grainy mt-8 flex h-24 w-full items-center justify-between border-2 border-black bg-indigo-500 px-8 shadow-brutal">
					<div className="flex items-center justify-center gap-4">
						<span className="text-lg font-bold text-indigo-100">Avenue</span>
					</div>

					<div className="flex gap-6">
						<a
							href="https://www.ryannavsaria.co.uk/"
							target="_blank"
							className="text-sm text-indigo-200 hover:text-indigo-100"
						>
							Visit my website
						</a>
						<p className="text-sm text-indigo-200">Made by Ryan Navsaria.</p>
					</div>
				</footer>
			</main>
		</>
	);
}
