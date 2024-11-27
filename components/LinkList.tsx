'use client';

import { useEffect, useState } from 'react';
import CreateLinkModal from './CreateLinkModal';
import { Link } from '@/lib/helper';
import LinkItem from './LinkItem';
import { useSession } from 'next-auth/react';
import EditLinkModal from './EditLinkModal';
import DeleteLinkModal from './DeleteLinkModal';
import Loading from './Loading';

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
		fetch(`/api/getLinks?avenueID=${avenueID}`, {
			cache: 'no-store'
		})
			.then((res) => res.json())
			.then((data: LinkWithOwner) => {
				setIsOwner(data.isOwner);
				if (data.links.length > 0) {
					setLinks(data.links);
				}
				setLoading(false);
				return;
			});
	}, []);

	const updateLinks = async () => {
		const res = await fetch(`/api/getLinks?avenueID=${avenueID}`, {
			cache: 'no-store'
		});
		const data: LinkWithOwner = await res.json();
		if (data.links.length > 0) {
			setLinks(data.links);
		} else {
			setLinks([]);
			return;
		}
	};

	return (
		<div className="flex flex-col items-center gap-2">
			{!loading && links && links.length > 0 && (
				<ul>
					{links.map((link: Link) => (
						<li
							key={link.url}
							className="relative flex flex-row items-center justify-end px-10 py-2"
						>
							{session && isOwner && <DeleteLinkModal onDelete={updateLinks} link_id={link.id} />}
							<LinkItem isOwner={isOwner} link={link} />
							{session && isOwner && <EditLinkModal linkData={link} updateLinks={updateLinks} />}
						</li>
					))}
				</ul>
			)}
			{!loading && links.length === 0 && <p>No links found</p>}
			{loading && <Loading loading={loading} />}
			{session && isOwner && <CreateLinkModal updateLinks={updateLinks} />}
		</div>
	);
}
