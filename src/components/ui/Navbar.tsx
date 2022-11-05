import { PlusIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import KanbanLogo from "../../assets/KanbanLogo";
import useAppContext from "../hooks/useAppContext";

export default function Navbar() {
	const { board } = useParams();
	const { showBoard, setShowBoard } = useAppContext();

	return (
		<nav className="sticky top-0 z-10 flex min-h-[40px] items-center justify-between gap-2 px-4 py-3 dark:bg-zinc-800">
			<button type="button" onClick={() => setShowBoard(!showBoard)}>
				<h1 className="flex items-center   text-lg font-semibold capitalize text-slate-100 ">
					<KanbanLogo className="mr-1 sm:hidden" />
					<span>{board ? board : "Add a board"}</span>
					<ChevronRightIcon
						className={`mr-1 h-4 w-4 transition-transform sm:hidden ${
							showBoard ? "rotate-[180deg]" : "rotate-0"
						}`}
					/>
				</h1>
			</button>
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
