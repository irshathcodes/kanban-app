import { useState } from "react";
import { Card, Navbar, Sidebar } from "../ui/Index";
import { useQueries } from "@tanstack/react-query";
import getAllTasks from "../../api/getAllTasks";
import getAllBoards from "../../api/getAllBoards";
import { v4 as getId } from "uuid";
import { Outlet, useNavigate } from "react-router-dom";
import { getAllStatus } from "../../helpers/todo-data";

export default function TaskList() {
	const [board, setBoard] = useState(0);
	const navigate = useNavigate();

	const { data: allTodos, isLoading } = useQuery(
		["fetch-tasks"],
		() => getAllTasks(),
		{}
	);

	const {} = useQueries({
		queries: [
			{ queryKey: ["fetch-tasks"], queryFn: getAllTasks },
			{ queryKey: ["fetch-boards"], queryFn: getAllBoards },
		],
	});

	const allStatus = getAllStatus(allTodos);
	const allBoards = getAllBoards(allTodos);

	const filteredTodo = allTodos?.filter(
		(todo) => todo.kanbanBoard === allBoards[board]
	);

	const changeBoard = (index: number) => {
		setBoard(index);
	};

	const handleCardClick = (id: string) => {
		const task = allTodos?.filter((task) => task._id === id)[0];

		navigate("/update-task", { state: { task, allStatus } });
	};

	return (
		<>
			<Outlet
				context={{
					board: allBoards && allBoards[board],
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
								const tasks = filteredTodo?.filter(
									(todo) => todo.status === status
								);

								return (
									<section key={getId()} className="w-72">
										<h3 className="text-slate-400 uppercase text-sm pl-1 font-semibold tracking-wide flex items-center">
											<span className={`circle circle-${i + 1}`}></span>
											<span className="inline-block">
												{status} ({tasks?.length || 0})
											</span>
										</h3>

										{tasks?.map((task) => (
											<Card
												heading={task.todoName}
												subTasks={task.subTasks}
												onClick={() => handleCardClick(task._id)}
												key={task._id}
											/>
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
