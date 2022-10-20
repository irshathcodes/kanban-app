import { PropsWithChildren } from "react";

export default function Label(props: { name: string }) {
	return (
		<label htmlFor={props.name} className="block capitalize text-sm mt-4 mb-2">
			{props.name}
		</label>
	);
}
