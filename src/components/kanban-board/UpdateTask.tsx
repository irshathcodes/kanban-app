import { FormEvent, useEffect, useState } from "react";
import { Button, Label, Modal, Select } from "../ui/Index";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import Todos from "../../models/Todos";
import updateTask from "../../api/updateTask";
import useMutateTask from "../hooks/useMutateTask";
import deleteTask from "../../api/deleteTask";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface State {
	task: Todos;
	allStatus: string[];
}

export default function UpdateTask() {
	const { task, allStatus } = useLocation().state as State;

	const {
		_id,
		todoName: taskName,
		description,
		status: currentStatus,
		subTasks: subTasksList,
		kanbanBoard: board,
	} = task;

	const [subTasks, setSubTasks] = useState(subTasksList);
	const [status, setStatus] = useState(currentStatus);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const { mutate, isLoading, isError } = useMutateTask(updateTask);
	const {
		mutate: deleteMutate,
		isLoading: isDeleting,
		isError: isDeleteError,
	} = useMutateTask(deleteTask);

	if (isError) {
		setError("something went wrong, please try again later");
	}

	const completedTask = subTasks.filter(
		(task) => task.completed === true
	).length;

	const handleSubTaskChange = (id: string) => {
		setSubTasks(
			subTasks.map((task) =>
				task._id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ id: _id, data: { status, subTasks } });
	};

	useEffect(() => {
		if (completedTask === 0) {
			setStatus("todo");
			return;
		} else if (completedTask !== subTasks.length) setStatus("doing");
		else if (completedTask === subTasks.length) setStatus("done");
	}, [completedTask]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setError("");
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [error]);

	return (
		<Modal className="p-8 text-slate-800 dark:text-slate-200">
			<form onSubmit={handleSubmit}>
				<div className="mb-4 flex items-center justify-between">
					<h1 className=" text-2xl font-semibold first-letter:uppercase">
						{taskName}
					</h1>
					<XMarkIcon
						className="h-7 w-7 cursor-pointer"
						onClick={() => navigate(-1)}
					/>
				</div>
				<p className="mb-4 text-slate-700 dark:text-slate-400">
					{description ? description : "no description"}
				</p>

				<div className="mt-8 mb-3 ">
					Subtasks ({completedTask} of {subTasks.length})
				</div>
				{subTasks.map(({ _id, subTask, completed }) => {
					return (
						<label
							htmlFor={`${subTask}-${_id}`}
							key={_id}
							className={`mb-2 flex w-full cursor-pointer select-none items-center rounded bg-slate-100 py-2 px-4 dark:bg-zinc-900 dark:text-slate-400 ${
								completed ? "line-through" : ""
							} `}
						>
							<input
								type="checkbox"
								id={`${subTask}-${_id}`}
								className="mr-3 cursor-pointer bg-transparent"
								checked={completed}
								onChange={() => handleSubTaskChange(_id)}
							/>
							<span>{subTask}</span>
						</label>
					);
				})}

				<Label name="Status" className="mt-8 text-base" />
				<Select
					values={allStatus}
					value={status}
					onChange={(e) => setStatus(e.currentTarget.value)}
					disabled={allStatus.length < 4}
					style={{ cursor: allStatus.length < 4 ? "not-allowed" : "pointer" }}
				/>

				<div>
					<Button type="submit" loader={isLoading} className="mb-1">
						Update Task
					</Button>

					<Button
						onClick={() => deleteMutate(_id)}
						loader={isDeleting}
						className="mt-0 !bg-transparent text-red-500/90 transition-all hover:text-red-500/70 hover:text-red-500"
					>
						Delete Task
					</Button>
				</div>
			</form>
			<p className="text-center font-medium text-red-500">{error && error}</p>
		</Modal>
	);
}
