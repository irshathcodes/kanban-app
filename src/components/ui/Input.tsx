import { forwardRef } from "react";

interface Props {
	placeholder: string;
	className?: string;
	name: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	value?: string;
	required?: boolean;
}

const Input = forwardRef(
	(
		{ placeholder, className, name, onChange, value, required }: Props,
		ref: React.LegacyRef<HTMLInputElement> | undefined
	) => {
		return (
			<input
				type="text"
				placeholder={placeholder}
				name={name}
				ref={ref}
				className={`block bg-transparent shadow-sm rounded-md w-full mb-4 py-1 ring-primary-500 ${
					className && className
				}`}
				onChange={onChange}
				required={required}
				value={value}
			/>
		);
	}
);

export default Input;
