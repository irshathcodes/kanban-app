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
				className={`mb-4 block w-full rounded-md bg-transparent py-1 shadow-sm ring-primary-500 ${
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
