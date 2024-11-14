import { colours, Link } from '@/lib/helper';
import Button from './Button';

export default function LinkItem(link: Link) {
	// Get random colour from the array
	const colour = colours[Math.floor(Math.random() * colours.length)];
	return (
		<a href={link.url} target="_blank">
			<Button className={'h-12 w-64'} colour={colour}>
				{link.name}
			</Button>
		</a>
	);
}
