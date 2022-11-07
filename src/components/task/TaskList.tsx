import { useQuery } from "@tanstack/react-query";
import { v4 as getId } from "uuid";
import { Outlet, useParams } from "react-router-dom";
import Task from "@/components/task/Task";
import getAllTasks from "@/api/task/getAllTasks";
import { getAllStatus } from "@/helpers/get-status";

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

			<main className="mr-4 h-[calc(100vh-60px)] overflow-x-auto bg-slate-200 transition-colors dark:bg-neutral-900  md:h-auto">
				<div className="flex  gap-6 p-6">
					{allStatus?.map((status, i) => {
						const filteredTask = tasks?.filter(
							(todo) => todo.status === status
						);
						return (
							<section key={getId()} className="w-60">
								<h3 className="flex  items-center pl-1 text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">
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
