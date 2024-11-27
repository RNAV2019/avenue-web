import LinkList from '@/components/LinkList';
import { Avenue } from '@/lib/helper';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

const outfit = Outfit({ subsets: ['latin'] });

export default async function avenue({ params }: { params: Promise<{ avenueID: string }> }) {
	const avenueID = (await params).avenueID[0];
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAvenue?avenueID=${avenueID}`, {
		cache: 'no-store'
	});
	const avenueData = await res.json();
	const avenue = avenueData as Avenue;
	if (!avenueData) {
		return (
			<div>
				<h1>Error no avenue found</h1>
			</div>
		);
	}
	const statisticRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/createStatistic`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			avenueID: avenueID
		})
	});
	const qrcodeURL = `${process.env.WEBSITE_URL}/avenue/${avenueID}`;
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
