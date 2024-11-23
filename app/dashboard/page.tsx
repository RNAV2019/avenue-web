'use client';
import Button from '@/components/Button';
import ClicksChart from '@/components/ClicksChart';
import DescriptionModal from '@/components/DescriptionModal';
import ProfileIconModal from '@/components/ProfileIconModal';
import { DashboardInfo } from '@/lib/helper';
import { PaperClipIcon } from '@/lib/icons/PaperClipIcon';
import { PointerIcon } from '@/lib/icons/PointerIcon';
import { SignOutIcon } from '@/lib/icons/SignOutIcon';
import { useSession, signOut } from 'next-auth/react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
export default function Dashboard() {
	const { data: session, update, status } = useSession();
	const user = session?.user;
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>();
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	);
	useEffect(() => {
		fetch('/api/getDashboard')
			.then((res) => res.json())
			.then((data: DashboardInfo) => {
				setDashboardInfo(data);
				setLoading(false);
				router.prefetch(`/avenue/${data.avenueID}`);
			});
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [router]);

	const handleUpdateUserImage = (imageURL: string) => {
		console.log(`imageurl = ${imageURL}`);
		update({
			...session,
			user: {
				...session?.user,
				image: imageURL
			}
		});
	};

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				`${window.location.origin}/avenue/${dashboardInfo?.avenueID}`
			);
			console.log('Link copied to clipboard');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className="space-y-10 p-10">
			{status != 'authenticated' && (
				<div className="flex h-screen flex-col items-center justify-center gap-3 text-3xl font-bold">
					Loading...
				</div>
			)}
			{status == 'authenticated' && (
				<>
					<nav className="flex flex-row items-center justify-between gap-3">
						<div className="flex flex-row items-center gap-1 text-xl font-bold">
							<a href="/" className="self-center md:self-start">
								<h1 className={`text-2xl font-bold text-slate-900 ${outfit.className}`}>Avenue</h1>
							</a>
							<span className="hidden md:inline">- logged in as {user?.email}</span>
						</div>
						<div className="flex flex-row items-center justify-center gap-8">
							<button onClick={() => setProfileModalOpen(true)}>
								{user?.image ? (
									<Image
										width={100}
										height={100}
										src={user?.image}
										alt="Profile"
										className="aspect-square h-12 w-12 shrink-0 rounded-full border-2 border-black"
									/>
								) : (
									<div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-600 text-lg">
										{user?.name?.charAt(0)}
									</div>
								)}
							</button>

							<Button
								className="hidden h-12 w-44 md:inline-block"
								colour="bg-rose-500"
								onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
							>
								Sign out
							</Button>
							<Button
								className="inline-block h-12 w-12 md:hidden"
								colour="bg-rose-500"
								onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
							>
								<SignOutIcon className="h-6 w-6" />
							</Button>
						</div>
					</nav>
					<div className="grainy flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-4 text-white shadow-brutal md:p-6">
						<div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0">
							<h1 className="ml-2 grow text-xl font-medium">Dashboard</h1>
							<div className="flex w-full flex-col gap-3 sm:flex-row md:w-fit">
								<Button
									className="h-12 w-full sm:w-44"
									colour="bg-rose-500"
									onClick={() => setDescriptionModalOpen(true)}
								>
									Edit Description
								</Button>
								<Button
									className="h-12 w-full sm:w-44"
									colour="bg-indigo-500"
									onClick={() => router.push(`/avenue/${dashboardInfo?.avenueID}`)}
									disabled={loading}
								>
									Visit my avenue
								</Button>
								<Button
									className="h-12 w-full text-xs sm:w-12"
									colour="bg-fuchsia-500"
									onClick={handleCopyLink}
								>
									<PaperClipIcon className="h-5 w-5" />
								</Button>
							</div>
						</div>
						<section className="flex flex-col justify-between gap-3 sm:flex-row">
							<div className="grainy flex flex-1 items-center justify-between gap-4 border-2 border-black bg-rose-500 p-4 shadow-brutal md:p-6">
								<div>
									<p className="text-2xl font-bold lg:text-3xl">
										{loading ? 'Loading' : dashboardInfo?.aggregateClicks}
									</p>

									<p className="text-sm font-medium">Total Avenue Clicks</p>
								</div>
								<PointerIcon className="h-6 w-6 -rotate-6 md:h-8 md:w-8" />
							</div>
							<div className="grainy flex flex-1 items-center justify-between gap-4 border-2 border-black bg-rose-500 p-4 shadow-brutal md:p-6">
								<div>
									<p className="text-2xl font-bold lg:text-3xl">
										{loading ? 'Loading' : dashboardInfo?.linksRes}
									</p>

									<p className="text-sm font-medium">Number of links</p>
								</div>
								<PaperClipIcon className="h-6 w-6 md:h-8 md:w-8" />
							</div>
						</section>
						<section>
							<div className="grainy border-2 border-black bg-indigo-500 p-4 shadow-brutal md:p-6">
								<div className="flex h-[250px] items-center justify-center md:h-[350px]">
									{!dashboardInfo?.chartData && <p>Loading...</p>}
									{dashboardInfo?.chartData && (
										<ClicksChart chartData={dashboardInfo?.chartData} windowWidth={windowWidth} />
									)}
								</div>
							</div>
						</section>
					</div>
					<ProfileIconModal
						isOpen={profileModalOpen}
						onClose={() => setProfileModalOpen(false)}
						onUpdateUserImage={handleUpdateUserImage}
						name={user?.name}
						email={user?.email}
						defaultImage={user?.image}
					/>
					<DescriptionModal
						isOpen={descriptionModalOpen}
						onClose={() => setDescriptionModalOpen(false)}
					/>
				</>
			)}
		</main>
	);
}
