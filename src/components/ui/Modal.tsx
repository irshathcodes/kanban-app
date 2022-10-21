import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	const back = () => {
		navigate(-1);
	};

	useEffect(() => {
		const handleEscapeEvent = (e: KeyboardEvent) => {
			if (e.code === "Escape") {
				back();
			}
		};
		window.addEventListener("keydown", handleEscapeEvent);

		return () => window.removeEventListener("keydown", handleEscapeEvent);
	}, []);
	return (
		<>
			<div
				className="top-0 left-0 right-0 bottom-0 fixed bg-black/30 z-10"
				onClick={back}
			></div>

			<div className="w-[32rem] fixed max-h-[90%] z-50 top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 bg-zinc-800  rounded-lg  px-8 py-4 overflow-auto">
				{children}
			</div>
		</>
	);
}
