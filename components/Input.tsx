export default function Input({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={`shadow-brutal w-2/3 border-2 border-black p-2 px-3 text-sm outline-none placeholder:text-black ${className || ''}`}
			{...props}
		/>
	);
}
