import { useNavigate, useParams, Link } from "react-router-dom";
import TaskType from "@/models/Tasks";

interface Props {
	task: TaskType;
	allStatus: string[];
}

export default function Task({ task, allStatus }: Props) {
	const { _id, todoName, subTasks } = task;
	const { board } = useParams();

	const completedTask = subTasks.filter(
		(subTask) => subTask.completed === true
	).length;

	return (
		<Link to={`/${board}/update-task`} state={{ task, allStatus }}>
			<section className="my-4 w-60 cursor-pointer rounded-md bg-slate-100 p-4 backdrop-blur-sm dark:bg-zinc-800/50">
				<h1 className="pb-2 text-slate-800  dark:text-slate-200">{todoName}</h1>
				<p className="text-slate-700 shadow-sm dark:text-slate-400">
					{completedTask} of {subTasks.length} substasks
				</p>
			</section>
		</Link>
	);
}
