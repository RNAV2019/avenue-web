import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import './globals.css';
import AuthProvider from '@/components/Providers';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
	title: 'Avenue',
	description: 'Showcase yourself to the world'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	return (
		<html lang="en" className="grainy bg-amber-400">
			<body>
				<AuthProvider session={session}>{children}</AuthProvider>
			</body>
		</html>
	);
}
