import { useQuery } from "@tanstack/react-query";
import getBoards from "@/api/board/getBoards";
import { v4 as getId } from "uuid";
import BoardList from "@/components/board/BoardList";
import CreateBoard from "@/components/board/CreateBoard";

export default function Boards() {
	const { data: boards } = useQuery(["fetch-boards"], getBoards, {
		cacheTime: Infinity,
		staleTime: Infinity,
	});

	return (
		<div className="overflow-y-auto overflow-x-hidden">
			<p className="my-8  pl-6 text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">
				all boards ({boards?.length || 0})
			</p>
			{boards && boards.length > 0 ? (
				<ul className="font-medium capitalize ">
					{boards?.map((board) => {
						return <BoardList board={board} boards={boards} key={getId()} />;
					})}
				</ul>
			) : (
				<p className="mb-2 pl-6 text-sm text-slate-700 dark:text-slate-400">
					start creating boards to add your tasks{" "}
					<span className="text-base">👇</span>
				</p>
			)}

			<CreateBoard />
		</div>
	);
}
