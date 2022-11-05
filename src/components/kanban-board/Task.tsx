import { useLocation, useNavigate, useParams } from "react-router-dom";
import Todos, { SubTasks } from "../../models/Todos";

interface Props {
	task: Todos;
	allStatus: string[];
}

export default function Task({ task, allStatus }: Props) {
	const { _id, todoName, subTasks } = task;

	const navigate = useNavigate();
	const { board } = useParams();

	const completedTask = subTasks.filter(
		(subTask) => subTask.completed === true
	).length;

	const handleClick = (id: string) => {
		navigate(`/${board}/update-task`, {
			state: { task, allStatus },
		});
	};

	return (
		<section
			onClick={() => handleClick(_id)}
			className="my-4 w-60 cursor-pointer rounded-md bg-zinc-800/50 p-4 backdrop-blur-sm"
		>
			<h1 className="pb-2 text-slate-200 ">{todoName}</h1>
			<p className="text-slate-400">
				{completedTask} of {subTasks.length} substasks
			</p>
		</section>
	);
}
