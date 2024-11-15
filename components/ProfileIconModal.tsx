'use client';
import { useEffect, useState } from 'react';
import Button from './Button';
import { ImageValidity } from '@/lib/helper';
import Input from './Input';

interface ProfileIconModalProps {
	isOpen: boolean;
	name?: string | null;
	email?: string | null;
	defaultImage?: string | null;
	onClose: () => void;
	onUpdateUserImage: (imageURL: string) => void;
}

export default function ProfileIconModal({
	isOpen,
	name,
	email,
	defaultImage,
	onClose,
	onUpdateUserImage
}: ProfileIconModalProps) {
	if (!isOpen) return null;
	const [imageURL, setImageURL] = useState(defaultImage ?? '');
	const [isValidImage, setIsValidImage] = useState(false);

	const validateImageURL = async () => {
		try {
			const res = await fetch('/api/validateImage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageURL: imageURL
				})
			});
			const data: ImageValidity = await res.json();
			setIsValidImage(data.valid);
		} catch (error) {
			setIsValidImage(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		validateImageURL();
		if (isValidImage) {
			const res = await fetch('/api/updateProfileIcon', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageURL: imageURL,
					email: email
				})
			});
			if (res.ok) {
				onUpdateUserImage(imageURL);
				onClose();
			}
		} else {
			console.error('Invalid image URL');
			onClose();
		}
	};

	useEffect(() => {
		if (imageURL) {
			validateImageURL();
		} else {
			setIsValidImage(false);
		}
	}, [imageURL]);
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
					name="profileIconForm"
					onSubmit={handleSubmit}
				>
					<h3 className="mb-2 text-xl font-medium">Update Profile Icon</h3>
					{imageURL != '' && isValidImage && (
						<img
							src={imageURL}
							alt="Profile"
							className="h-24 w-24 rounded-full border-2 border-black"
						/>
					)}
					{(imageURL == '' || !isValidImage) && defaultImage && (
						<img
							src={defaultImage}
							alt="Profile"
							className="h-24 w-24 rounded-full border-2 border-black"
						/>
					)}
					{(imageURL == '' || !isValidImage) && !defaultImage && (
						<div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-orange-600 text-2xl">
							{name?.charAt(0)}
						</div>
					)}
					<Input
						type="text"
						id="name"
						name="name"
						placeholder="URL"
						autoComplete="off"
						onChange={(e) => setImageURL(e.target.value)}
					/>
					<div className="flex flex-row gap-8">
						<Button className="h-10 w-32 text-xs" colour={'bg-emerald-500'} type="submit">
							Update Profile
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
