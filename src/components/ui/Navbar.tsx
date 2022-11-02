import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";

export default function Navbar() {
	const { board } = useParams();

	return (
		<nav className="flex min-h-[40px] sticky top-0 z-10 justify-between items-center gap-2 px-4 py-3 dark:bg-zinc-800">
			<h1 className="text-slate-100 font-semibold text-lg capitalize ">
				{board}
			</h1>
			<div className="flex gap-6 items-center">
				<div>
					{board && (
						<Link
							to={`/${board}/create-task`}
							className="flex items-center bg-primary-500 px-4 py-1 rounded-full text-slate-300 font-semibold"
						>
							<PlusIcon className="h-5 w-5" />
							<span>Add new task</span>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
