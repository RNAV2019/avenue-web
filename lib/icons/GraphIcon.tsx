import { SVGProps } from 'react';

export function GraphIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
			<path
				fill="currentColor"
				d="M3 21q-.425 0-.712-.288T2 20t.288-.712T3 19h18q.425 0 .713.288T22 20t-.288.713T21 21zm1.5-3q-.625 0-1.062-.437T3 16.5v-4q0-.625.438-1.062T4.5 11t1.063.438T6 12.5v4q0 .625-.437 1.063T4.5 18m5 0q-.625 0-1.062-.437T8 16.5v-9q0-.625.438-1.062T9.5 6t1.063.438T11 7.5v9q0 .625-.437 1.063T9.5 18m5 0q-.625 0-1.062-.437T13 16.5v-6q0-.625.438-1.062T14.5 9t1.063.438T16 10.5v6q0 .625-.437 1.063T14.5 18m5 0q-.625 0-1.062-.437T18 16.5v-12q0-.625.438-1.062T19.5 3t1.063.438T21 4.5v12q0 .625-.437 1.063T19.5 18"
			></path>
		</svg>
	);
}
