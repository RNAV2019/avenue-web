import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/Providers';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
	title: 'Avenue',
	description: 'Showcase yourself to the world'
};

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });
export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang="en" className="grainy flex w-full flex-col items-center bg-amber-400">
			<body className={`w-full max-w-screen-2xl ${rubik.className}`}>
				<AuthProvider session={session}>{children}</AuthProvider>
			</body>
		</html>
	);
}
