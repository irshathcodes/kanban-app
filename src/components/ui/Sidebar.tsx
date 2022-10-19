import kanbanLogo from "../../assets/kanban-logo.png";
import { useQuery } from "@tanstack/react-query";
import { v4 as getId } from "uuid";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";

export default function Sidebar({
	allBoards,
}: {
	allBoards: string[] | undefined;
}) {
	return (
		<aside className="px-2 bg-zinc-800 h-screen border border-zinc-800 border-r-gray-500">
			<div className="h-14 flex gap-2 items-center">
				<img src={kanbanLogo} alt="kanban logo" width={24} height={24} />
				<h1 className="text-slate-200 font-bold text-2xl">Kanban</h1>
			</div>

			<p className="uppercase font-semibold text-slate-400 my-8 tracking-wide text-sm">
				all boards ({allBoards?.length || 0})
			</p>

			<ul className="flex flex-col gap-8 capitalize font-medium">
				{allBoards?.map((board: string) => {
					return (
						<li
							key={getId()}
							className="flex items-center gap-2 text-slate-400"
						>
							<RectangleGroupIcon className="w-5 h-5" />
							<span>{board}</span>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
