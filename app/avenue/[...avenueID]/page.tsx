'use client';
import LinkList from '@/components/LinkList';
import Loading from '@/components/Loading';
import { AvenueType } from '@/lib/helper';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'] });

export default function Avenue({ params }: { params: { avenueID: string[] } }) {
	const [avenue, setAvenue] = useState<AvenueType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const avenueID = params.avenueID[0];
	const qrcodeURL = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/avenue/${avenueID}`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch avenue data
				const res = await fetch(`/api/getAvenue?avenueID=${avenueID}`, {
					cache: 'no-store'
				});

				if (!res.ok) {
					throw new Error('Failed to fetch avenue data');
				}

				const avenueData = await res.json();
				setAvenue(avenueData);

				// Create statistic
				await fetch(`/api/createStatistic`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						avenueID: avenueID
					})
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			}
		};

		fetchData();
	}, [avenueID]); // Only run when avenueID changes

	if (error) {
		return (
			<div>
				<h1>Error: {error}</h1>
			</div>
		);
	}

	if (!avenue) {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<Loading loading={!avenue} />
			</div>
		);
	}

	return (
		<>
			<nav className="flex flex-col items-center justify-between gap-3 px-4 pt-6 md:flex-row md:px-14">
				<a href="/" className="self-center md:self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
			</nav>
			<main className="px-10 pt-10">
				<section className="flex h-full w-full flex-col items-center">
					<div className="grainy flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-md border-2 border-black bg-rose-500 p-14 text-white shadow-calm">
						{avenue.profile_image ? (
							<Image
								src={avenue.profile_image}
								alt={'Profile Image'}
								width={96}
								height={96}
								className="h-24 w-24 rounded-full border-2 border-black"
							/>
						) : (
							<div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-orange-600 text-2xl">
								{avenue.name?.charAt(0)}
							</div>
						)}

						<h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
							{avenue.name}&apos;s Avenue
						</h1>
						{avenue.description?.length > 150
							? avenue.description.substring(0, 150) + '...'
							: avenue.description}
						<LinkList avenueID={avenueID} />
					</div>
				</section>
			</main>
			<div className="grainy mx-auto my-4 flex w-fit flex-col items-center justify-center gap-1 rounded-md border-2 border-black bg-rose-500 p-4 text-white shadow-calm md:fixed md:bottom-2 md:right-2 lg:bottom-12 lg:right-12">
				<QRCodeSVG
					value={qrcodeURL}
					level="H"
					marginSize={4}
					bgColor="transparent"
					fgColor="#fff"
				/>
				<p className="text-sm font-medium">Scan to share!</p>
			</div>
		</>
	);
}
