'use client';

import { useState } from 'react';
import Button from './Button';
import { DeleteIcon } from '@/lib/icons/DeleteIcon';

interface LinkProps {
	link_id: string;
	updateLinks: () => void;
}

export default function DeleteLinkModal({ updateLinks, link_id }: LinkProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch(`/api/deleteLink?id=${link_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			console.log('Link deleted successfully');
			updateLinks();
			handleClose();
		} else {
			console.error('Failed to delete link');
		}
	};

	if (!isOpen)
		return (
			<div className="absolute -left-4">
				<Button onClick={handleOpen} className={'h-12 w-12'} colour={'bg-red-500'}>
					<DeleteIcon fontSize={26} />
				</Button>
			</div>
		);
	return (
		<>
			<Button className={'h-12 w-12'} colour={'bg-red-500'}>
				<DeleteIcon fontSize={26} />
			</Button>
			<div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-80">
				<div
					className="dark:bg-secondary mx-auto my-52 max-w-xs rounded-lg bg-rose-500 shadow-brutal sm:max-w-sm md:max-w-md lg:max-w-lg"
					onClick={(e) => e.stopPropagation()}
				>
					<form
						className="grainy flex h-full w-full flex-col items-center gap-4 p-8"
						name="linkForm"
						onSubmit={handleSubmit}
					>
						<h3 className="mb-2 text-xl font-medium text-white">Delete link</h3>
						<h4 className="text-lg font-semibold">Are you sure you want to delete this link?</h4>
						<div className="flex flex-row gap-8">
							<Button className="h-10 w-32 text-xs" colour={'bg-red-500'} type="submit">
								Delete
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
