import React from "react";
import Loader from "../ui/Loader";

interface Props {
	loader?: boolean;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
}
export default function Button(
	props: React.ButtonHTMLAttributes<HTMLButtonElement> & Props
) {
	const { className = "", loader, children, type = "button", ...rest } = props;
	return (
		<button
			type={type}
			className={`my-8 w-full rounded bg-primary-600 py-2 mb-4 font-semibold text-slate-100 capitalize ring-primary-100 focus:outline-primary-100 focus:ring-2 flex items-center justify-center ${className}`}
			{...rest}
		>
			{loader && <Loader />}
			{props.children}
		</button>
	);
}
