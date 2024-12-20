'use client';
import { useEffect, useState } from 'react';
import Button from './Button';
import { ImageValidity } from '@/lib/helper';
import Input from './Input';
import Image from 'next/image';

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
	const [imageURL, setImageURL] = useState(defaultImage ?? '');
	const [isValidImage, setIsValidImage] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const validateImageURL = async () => {
		setError('');
		setIsLoading(true);

		try {
			const urlPattern = new RegExp(
				'^(https?:\\/\\/)?' +
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
					'((\\d{1,3}\\.){3}\\d{1,3}))' +
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
					'(\\?[;&a-z\\d%_.~+=-]*)?' +
					'(\\#[-a-z\\d_]*)?$',
				'i'
			);

			if (!urlPattern.test(imageURL)) {
				setError('Please enter a valid URL');
				setIsValidImage(false);
				return;
			}

			const res = await fetch('/api/validateImage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					imageURL: imageURL
				})
			});

			const data = await res.json();
			setIsValidImage(data.valid);
			if (!data.valid) {
				setError('Please enter a valid image URL');
			}
		} catch (error) {
			setError('Failed to validate image URL');
			setIsValidImage(false);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (imageURL) {
			validateImageURL();
		} else {
			setIsValidImage(false);
		}
	}, [imageURL]);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		if (!imageURL) {
			setError('Please enter an image URL');
			setIsLoading(false);
			return;
		}

		try {
			await validateImageURL();

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
				} else {
					const data = await res.json();
					setError(data.message || 'Failed to update profile icon');
				}
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

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
					name="profileIconForm"
					onSubmit={handleSubmit}
				>
					<h3 className="mb-2 text-xl font-medium text-white">Update Profile Icon</h3>
					{imageURL != '' && isValidImage && (
						<Image
							width={100}
							height={100}
							src={imageURL}
							alt="Profile"
							className="h-24 w-24 rounded-full border-2 border-black"
						/>
					)}
					{(imageURL == '' || !isValidImage) && defaultImage && (
						<Image
							width={100}
							height={100}
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
						className="text-black placeholder:text-black"
						onChange={(e) => setImageURL(e.target.value)}
						disabled={isLoading}
					/>
					<div className="flex flex-row gap-8">
						<Button
							className="h-10 w-32 text-xs"
							colour={'bg-red-500'}
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Updating...' : 'Update Profile'}
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
