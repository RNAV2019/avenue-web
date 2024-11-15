'use client';
import { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface DescriptionProps {
	isOpen: boolean;
	onClose: () => void;
}

type DescriptionResponse = {
	description: string;
};

export default function DescriptionModal({ isOpen, onClose }: DescriptionProps) {
	const [description, setDescription] = useState('');

	useEffect(() => {
		fetch('/api/getDescription')
			.then((res) => res.json())
			.then((data: DescriptionResponse) => {
				console.log(data);
				setDescription(data.description);
			});
	}, []);
	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (description) {
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
				onClose();
			} else {
				console.error('Failed to update description');
			}
		} else {
			console.error('Invalid description');
			onClose();
		}
	};
	return (
		<div
			className="fixed -top-10 left-0 z-50 h-full w-full bg-black bg-opacity-80"
			onClick={onClose}
		>
			<div
				className="dark:bg-secondary mx-auto my-52 max-w-lg rounded-lg bg-cyan-500 shadow-brutal"
				onClick={(e) => e.stopPropagation()}
			>
				<form
					className="grainy flex h-full w-full flex-col items-center gap-4 p-8"
					name="descriptionForm"
					onSubmit={handleSubmit}
				>
					<h3 className="mb-2 text-xl font-medium">Update Avenue Description</h3>
					<Input
						type="text"
						id="description"
						name="description"
						placeholder="Description"
						autoComplete="off"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className="flex flex-row gap-8">
						<Button className="h-10 w-32 text-xs" colour={'bg-emerald-500'} type="submit">
							Update
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
