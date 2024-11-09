import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import './globals.css';
import AuthProvider from '@/components/Providers';

export const metadata: Metadata = {
	title: 'Avenue',
	description: 'Showcase yourself to the world'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="grainy bg-amber-400">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
