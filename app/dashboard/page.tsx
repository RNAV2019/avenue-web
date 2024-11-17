'use client';
import Button from '@/components/Button';
import ClicksChart from '@/components/ClicksChart';
import DescriptionModal from '@/components/DescriptionModal';
import ProfileIconModal from '@/components/ProfileIconModal';
import { DashboardInfo } from '@/lib/helper';
import { PaperClipIcon } from '@/lib/icons/PaperClipIcon';
import { PointerIcon } from '@/lib/icons/PointerIcon';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
	const { data: session, update, status } = useSession();
	const user = session?.user;
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>();
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
	useEffect(() => {
		fetch('/api/getDashboard')
			.then((res) => res.json())
			.then((data: DashboardInfo) => {
				setDashboardInfo(data);
				setLoading(false);
				router.prefetch(`/avenue/${data.avenueID}`);
			});
	}, []);

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
							<h1>Avenue</h1>
							<span>- logged in as {user?.email}</span>
						</div>
						<div className="flex flex-row items-center justify-center gap-8">
							<button onClick={() => setProfileModalOpen(true)}>
								{user?.image ? (
									<img
										src={user?.image}
										alt="Profile"
										className="h-12 w-12 rounded-full border-2 border-black"
									/>
								) : (
									<div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-600 text-lg">
										{user?.name?.charAt(0)}
									</div>
								)}
							</button>

							<Button
								className="h-12 w-44"
								colour="bg-rose-500"
								onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
							>
								Sign out
							</Button>
						</div>
					</nav>
					<div className="grainy flex w-full flex-col gap-4 border-2 border-black bg-rose-400 p-6 text-white shadow-brutal">
						<div className="flex flex-row items-center justify-between">
							<h1 className="ml-2 text-xl font-medium">Dashboard</h1>
							<div className="flex gap-3">
								<Button
									className="h-12 w-44"
									colour="bg-rose-500"
									onClick={() => setDescriptionModalOpen(true)}
								>
									Edit Description
								</Button>
								<Button
									className="h-12 w-44"
									colour="bg-indigo-500"
									onClick={() => router.push(`/avenue/${dashboardInfo?.avenueID}`)}
									disabled={loading}
								>
									Visit my avenue
								</Button>
								<Button
									className="h-12 w-12 text-xs"
									colour="bg-fuchsia-500"
									onClick={handleCopyLink}
								>
									<PaperClipIcon className="h-5 w-5" />
								</Button>
							</div>
						</div>
						<section className="flex flex-row justify-between gap-3">
							<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-rose-500 p-6 shadow-brutal sm:justify-between">
								<div>
									<p className="text-3xl font-bold">
										{loading ? 'Loading' : dashboardInfo?.aggregateClicks}
									</p>

									<p className="text-sm font-medium">Total Avenue Clicks</p>
								</div>
								<PointerIcon className="h-8 w-8 -rotate-6" />
							</div>
							<div className="grainy flex flex-1 items-center gap-4 border-2 border-black bg-rose-500 p-6 shadow-brutal sm:justify-between">
								<div>
									<p className="text-3xl font-bold">
										{loading ? 'Loading' : dashboardInfo?.linksRes}
									</p>

									<p className="text-sm font-medium">Number of links</p>
								</div>
								<PaperClipIcon className="h-8 w-8" />
							</div>
						</section>
						<section>
							<div className="grainy border-2 border-black bg-indigo-500 p-6 shadow-brutal">
								<div className="flex h-[350px] items-center justify-center">
									{!dashboardInfo?.chartData && <p>Loading...</p>}
									{dashboardInfo?.chartData && <ClicksChart chartData={dashboardInfo?.chartData} />}
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
