import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input, Label, Button, Select, Modal } from "../ui/Index";
import { CreateTask, CreateSubTask } from "../../models/Todos";
import createTask from "../../api/createTask";
import SubTaskInput from "./SubTaskInput";
import useMutateTask from "../hooks/useMutateTask";

export default function CreateTodo() {
	const navigate = useNavigate();

	const { board, status } = useOutletContext<{
		board: string;
		status: string[];
	}>();

	const { mutate, isLoading, isError } = useMutateTask(createTask, {
		invalidateQueries: ["fetch-tasks", board],
	});

	const [subTasks, setsubTasks] = useState<CreateSubTask[]>([
		{ subTask: "" },
		{ subTask: "" },
	]);
	const titleRef = useRef<HTMLInputElement>(null);

	const [data, setData] = useState<CreateTask>({
		todoName: "",
		description: "",
		kanbanBoard: "",
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const createTask = {} as CreateTask;
		createTask.kanbanBoard = board;

		createTask.todoName = data.todoName.trim();

		const enteredSubTasks = subTasks.filter(
			(item) => item.subTask.trim().length > 0
		);

		if (enteredSubTasks.length > 0) createTask.subTasks = enteredSubTasks;
		if (data.description?.trim())
			createTask.description = data.description.trim();

		mutate(createTask);
	};

	useEffect(() => {
		titleRef.current?.focus();
	}, []);
	return (
		<Modal>
			<form onSubmit={handleSubmit} className="text-slate-200">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold capitalize">add new task</h2>
					<button onClick={() => navigate(-1)}>
						<XMarkIcon className="w-7 h-7" />
					</button>
				</div>

				<Label name="title" />
				<Input
					placeholder="eg: take coffee break"
					name="todoName"
					value={data.todoName}
					ref={titleRef}
					onChange={(e) => setData({ ...data, todoName: e.target.value })}
					required={true}
				/>

				<Label name="description" />
				<textarea
					name="description"
					className="bg-transparent rounded-md w-full"
					value={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
				></textarea>

				<Label name="subtasks" />
				<SubTaskInput subTasks={subTasks} setsubTasks={setsubTasks} />

				<Button
					className="!my-0 mb-2 w-fit text-sm text-slate-300 px-4 !bg-transparent"
					onClick={() => setsubTasks([...subTasks, { subTask: "" }])}
				>
					Add more tasks
				</Button>

				<Label name="status" />
				<Select values={status} disabled={true} styles="cursor-not-allowed" />
				<Button type="submit" loader={isLoading} className="rounded-full py-2">
					{isLoading
						? "Creating..."
						: isError
						? "Error! please try again"
						: "Create Task"}
				</Button>
			</form>
		</Modal>
	);
}
