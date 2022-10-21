import { FormEvent, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input, Label, Button, Select, Modal } from "../ui/Index";
import { CreateTask, CreateSubTask } from "../../models/Todos";
import DynamicInput from "./DynamicInput";
import createTask from "../../api/createTask";

export default function CreateTodo() {
	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const { mutate, isLoading, isError } = useMutation(createTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetch-all-todos"]);
			navigate("/");
		},
	});

	const [subTasks, setsubTasks] = useState<CreateSubTask[]>([
		{ subtask: "" },
		{ subtask: "" },
	]);
	const [data, setData] = useState<CreateTask>({
		todoName: "",
		description: "",
		kanbanBoard: "",
	});

	const { board, status } = useOutletContext<{
		board: string;
		status: string[];
	}>();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const createTask = {} as CreateTask;

		createTask.kanbanBoard = board;
		createTask.todoName = data.todoName.trim();
		if (subTasks.length > 0) createTask.subTasks = subTasks;

		if (data.description?.trim())
			createTask.description = data.description.trim();

		mutate(createTask);
	};

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
					onChange={(e) => setData({ ...data, todoName: e.target.value })}
				/>

				<Label name="description" />
				<textarea
					name="description"
					className="bg-transparent rounded-md w-full"
					value={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
				></textarea>

				<Label name="subtasks" />
				<DynamicInput subTasks={subTasks} setsubTasks={setsubTasks} />

				<Button
					className="my-0 mb-2 bg-transparent w-fit text-sm text-slate-300 px-4"
					onClick={() => setsubTasks([...subTasks, { subtask: "" }])}
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
