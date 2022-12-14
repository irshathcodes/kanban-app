import { PlusIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import KanbanLogo from "@/assets/KanbanLogo";
import useAppContext from "@/hooks/useAppContext";

export default function Navbar() {
	const { board } = useParams();
	const { showSidebar, setShowSidebar } = useAppContext();

	return (
		<nav className="sticky top-0 z-10 flex min-h-[40px] items-center  justify-between gap-2 bg-slate-100 px-4 py-3 transition-colors dark:bg-zinc-800">
			<button type="button" onClick={() => setShowSidebar(!showSidebar)}>
				<h1 className="flex items-center   text-lg font-semibold capitalize text-slate-800 dark:text-slate-100">
					<KanbanLogo className="mr-1 md:hidden" />
					<span>{board ? board : "Add a board"}</span>
					<ChevronRightIcon
						className={`mr-1 h-4 w-4 transition-transform md:hidden ${
							showSidebar ? "rotate-[180deg]" : "rotate-0"
						}`}
					/>
				</h1>
			</button>
			<div className="flex items-center gap-6">
				<div>
					{board && (
						<Link
							to={`/${board}/create-task`}
							className="  flex items-center rounded-full bg-primary-500 px-4 py-1 font-semibold text-slate-100 dark:text-slate-300"
						>
							<PlusIcon className="h-5 w-5" />
							<span className="hidden xs:block">Add new task</span>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
