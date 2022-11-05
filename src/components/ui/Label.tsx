export default function Label(props: { name: string; className?: string }) {
	return (
		<label
			htmlFor={props.name}
			className={`mt-4 mb-2 block text-sm capitalize ${
				props.className ? props.className : ""
			}`}
		>
			{props.name}
		</label>
	);
}
