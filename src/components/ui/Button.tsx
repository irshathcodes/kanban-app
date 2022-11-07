import React from "react";
import Loader from "@/components/ui/Loader";

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
			className={`my-8 mb-4 flex w-full items-center justify-center rounded bg-primary-600 py-2  font-semibold capitalize text-slate-100 ring-primary-100 transition-all duration-300  focus:outline-slate-600 focus:ring-2 sm:hover:bg-opacity-80 ${className}`}
			{...rest}
		>
			{loader && <Loader />}
			{props.children}
		</button>
	);
}
