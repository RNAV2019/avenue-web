import { Avenue } from '@/lib/helper';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default async function avenue({ params }: { params: Promise<{ avenueID: string }> }) {
	const avenueID = (await params).avenueID[0];
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAvenue?avenueID=${avenueID}`);
	const avenueData = await res.json();
	console.log(avenueData);
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
	console.log(statisticRes);
	return (
		<main className="p-10">
			<nav className="flex flex-row items-center justify-between gap-3">
				<a href="/" className="self-start">
					<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
				</a>
			</nav>
			<section className="flex w-full flex-col items-center py-16">
				<div className="grainy flex w-full max-w-lg flex-col items-center justify-center gap-3 rounded-md border-2 border-black bg-red-500 py-14 shadow-calm">
					<h1 className="text-4xl font-bold text-slate-900">{avenue.name}'s Avenue</h1>
					<p className="text-lg text-slate-900">{avenue.description}</p>
					{/* Add pencil icon here */}
					{/* Add links here */}
				</div>
			</section>
		</main>
	);
}
