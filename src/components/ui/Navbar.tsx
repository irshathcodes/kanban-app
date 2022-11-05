import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";

export default function Navbar() {
	const { board } = useParams();

	return (
		<nav className="sticky top-0 z-10 flex min-h-[40px] items-center justify-between gap-2 px-4 py-3 dark:bg-zinc-800">
			<h1 className="text-lg font-semibold capitalize text-slate-100 ">
				{board}
			</h1>
			<div className="flex items-center gap-6">
				<div>
					{board && (
						<Link
							to={`/${board}/create-task`}
							className="flex items-center rounded-full bg-primary-500 px-4 py-1 font-semibold text-slate-300"
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
