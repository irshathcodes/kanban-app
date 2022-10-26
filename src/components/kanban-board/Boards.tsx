import { useQuery } from "@tanstack/react-query";
import getBoards from "../../api/getBoards";
import { v4 as getId } from "uuid";
import Sidebar from "../ui/Sidebar";
import BoardList from "./BoardList";
import CreateBoard from "./CreateBoard";

export default function Boards() {
	const { data: boards } = useQuery(["fetch-boards"], getBoards, {
		cacheTime: Infinity,
		staleTime: Infinity,
	});

	return (
		<>
			<Sidebar>
				<p className="uppercase  pl-6 font-semibold text-slate-400 my-8 tracking-wide text-sm">
					all boards ({boards?.length || 0})
				</p>
				<ul className="capitalize font-medium">
					{boards?.map((board) => {
						return <BoardList board={board} key={getId()} />;
					})}
				</ul>

				<CreateBoard />
			</Sidebar>
		</>
	);
}
