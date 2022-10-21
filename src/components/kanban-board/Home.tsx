import { useState } from "react";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";
import { useQuery } from "@tanstack/react-query";
import getAllTodos from "../../api/getAllTodos";
import { v4 as getId } from "uuid";
import Todos from "../../models/Todos";
import { Outlet } from "react-router-dom";
import { getAllBoards, getAllStatus } from "../../helpers/todo-data";

export default function Home() {
	const [board, setBoard] = useState(0);
	const { data: allTodos, isLoading } = useQuery(
		["fetch-all-todos"],
		() => getAllTodos(),
		{}
	);

	const allStatus = getAllStatus(allTodos);
	const allBoards = getAllBoards(allTodos);

	const filteredTodo = allTodos?.filter(
		(todo) => todo.kanbanBoard === allBoards[board]
	);

	const changeBoard = (index: number) => {
		setBoard(index);
	};

	return (
		<>
			<Outlet
				context={{
					board: (allBoards && allBoards[board]) || 0,
					status: allStatus,
				}}
			/>
			<div className="grid grid-cols-[270px_1fr] bg-neutral-900">
				<Sidebar
					allBoards={allBoards}
					board={board}
					changeBoard={changeBoard}
				/>
				<div>
					<Navbar heading={allBoards && allBoards[board]} />
					<main>
						<div className="flex p-6 gap-6">
							{allStatus?.map((status, i) => {
								const data = filteredTodo?.filter(
									(todo) => todo.status === status
								);

								return (
									<section key={getId()} className="w-72">
										<h3 className="text-slate-400 uppercase text-sm pl-1 font-semibold tracking-wide flex items-center">
											<span className={`circle circle-${i + 1}`}></span>
											<span className="inline-block">
												{status} ({data?.length || 0})
											</span>
										</h3>

										{data?.map((item) => (
											<Card key={item._id} heading={item.todoName} />
										))}
									</section>
								);
							})}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
