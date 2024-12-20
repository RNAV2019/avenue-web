'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface LinkProps {
	updateLinks: () => void;
}

export default function CreateLinkModal({ updateLinks }: LinkProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [link, setLink] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
		setError('');
	};

	const handleClose = () => {
		setIsOpen(false);
		setError('');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		if (!link || !name) {
			setError('Please fill in all fields');
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch('/api/createLink', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: link,
					name: name
				})
			});

			if (res.ok) {
				updateLinks();
				handleClose();
			} else {
				const data = await res.json();
				setError(data.message || 'Failed to create link');
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen)
		return (
			<Button className="h-12 w-64" colour={'bg-indigo-500'} onClick={handleOpen}>
				Add Link
			</Button>
		);
	return (
		<>
			<Button className="h-12 w-64" colour={'bg-indigo-500'}>
				Add Link
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
						<h3 className="mb-2 text-xl font-medium text-white">Create a new link</h3>
						<Input
							type="text"
							id="link"
							name="link"
							placeholder="URL"
							autoComplete="off"
							className="text-black placeholder:text-black"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							disabled={isLoading}
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
							disabled={isLoading}
						/>
						<div className="flex flex-row gap-8">
							<Button
								className="h-10 w-32 text-xs"
								colour={'bg-red-500'}
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? 'Updating...' : 'Create'}
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
