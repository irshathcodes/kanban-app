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
			className={`my-8 mb-4 flex w-full items-center justify-center rounded bg-primary-600 py-2 font-semibold capitalize text-slate-100 ring-primary-100 focus:outline-primary-100 focus:ring-2 ${className}`}
			{...rest}
		>
			{loader && <Loader />}
			{props.children}
		</button>
	);
}
