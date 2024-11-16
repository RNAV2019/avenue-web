type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className: string;
	hover?: string;
	showcase?: boolean;
	colour:
		| 'bg-slate-500'
		| 'bg-red-500'
		| 'bg-orange-500'
		| 'bg-amber-500'
		| 'bg-yellow-500'
		| 'bg-lime-500'
		| 'bg-green-500'
		| 'bg-emerald-500'
		| 'bg-teal-500'
		| 'bg-cyan-500'
		| 'bg-sky-500'
		| 'bg-blue-500'
		| 'bg-indigo-500'
		| 'bg-violet-500'
		| 'bg-purple-500'
		| 'bg-fuchsia-500'
		| 'bg-pink-500'
		| 'bg-rose-500';
	children: React.ReactNode;
};

export default function Button({
	className,
	children,
	colour,
	hover,
	showcase,
	...props
}: ButtonProps) {
	return (
		<button
			className={`group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring ${className}`}
			type="button"
			{...props}
		>
			<span
				className={`absolute inset-0 translate-x-1 translate-y-1 bg-black transition-transform ${showcase ? '' : 'group-hover:translate-x-0 group-hover:translate-y-0'} ${className}`}
			/>

			<span className={`relative block border-2 border-current ${colour} ${className} ${hover}`}>
				<div className="grainy flex h-full w-full items-center justify-center text-slate-100">
					{children}
				</div>
			</span>
		</button>
	);
}
