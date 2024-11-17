import { colours, Link } from '@/lib/helper';
import Button from './Button';

export default function LinkItem(link: Link) {
	// Create a simple hash from the URL string to use as a seed
	const hashCode = link.url.split('').reduce((acc, char) => {
		return char.charCodeAt(0) + ((acc << 5) - acc);
	}, 0);
	// Use the hash to get a consistent colour for this URL
	const colour = colours[Math.abs(hashCode) % colours.length];
	return (
		<a href={link.url} target="_blank">
			<Button className={'h-12 w-64'} colour={colour}>
				{link.name}
			</Button>
		</a>
	);
}
