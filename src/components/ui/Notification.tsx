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
			className={`absolute right-0 bottom-0 z-[100] m-8 flex w-fit items-center gap-2 rounded-md bg-primary-600 py-2 px-4 font-semibold text-slate-100 transition-all first-letter:uppercase ${bgColor} ${
				notify ? "scale-100 opacity-100" : "scale-0 opacity-0"
			}`}
		>
			{showIcon && <CheckCircleIcon className="h-5 w-5" />}
			<p>{children}</p>
		</div>,
		document.getElementById("notify") as HTMLDivElement
	);
}
