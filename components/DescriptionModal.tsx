'use client';
import { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface DescriptionProps {
	isOpen: boolean;
	onClose?: () => void;
}

export default function DescriptionModal({ isOpen, onClose }: DescriptionProps) {
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchDescription() {
			try {
				const res = await fetch('/api/getDescription');
				const data = await res.json();
				setDescription(data.description);
			} catch (err) {
				setError('Failed to load description');
			}
		}

		if (isOpen) {
			fetchDescription();
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		if (!description) {
			setError('Please enter a description');
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch('/api/updateAvenueDescription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					description: description
				})
			});

			if (res.ok) {
				onClose?.();
			} else {
				const data = await res.json();
				setError(data.message || 'Failed to update description');
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};
	if (!isOpen) return null;
	return (
		<div
			className="fixed -top-10 left-0 z-50 h-full w-full bg-black bg-opacity-80"
			onClick={onClose}
		>
			<div
				className="dark:bg-secondary mx-auto my-52 max-w-xs rounded-lg bg-rose-500 shadow-brutal sm:max-w-sm md:max-w-md lg:max-w-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<form
					className="grainy flex h-full w-full flex-col items-center gap-4 p-8"
					name="descriptionForm"
					onSubmit={handleSubmit}
				>
					<h3 className="mb-2 text-xl font-medium text-white">Update Avenue Description</h3>
					<Input
						type="text"
						id="description"
						name="description"
						placeholder="Description"
						autoComplete="off"
						className="text-black placeholder:text-black"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						disabled={isLoading}
					/>
					<div className="flex flex-row gap-8">
						<Button
							className="h-10 w-32 text-xs"
							colour={'bg-red-500'}
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Updating...' : 'Update'}
						</Button>
						<Button className="h-10 w-32 text-xs" colour={'bg-indigo-500'} onClick={onClose}>
							Close
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
