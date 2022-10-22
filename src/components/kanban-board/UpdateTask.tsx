import { ChangeEvent, FormEvent, useState } from "react";
import { Modal, Select } from "../ui/Index";
import { useLocation } from "react-router-dom";
import Todos from "../../models/Todos";

interface Props {}

export default function UpdateTask() {
	const { task, allStatus } = useLocation().state;
	const {
		todoName: taskName,
		description,
		subTasks: subTasksList,
	} = task as Todos;

	const [subTasks, setSubTasks] = useState(subTasksList);

	const toggleSubTask = (id: string) =>
		setSubTasks(
			subTasks.map((task) =>
				task._id === id ? { ...task, completed: !task.completed } : task
			)
		);
	return (
		<Modal className="py-8">
			<div className="text-slate-200">
				<h1 className="text-2xl font-semibold first-letter:uppercase mb-4">
					{taskName}
				</h1>

				<p className="text-slate-400 mb-4">{description && description}</p>

				<div className="mb-3 ml-1">subtasks</div>
				{subTasks.map(({ _id, subTask, completed }) => {
					return (
						<div
							key={_id}
							className="bg-zinc-900 mb-2 px-2 py-2 rounded text-slate-400 cursor-pointer select-none"
							onClick={() => toggleSubTask(_id)}
						>
							<input
								type="checkbox"
								id={`${subTask}-${_id}`}
								className="mr-4 bg-transparent cursor-pointer"
								checked={completed}
							/>
							<label htmlFor={`${subTask}-${_id}`} className="cursor-pointer">
								{subTask}
							</label>
						</div>
					);
				})}

				<Select values={allStatus}></Select>
			</div>
		</Modal>
	);
}
