import { useState, useEffect } from "react";

export default function useNotify() {
	const [notify, setNotify] = useState(false);

	const showNotify = () => {
		setNotify(true);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setNotify(false);
		}, 4000);

		return () => {
			clearTimeout(timeout);
		};
	}, [notify]);

	return {
		notify,
		showNotify,
	};
}
