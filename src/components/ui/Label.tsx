export default function Label(props: { name: string; className?: string }) {
	return (
		<label
			htmlFor={props.name}
			className={`block capitalize text-sm mt-4 mb-2 ${
				props.className ? props.className : ""
			}`}
		>
			{props.name}
		</label>
	);
}
