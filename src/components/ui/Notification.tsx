import { createPortal } from "react-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface Props {
	notify: boolean;
	color?: "danger" | "success" | "primary";
	showIcon?: boolean;
	children: React.ReactNode;
}

export default function Notification({
	color = "primary",
	notify,
	showIcon = true,
	children,
}: Props) {
	let bgColor = "";

	switch (color) {
		case "danger":
			bgColor = "bg-red-600";
			break;
		case "success":
			bgColor = "bg-green-600";
			break;
	}

	return createPortal(
		<div
			className={`first-letter:uppercase flex items-center gap-2 w-fit font-semibold text-slate-100 absolute right-0 bottom-0 m-8 py-2 px-4 rounded-md bg-primary-600 transition-all ${bgColor} ${
				notify ? "scale-100 opacity-100" : "scale-0 opacity-0"
			}`}
		>
			{showIcon && <CheckCircleIcon className="w-5 h-5" />}
			<p>{children}</p>
		</div>,
		document.getElementById("notify") as HTMLDivElement
	);
}
