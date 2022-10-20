import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Navbar({
	heading = "",
}: {
	heading: string | undefined;
}) {
	return (
		<nav className="flex justify-between items-center gap-2 px-4 py-3 dark:bg-zinc-800">
			<h1 className="text-slate-100 font-semibold text-lg">{heading}</h1>
			<div className="flex gap-6 items-center">
				<Link to="/login">
					<button type="button" className="inline font-semibold text-slate-400">
						Login
					</button>
				</Link>
				<div>
					<Link
						to="/create"
						className="bg-primary-500 px-4 py-1 rounded-full text-slate-300 font-semibold flex items-center"
					>
						<PlusIcon className="h-5 w-5" />
						<span>Add new task</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}
