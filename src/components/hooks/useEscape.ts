import { useEffect, useState } from "react";

export default function useEscape() {
	const [close, setClose] = useState(false);

	useEffect(() => {
		const handleEscapeEvent = (e: KeyboardEvent) => {
			if (e.code === "Escape") {
				setClose(true);
			}
		};
		window.addEventListener("keydown", handleEscapeEvent);

		return () => window.removeEventListener("keydown", handleEscapeEvent);
	}, []);

	return close;
}
