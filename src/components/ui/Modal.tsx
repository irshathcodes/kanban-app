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
		navigate(-1);
	};

	useEffect(() => {
		if (escape) {
			back();
		}
	}, [escape]);

	return (
		<>
			<div
				className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/30"
				onClick={back}
			></div>

			<div
				className={`fixed  top-4 z-50 m-2  max-h-[90%] w-[95%] overflow-auto rounded-lg bg-zinc-800 p-6  sm:top-1/2  sm:left-1/2 sm:w-[30rem] sm:-translate-x-2/4 sm:-translate-y-1/2 sm:p-8 ${
					className ? className : ""
				}`}
			>
				{children}
			</div>
		</>
	);
}
