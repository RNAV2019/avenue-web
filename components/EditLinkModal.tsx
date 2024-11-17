'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { EditIcon } from '@/lib/icons/EditIcon';
import { Link } from '@/lib/helper';

interface LinkProps {
	linkData: Link;
	updateLinks: () => void;
}

export default function EditLinkModal({ updateLinks, linkData }: LinkProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [link, setLink] = useState(linkData.url);
	const [name, setName] = useState(linkData.name);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (link.length > 0 && name.length > 0) {
			const res = await fetch('/api/updateLink', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: link,
					name: name,
					id: linkData.id
				})
			});
			if (res.ok) {
				console.log('Link updated successfully');
				updateLinks();
				handleClose();
			} else {
				console.error('Failed to update link');
			}
		} else {
			console.error('Invalid link');
			handleClose();
		}
	};

	if (!isOpen)
		return (
			<div className="absolute -right-4">
				<Button onClick={handleOpen} className={'h-12 w-12'} colour={'bg-blue-500'}>
					<EditIcon fontSize={26} />
				</Button>
			</div>
		);
	return (
		<>
			<Button className={'h-12 w-12'} colour={'bg-blue-500'}>
				<EditIcon fontSize={26} />
			</Button>
			<div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-80">
				<div
					className="dark:bg-secondary mx-auto my-52 max-w-lg rounded-lg bg-rose-500 shadow-brutal"
					onClick={(e) => e.stopPropagation()}
				>
					<form
						className="grainy flex h-full w-full flex-col items-center gap-4 p-8"
						name="linkForm"
						onSubmit={handleSubmit}
					>
						<h3 className="mb-2 text-xl font-medium">Edit link</h3>
						<Input
							type="text"
							id="link"
							name="link"
							placeholder="URL"
							autoComplete="off"
							className="text-black placeholder:text-black"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<Input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							autoComplete="off"
							className="text-black placeholder:text-black"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className="flex flex-row gap-8">
							<Button className="h-10 w-32 text-xs" colour={'bg-red-500'} type="submit">
								Edit
							</Button>
							<Button className="h-10 w-32 text-xs" colour={'bg-indigo-500'} onClick={handleClose}>
								Close
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
