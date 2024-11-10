'use client';
import Button from '@/components/Button';
import ProfileIconModal from '@/components/ProfileIconModal';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Dashboard() {
	const { data: session, update, status } = useSession();
	const user = session?.user;
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const handleOpenProfileModal = () => setProfileModalOpen(true);
	const handleCloseProfileModal = () => setProfileModalOpen(false);
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
	console.log(user);

	return (
		<main className="space-y-10 p-10">
			{status != 'authenticated' && (
				<div className="flex h-screen flex-col items-center justify-center gap-3 text-3xl font-bold">
					Loading
				</div>
			)}
			{status == 'authenticated' && (
				<>
					<ProfileIconModal
						isOpen={profileModalOpen}
						onClose={handleCloseProfileModal}
						onUpdateUserImage={handleUpdateUserImage}
						name={user?.name}
						email={user?.email}
						defaultImage={user?.image}
					/>
					<nav className="flex flex-row items-center justify-between gap-3">
						<div className="flex flex-row items-center gap-1 text-xl font-bold">
							<h1>Avenue</h1>
							<span>- logged in as {user?.email}</span>
						</div>
						<div className="flex flex-row items-center justify-center gap-8">
							<button onClick={handleOpenProfileModal}>
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
								colour="bg-red-500"
								onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
							>
								Sign out
							</Button>
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
				</>
			)}
		</main>
	);
}
