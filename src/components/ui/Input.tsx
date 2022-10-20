interface Props {
	placeholder: string;
	className?: string;
	name: string;
}

export default function Input({ placeholder, className, name }: Props) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			name={name}
			className={`block bg-transparent shadow-sm rounded-md w-full mb-4 py-1 ring-primary-500 ${
				className && className
			}`}
		/>
	);
}
