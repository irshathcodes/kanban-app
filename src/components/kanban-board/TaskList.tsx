import { useEffect, useState } from "react";
import { Card, Navbar, Sidebar } from "../ui/Index";
import { useQueries, useQuery } from "@tanstack/react-query";
import getAllTasks from "../../api/getAllTasks";
import getBoards from "../../api/getBoards";
import { v4 as getId } from "uuid";
import { Outlet, useAsyncError, useNavigate } from "react-router-dom";
import { getAllStatus } from "../../helpers/todo-data";
import Todos from "../../models/Todos";

export default function TaskList() {
	const [boardIndex, setBoardIndex] = useState(0);

	const { data: boards } = useQuery(["fetch-boards"], getBoards);
	const { data: tasks, isLoading } = useQuery(
		["fetch-tasks", boards?.[boardIndex]],
		() => getAllTasks(boards?.[boardIndex]),
		{
			enabled: !!boards,
		}
	);

	const navigate = useNavigate();
	const allStatus = getAllStatus(tasks);

	const changeBoard = (index: number) => {
		setBoardIndex(index);
	};

	const handleCardClick = (id: string) => {
		const task = tasks?.filter((task) => task._id === id)[0];

		navigate("/update-task", { state: { task, allStatus } });
	};

	return (
		<>
			<Outlet
				context={{
					board: boards?.[boardIndex],
					status: allStatus,
				}}
			/>
			<div className="grid grid-cols-[270px_1fr] bg-neutral-900">
				<Sidebar
					boards={boards}
					boardIndex={boardIndex}
					changeBoard={changeBoard}
				/>
				<div>
					<Navbar heading={boards && boards[boardIndex]} />
					<main>
						<div className="flex p-6 gap-6">
							{allStatus?.map((status, i) => {
								const filteredTask = tasks?.filter(
									(todo) => todo.status === status
								);

								return (
									<section key={getId()} className="w-72">
										<h3 className="text-slate-400 uppercase text-sm pl-1 font-semibold tracking-wide flex items-center">
											<span className={`circle circle-${i + 1}`}></span>
											<span className="inline-block">
												{status} ({filteredTask?.length || 0})
											</span>
										</h3>

										{filteredTask?.map((task) => (
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
