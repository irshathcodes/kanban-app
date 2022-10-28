import Loader from "../ui/Loader";

interface Props {
	loader?: boolean;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	className?: string;
}
export default function Button({
	children,
	type = "button",
	loader,
	onClick,
	className,
}: Props) {
	return (
		<button
			type={type}
			className={`my-8 w-full rounded bg-primary-600 py-2 mb-4 font-semibold text-slate-100 capitalize ring-primary-100 focus:outline-primary-100 focus:ring-2 flex items-center justify-center ${
				className ? className : ""
			}`}
			onClick={onClick}
		>
			{loader && <Loader />}
			{children}
		</button>
	);
}
