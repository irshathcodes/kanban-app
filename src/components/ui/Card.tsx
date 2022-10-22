import { SubTasks } from "../../models/Todos";

interface Props {
	heading: string;
	subTasks: SubTasks[];
	onClick: React.MouseEventHandler<HTMLElement>;
}

export default function Card({ heading, subTasks, onClick }: Props) {
	const completedTask = subTasks.filter(
		(subTask) => subTask.completed === true
	).length;

	return (
		<section
			onClick={onClick}
			className="cursor-pointer bg-zinc-800/50 backdrop-blur-sm w-60 p-4 my-4 rounded-md"
		>
			<h1 className="text-slate-200 pb-2 ">{heading}</h1>
			<p className="text-slate-400">
				{completedTask} of {subTasks.length} substasks
			</p>
		</section>
	);
}
