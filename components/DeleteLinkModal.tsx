'use client';

import { useState } from 'react';
import Button from './Button';
import { DeleteIcon } from '@/lib/icons/DeleteIcon';

interface LinkProps {
	link_id: string;
	onDelete?: () => void;
}

export default function DeleteLinkModal({ onDelete, link_id }: LinkProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
		setError(''); // Clear any previous errors
	};

	const handleClose = () => {
		setIsOpen(false);
		setError(''); // Clear any errors when closing
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const res = await fetch(`/api/deleteLink?id=${link_id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				onDelete?.();
				handleClose();
			} else {
				const errorData = await res.json();
				setError(errorData.message || 'Failed to delete link. Please try again.');
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
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

						{error && (
							<div className="w-full rounded-md border-2 border-black bg-red-100 p-3 text-sm font-medium text-red-600 shadow-calm">
								{error}
							</div>
						)}

						<div className="flex flex-row gap-8">
							<Button
								className="h-10 w-32 text-xs"
								colour={'bg-red-500'}
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? 'Deleting...' : 'Delete'}
							</Button>
							<Button
								className="h-10 w-32 text-xs"
								colour={'bg-indigo-500'}
								onClick={handleClose}
								disabled={isLoading}
							>
								Close
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
