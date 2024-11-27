'use client';
import Button from '@/components/Button';
import ClicksChart from '@/components/ClicksChart';
import CountdownTicker from '@/components/CountdownTicker';
import { ClickData, Colour } from '@/lib/helper';
import { AddIcon } from '@/lib/icons/AddIcon';
import { DeleteIcon } from '@/lib/icons/DeleteIcon';
import { DoodleArrowIcon } from '@/lib/icons/DoodleArrowIcon';
import { DoodleArrowRightIcon } from '@/lib/icons/DoodleArrowRightIcon';
import { DoodleArrowTopRightIcon } from '@/lib/icons/DoodleArrowTopRightIcon';
import { EditIcon } from '@/lib/icons/EditIcon';
import { GraphIcon } from '@/lib/icons/GraphIcon';
import { MoneyIcon } from '@/lib/icons/MoneyIcon';
import { OpenSourceIcon } from '@/lib/icons/OpenSource';
import { PaperClipIcon } from '@/lib/icons/PaperClipIcon';
import { PointerIcon } from '@/lib/icons/PointerIcon';
import { ShareIcon } from '@/lib/icons/ShareIcon';
import { TickIcon } from '@/lib/icons/TickIcon';
import { Outfit } from 'next/font/google';
import { useEffect, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function Home() {
	const [randomNumber, setRandomNumber] = useState<number[]>([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	);

	useEffect(() => {
		const avenueClicks = Math.floor(Math.random() * 400) + 1;
		const numberOfLinks = Math.floor(Math.random() * 15) + 1;
		const randomClicks = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
		setRandomNumber([avenueClicks, numberOfLinks, ...randomClicks]);
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const chartData: ClickData[] = Array.from({ length: 8 }, (_, i) => ({
		click_date: new Date(new Date().setDate(new Date().getDate() - (7 - i))),
		total_clicks: randomNumber[i + 2]
	}));

	const exampleList: {
		number: string;
		colour: Colour;
	}[] = [
		{ number: 'One', colour: 'bg-sky-500' },
		{ number: 'Two', colour: 'bg-emerald-500' },
		{ number: 'Three', colour: 'bg-yellow-500' }
	];
	return (
		<>
			<nav className="flex flex-col items-center justify-between gap-3 p-4 py-6 md:flex-row md:p-14">
				<a href="/" className="self-center md:self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
				{/* Hamburger button for mobile */}
				<button onClick={toggleMenu} className="absolute right-6 top-7 block md:hidden">
					<div className="space-y-2">
						<span
							className={`block h-0.5 w-8 transform bg-black transition duration-300 ${isMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`}
						></span>
						<span
							className={`block h-0.5 w-8 bg-black transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
						></span>
						<span
							className={`block h-0.5 w-8 transform bg-black transition duration-300 ${isMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`}
						></span>
					</div>
				</button>
				{/* Navigation menu */}
				<div
					className={`flex w-full flex-col items-center justify-center gap-4 md:w-auto md:flex-row md:gap-8 ${isMenuOpen ? 'block' : 'hidden md:flex'}`}
				>
					<a href="/login" className="w-full md:w-auto">
						<Button
							className="h-12 w-full md:w-44"
							hover="hover:bg-rose-600 transition-all"
							colour="bg-rose-500"
						>
							Login
						</Button>
					</a>
					<a href="/register" className="w-full md:w-auto">
						<Button
							className="h-12 w-full md:w-44"
							hover="hover:bg-rose-600 transition-all"
							colour="bg-rose-500"
						>
							Register
						</Button>
					</a>
				</div>
			</nav>
			<main className="mb-10 space-y-12 px-4 md:px-14">
				{/* Hero section */}
				<section className="grainy flex min-h-[45vh] w-full flex-col items-center justify-center gap-6 border-2 border-black bg-rose-500 p-6 shadow-brutal md:p-10">
					<h1 className="text-center text-3xl font-bold text-rose-100 md:text-4xl lg:text-5xl xl:text-6xl">
						Organize your links in a chaotic, <br className="hidden md:block" />
						beautiful way.
					</h1>

					<h3 className="text-center text-sm font-semibold tracking-wide text-rose-200 sm:text-lg md:text-xl">
						Build a hub to connect all your links in one place.
					</h3>

					<div className="relative flex w-72 flex-col items-center justify-end md:w-64">
						<DoodleArrowIcon className="absolute -bottom-5 right-2 h-9 w-9 fill-rose-200 sm:-bottom-20 sm:-right-2 sm:h-12 sm:w-12 md:-bottom-9 md:-right-10 md:h-14 md:w-14" />
						<a href="/register" className="w-auto">
							<Button
								className={'h-12 w-44 text-xs sm:w-56 sm:text-sm md:w-44'}
								colour={'bg-indigo-500'}
							>
								Try it now
							</Button>
						</a>
					</div>
				</section>
				<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
					{/* Dashboard section */}
					<section className="grainy relative z-0 order-1 col-span-1 w-full select-none border-2 border-black bg-indigo-500 p-4 py-12 shadow-brutal md:p-12 lg:col-span-2">
						<div
							id="nav-dots"
							className="absolute right-4 top-4 flex flex-row gap-2 md:right-6 md:top-6"
						>
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-red-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-yellow-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-green-500 md:h-5 md:w-5" />
						</div>

						<div className="grainy group relative z-10 my-3 flex h-full w-full flex-col space-y-4 border-2 border-black bg-rose-400 p-4 text-white shadow-brutal md:p-8">
							<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
								<h4 className="text-sm font-medium lg:text-base xl:text-lg">Dashboard</h4>
								<div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
									<Button className={'h-10 w-full text-xs md:w-32'} colour={'bg-rose-500'} showcase>
										Edit Description
									</Button>
									<Button
										className={'h-10 w-full text-xs md:w-32'}
										colour={'bg-indigo-500'}
										showcase
									>
										Visit Avenue
									</Button>
									<Button
										className={'z-30 h-10 w-full text-xs md:w-10'}
										colour={'bg-fuchsia-500'}
										disabled
										showcase
									>
										<PaperClipIcon className="h-5 w-5" />
									</Button>
								</div>
							</div>
							<div className="flex w-full flex-col justify-between gap-4 md:flex-row">
								<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-rose-500 p-5 shadow-brutal sm:justify-between">
									<div className="w-full">
										<p className="absolute left-20 top-72 z-30 text-nowrap text-xl font-semibold text-white md:left-28 md:top-16 md:hidden md:group-hover:block">
											Live statistics
										</p>
										<DoodleArrowTopRightIcon className="absolute left-16 top-64 z-30 block h-8 w-8 -rotate-90 fill-white md:left-20 md:top-20 md:hidden md:rotate-180 md:group-hover:block" />
										<p className="absolute right-2 top-28 z-30 text-nowrap text-xl font-semibold text-white md:right-20 md:top-24 md:hidden md:group-hover:block">
											Copy your link
										</p>
										<DoodleArrowIcon className="absolute right-36 top-32 z-30 h-8 w-8 -rotate-12 fill-white md:right-12 md:top-20 md:hidden md:group-hover:block" />
										<div className="flex flex-row items-center justify-between">
											<div className="flex flex-col">
												<p className="relative z-30 font-bold text-white">
													{randomNumber[0] ? randomNumber[0] : 0}
												</p>

												<p className="text-xs font-medium">Total Avenue Clicks</p>
											</div>
											<PointerIcon className="h-6 w-6 -rotate-6 md:h-8 md:w-8" />
										</div>
									</div>
								</div>
								<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-rose-500 p-5 shadow-brutal sm:justify-between">
									<div className="flex w-full flex-row items-center justify-between">
										<div className="flex flex-col">
											<p className="font-bold">{randomNumber[1] ? randomNumber[1] : 0}</p>

											<p className="text-xs font-medium">Number of links</p>
										</div>
										<PaperClipIcon className="h-6 w-6 md:h-8 md:w-8" />
									</div>
								</div>
							</div>
							<div className="grainy border-2 border-black bg-indigo-500 p-6 shadow-brutal">
								<div className="flex h-[150px] items-center justify-center">
									{<ClicksChart chartData={chartData} windowWidth={windowWidth} />}
								</div>
							</div>
							<div className="absolute -top-4 left-0 z-20 block h-full w-full bg-black/50 transition-colors md:hidden md:group-hover:block" />
						</div>
					</section>
					{/* Accompanying information about the dashboard */}
					<section className="grainy order-2 flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-4 sm:gap-5 sm:p-6 md:gap-7 md:p-8 lg:p-10 xl:p-12">
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Statistics{' '}
								<GraphIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Your avenue clicks and number of links shown directly on your dashboard. Our graph
								show the trends in the number of clicks on your avenue in the past month.
							</p>
						</div>
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Quick Edit
								<EditIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Seamlessly edit your avenue description. No need to leave the page, just click the
								edit button and make the changes. Let your creativity shine!
							</p>
						</div>
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Share
								<ShareIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Copy your avenue link with a single click and share it with others!
							</p>
						</div>
					</section>
					{/* Accompanying information for the pricing section */}
					<section className="grainy order-4 flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-4 sm:gap-5 sm:p-6 md:gap-7 md:p-8 lg:p-10 xl:p-12">
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Totally FREE!
								<MoneyIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								No subscriptions. Just vibes. Our service is completely free—no hidden fees, no
								premium tiers, and no tricks up our sleeves.
							</p>
						</div>
						<div className="space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Open Source
								<OpenSourceIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Check the code on GitHub! It&apos;s open-source, so you can explore, contribute, or
								even make it your own.
							</p>
						</div>
						<a href="https://github.com/RNAV2019/avenue-web" target="_blank" className="w-full">
							<Button className={'h-14 w-full'} colour={'bg-rose-500'}>
								View on GitHub
							</Button>
						</a>
					</section>
					{/* Pricing section */}
					<section className="grainy relative order-3 col-span-1 flex w-full flex-col gap-5 border-2 border-black bg-indigo-500 p-6 shadow-brutal md:order-4 md:p-10 lg:col-span-2">
						<div
							id="nav-dots"
							className="absolute right-4 top-4 flex flex-row gap-2 md:right-6 md:top-6"
						>
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-red-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-yellow-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-green-500 md:h-5 md:w-5" />
						</div>
						<h4 className="text-center text-3xl font-semibold text-indigo-800 lg:text-4xl xl:text-5xl">
							Pricing
						</h4>
						<div className="grainy flex h-full flex-col items-center gap-5 border-2 border-black bg-indigo-400 p-4 shadow-brutal md:p-6">
							<h5 className="text-xl font-bold text-indigo-900 md:text-2xl">Free tier</h5>
							<div className="mb-4 flex flex-col items-center">
								<CountdownTicker />
								<span className="text-base text-indigo-700 md:text-lg">/month</span>
							</div>
							<ul className="space-y-4 text-center text-sm text-indigo-800 md:text-base">
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
					</section>
					{/* Example Avenue */}
					<section className="grainy relative z-0 order-4 col-span-1 h-full w-full select-none border-2 border-black bg-indigo-500 p-4 py-12 shadow-brutal md:p-12 lg:col-span-2">
						<div
							id="nav-dots"
							className="absolute right-4 top-4 flex flex-row gap-2 md:right-6 md:top-6"
						>
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-red-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-yellow-500 md:h-5 md:w-5" />
							<div className="h-4 w-4 shrink-0 rounded-full border-2 border-black bg-green-500 md:h-5 md:w-5" />
						</div>

						<div className="grainy group relative z-10 my-3 flex h-full w-full flex-col items-center justify-center space-y-4 border-2 border-black bg-rose-200 p-4 text-white shadow-brutal md:p-8">
							<div className="grainy flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-md border-2 border-black bg-rose-500 py-14 text-white shadow-calm">
								<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-orange-600 text-2xl">
									B
								</div>
								<h1 className="text-2xl font-bold md:text-3xl lg:text-3xl">Bob&apos;s Avenue</h1>
								<div className="relative flex flex-col items-center gap-4">
									<DoodleArrowTopRightIcon className="absolute -left-0 -top-6 z-40 block h-8 w-8 rotate-90 fill-white md:-left-0 md:-top-6 md:hidden md:rotate-90 md:group-hover:block" />
									<p className="absolute -left-8 -top-14 z-30 text-nowrap text-lg font-semibold text-white sm:text-xl md:-left-14 md:-top-14 md:hidden md:group-hover:block">
										Delete your links
									</p>
									<DoodleArrowTopRightIcon className="absolute -top-5 left-[12.5rem] z-40 block h-8 w-8 rotate-[170deg] fill-white sm:left-[21rem] sm:rotate-[170deg] md:-top-5 md:hidden md:group-hover:block" />
									<p className="absolute -top-12 left-32 z-30 text-nowrap text-lg font-semibold text-white sm:left-72 sm:text-xl md:-top-12 md:hidden md:group-hover:block">
										Copy your link
									</p>
									<DoodleArrowTopRightIcon className="absolute left-24 top-56 z-40 block h-8 w-8 rotate-0 fill-white sm:left-36 md:top-56 md:hidden md:rotate-0 md:group-hover:block" />
									<p className="absolute left-0 top-64 z-30 text-nowrap text-lg font-semibold text-white sm:left-12 sm:text-xl md:top-64 md:hidden md:group-hover:block">
										Add your link
									</p>
									{exampleList.map((item, index) => (
										<div className="flex flex-row items-center gap-2" key={index}>
											{index === 0 ? (
												<Button className={'z-30 h-12 w-12'} colour={'bg-red-500'} showcase>
													<DeleteIcon fontSize={26} />
												</Button>
											) : (
												<Button className={'h-12 w-12'} colour={'bg-red-500'} showcase>
													<DeleteIcon fontSize={26} />
												</Button>
											)}
											<Button className={'h-12 w-32 sm:w-64'} colour={item.colour} showcase>
												Link {item.number}
											</Button>
											{index === 0 ? (
												<Button className={'z-30 h-12 w-12'} colour={'bg-blue-500'} showcase>
													<EditIcon fontSize={26} />
												</Button>
											) : (
												<Button className={'h-12 w-12'} colour={'bg-blue-500'} showcase>
													<EditIcon fontSize={26} />
												</Button>
											)}
										</div>
									))}
									<Button
										className="z-30 h-12 w-60 cursor-default sm:w-64"
										colour={'bg-indigo-500'}
										showcase
									>
										Add Link
									</Button>
								</div>
							</div>
							<div className="absolute -top-4 left-0 z-20 block h-full w-full bg-black/60 transition-colors md:hidden md:group-hover:block" />
						</div>
					</section>
					{/* Accompanying information about example avenue */}
					<section className="grainy order-5 flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-4 sm:gap-5 sm:p-6 md:gap-7 md:p-8 lg:p-10 xl:p-12">
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Add your links
								<AddIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Curate your own collection of links by adding them to your avenue - whether
								it&apos;s just a couple or dozens of them. There&apos;s no limit to how many links
								you can include, so feel free to add as many as you need to create your perfect
								digital hub.
							</p>
						</div>
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Edit your links
								<EditIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Modify any link&apos;s name and URL whenever you want with just a few clicks, and of
								course have the option to delete them too.
							</p>
						</div>
						<div className="space-y-1 sm:space-y-2">
							<h4 className="flex flex-row items-center justify-between text-xl font-bold text-rose-900 sm:text-xl md:text-2xl xl:text-3xl">
								Delete your links
								<DeleteIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9" />
							</h4>
							<p className="text-xs text-rose-700 sm:text-base xl:text-xl">
								Remove links you no longer need with just a click of a button. Keep your avenue
								clean and organized by clearing out outdated or unnecessary links.
							</p>
						</div>
					</section>
					{/* How it works section */}
					<section className="grainy order-5 col-span-1 w-full border-2 border-black bg-rose-400 p-6 shadow-brutal md:p-10 lg:col-span-3">
						<h4 className="mb-8 text-center text-3xl font-semibold text-rose-800 lg:text-4xl xl:text-5xl">
							How it works
						</h4>
						<div className="flex min-h-[300px] flex-col items-center justify-between gap-8 md:h-3/4 lg:flex-row">
							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-0 space-y-6 border-2 border-black bg-rose-500 p-4 shadow-brutal md:gap-4 md:p-6">
								<div className="grainy flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-2xl font-bold text-rose-100 md:h-16 md:w-16 md:text-3xl">
									1
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-xl font-bold text-rose-900 md:text-2xl">Register</h5>
									<p className="text-xs font-medium text-rose-900 md:text-sm">
										Create your free account in seconds
									</p>
								</div>
							</div>

							<DoodleArrowRightIcon className="hidden h-8 w-8 shrink-0 fill-rose-200 md:block md:h-10 md:w-10 md:rotate-90 lg:rotate-0" />

							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-0 space-y-6 border-2 border-black bg-rose-500 p-4 shadow-brutal md:gap-4 md:p-6">
								<div className="grainy flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-2xl font-bold text-rose-100 md:h-16 md:w-16 md:text-3xl">
									2
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-xl font-bold text-rose-900 md:text-2xl">Add Links</h5>
									<p className="text-xs font-medium text-rose-900 md:text-sm">
										Add all your important links to your avenue
									</p>
								</div>
							</div>

							<DoodleArrowRightIcon className="hidden h-8 w-8 shrink-0 fill-rose-200 md:block md:h-10 md:w-10 md:rotate-90 lg:rotate-0" />

							<div className="grainy flex h-full w-full flex-col items-center justify-center gap-0 space-y-6 border-2 border-black bg-rose-500 p-4 shadow-brutal md:gap-4 md:p-6">
								<div className="grainy flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-rose-600 text-2xl font-bold text-rose-100 md:h-16 md:w-16 md:text-3xl">
									3
								</div>
								<div className="w-2/3 space-y-2 text-center">
									<h5 className="text-xl font-bold text-rose-900 md:text-2xl">Share</h5>
									<p className="text-xs font-medium text-rose-900 md:text-sm">
										Share your avenue link with the world
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<footer className="grainy flex min-h-[96px] w-full flex-col items-center justify-between border-2 border-black bg-indigo-500 p-4 shadow-brutal md:h-24 md:flex-row md:px-8">
					<div className="flex items-center justify-center gap-4">
						<span className="text-lg font-bold text-indigo-100">Avenue</span>
					</div>

					<div className="flex flex-col gap-4 text-center md:flex-row md:gap-6">
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
