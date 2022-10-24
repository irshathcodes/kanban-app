import kanbanLogo from "../../assets/kanban-logo.png";
import CreateBoard from "../kanban-board/CreateBoard";
import BoardList from "../kanban-board/BoardList";
import { v4 as getId } from "uuid";

interface Props {
	boards: string[] | undefined;
	changeBoard: (index: number) => void;
	boardIndex: number;
	changeParams: (board: string) => void;
}

export default function Sidebar({
	boards,
	boardIndex,
	changeBoard,
	changeParams,
}: Props) {
	return (
		<aside className="pr-2 sticky overflow-y-auto top-0	overflow-x-hidden bg-zinc-800 h-screen border border-zinc-800 border-r-gray-500">
			<div className="h-14 pl-6 flex gap-2 items-center">
				<img src={kanbanLogo} alt="kanban logo" width={24} height={24} />
				<h1 className="text-slate-200 font-bold text-2xl">Kanban</h1>
			</div>

			<p className="uppercase  pl-6 font-semibold text-slate-400 my-8 tracking-wide text-sm">
				all boards ({boards?.length || 0})
			</p>

			<ul className="capitalize font-medium">
				{boards?.map((board, i) => {
					return (
						<BoardList
							board={board}
							boards={boards}
							i={i}
							boardIndex={boardIndex}
							changeBoard={changeBoard}
							key={getId()}
							changeParams={changeParams}
						/>
					);
				})}
			</ul>

			<CreateBoard />
		</aside>
	);
}
