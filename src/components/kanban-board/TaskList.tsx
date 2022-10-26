import { Navbar } from "../ui/Index";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import getAllTasks from "../../api/getAllTasks";
import { v4 as getId } from "uuid";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getAllStatus } from "../../helpers/todo-data";
import Boards from "./Boards";

export default function TaskList() {
	const { board } = useParams();
	const { data: tasks, isLoading } = useQuery(
		["fetch-tasks", board],
		() => getAllTasks(board),
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		}
	);

	const allStatus = getAllStatus(tasks);

	return (
		<>
			<Outlet
				context={{
					status: allStatus,
				}}
			/>

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
									<Task task={task} key={task._id} allStatus={allStatus} />
								))}
							</section>
						);
					})}
				</div>
			</main>
		</>
	);
}
