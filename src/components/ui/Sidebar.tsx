import kanbanLogo from "../../assets/kanban-logo.png";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as getId } from "uuid";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface Props {
	allBoards: string[] | undefined;
	changeBoard: (index: number) => void;
	board: number;
}

export default function Sidebar({
	allBoards,
	board: selectedBoard,
	changeBoard,
}: Props) {
	return (
		<aside className="pr-2  bg-zinc-800 h-screen border border-zinc-800 border-r-gray-500">
			<div className="h-14 pl-6 flex gap-2 items-center">
				<img src={kanbanLogo} alt="kanban logo" width={24} height={24} />
				<h1 className="text-slate-200 font-bold text-2xl">Kanban</h1>
			</div>

			<p className="uppercase pl-6 font-semibold text-slate-400 my-8 tracking-wide text-sm">
				all boards ({allBoards?.length || 0})
			</p>

			<ul className="capitalize font-medium">
				{allBoards?.map((board: string, i) => {
					return (
						<li
							key={getId()}
							className={`cursor-pointer mb-3 pl-6 py-2 rounded-r-full  text-slate-400 text-base ${
								allBoards[selectedBoard] === board && " bg-primary-500 "
							}`}
							onClick={() => changeBoard(i)}
						>
							<a
								className={`flex gap-2 items-center ${
									allBoards[selectedBoard] === board && "text-slate-100"
								}`}
							>
								<RectangleGroupIcon className="w-5 h-5" />
								<span>{board}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
