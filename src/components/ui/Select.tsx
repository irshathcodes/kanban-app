import { ChangeEvent } from "react";

interface Props {
	values: string[];
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
	[x: string]: any;
}

export default function Select(props: Props) {
	return (
		<select
			className={`bg-transparent rounded-md  w-full py-1 ${
				props.styles && props.styles
			}`}
			{...props}
			onChange={props.onChange}
		>
			{props.values.map((value) => {
				return (
					<option
						value={value}
						key={value}
						className={`bg-zinc-800 capitalize`}
					>
						{value}
					</option>
				);
			})}
		</select>
	);
}
