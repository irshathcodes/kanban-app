import { useState, useEffect, RefObject } from "react";

export default function useOutsideClick<T extends HTMLElement>(
	ref: RefObject<T>,
	callback: (e: MouseEvent) => any
) {
	useEffect(() => {
		const handleMouseClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback(e);
			}
		};
		document.addEventListener("mousedown", handleMouseClick);

		return () => document.removeEventListener("mousedown", handleMouseClick);
	}, [ref]);
}
