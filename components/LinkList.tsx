'use client';

import { useEffect, useState } from 'react';
import CreateLinkModal from './CreateLinkModal';
import { Link } from '@/lib/helper';
import LinkItem from './LinkItem';
import { useSession } from 'next-auth/react';

interface LinkList {
	avenueID: string;
}

type LinkWithOwner = { links: Link[]; isOwner: boolean };

export default function LinkList({ avenueID }: LinkList) {
	const { data: session } = useSession();
	const [links, setLinks] = useState<Link[]>([]);
	const [isOwner, setIsOwner] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getLinks?avenueID=${avenueID}`, {
			cache: 'no-store'
		})
			.then((res) => res.json())
			.then((data: LinkWithOwner) => {
				if (data.links.length > 0) {
					setLinks(data.links);
					setIsOwner(data.isOwner);
					console.log(`data: ${!data}`);
				} else {
					return;
				}
				setLoading(false);
			});
	}, []);

	const updateLinks = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/getLinks?avenueID=${avenueID}`,
			{
				cache: 'no-store'
			}
		);
		const data: Link[] = await res.json();
		if (data.length > 0) {
			setLinks(data);
			console.log(`data: ${!data}`);
		} else {
			return;
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{!loading && links && links.length > 0 && (
				<ul>
					{links.map((link: Link) => (
						<li key={link.url}>
							<LinkItem {...link} />
						</li>
					))}
				</ul>
			)}
			{!loading && links.length === 0 && <p>No links found</p>}
			{loading && <div>Loading...</div>}
			{session && isOwner && <CreateLinkModal updateLinks={updateLinks} />}
		</div>
	);
}
