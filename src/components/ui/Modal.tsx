import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useEscape from "../hooks/useEscape";

export default function Modal({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const navigate = useNavigate();
	const escape = useEscape();

	const back = () => {
		navigate("/");
	};

	useEffect(() => {
		if (escape) {
			back();
		}
	}, [escape]);

	return (
		<>
			<div
				className="top-0 left-0 right-0 bottom-0 fixed bg-black/30 z-10"
				onClick={back}
			></div>

			<div
				className={`w-[32rem] fixed max-h-[90%] z-50 top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 bg-zinc-800  rounded-lg  px-8 py-4 overflow-auto ${
					className ? className : ""
				}`}
			>
				{children}
			</div>
		</>
	);
}
