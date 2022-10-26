import { createPortal } from "react-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface Props {
	notify: boolean;
	color?: "danger" | "success" | "primary";
	children: React.ReactNode;
}

export default function Notification(props: Props) {
	let color = "";

	switch (props.color) {
		case "danger":
			color = "bg-red-600";
			break;
		case "success":
			color = "bg-green-600";
			break;
		default:
			color = "bg-primary-600";
	}

	return createPortal(
		<div
			className={`first-letter:uppercase flex items-center gap-2 w-fit font-semibold text-slate-100 absolute right-0 bottom-0 m-8 py-2 px-4 rounded-md bg-primary-600 transition-all ${color} ${
				props.notify ? "scale-100 opacity-100" : "scale-0 opacity-0"
			}`}
		>
			<CheckCircleIcon className="w-5 h-5" />
			<p>{props.children}</p>
		</div>,
		document.getElementById("notify") as HTMLDivElement
	);
}
