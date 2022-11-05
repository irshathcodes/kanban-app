import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input, Label, Button, Select, Modal } from "../ui/Index";
import { CreateTaskReq, CreateSubTask } from "../../models/Todos";
import createTask from "../../api/createTask";
import SubTaskInput from "./SubTaskInput";
import useMutateTask from "../hooks/useMutateTask";
import { useParams } from "react-router-dom";
import useNotify from "../hooks/useNotify";

export default function CreateTask() {
	const navigate = useNavigate();
	const { notify, showNotify } = useNotify();

	const { board } = useParams();
	const { status } = useOutletContext<{
		status: string[];
	}>();

	const { mutate, isLoading, isError } = useMutateTask(createTask);

	const [subTasks, setsubTasks] = useState<CreateSubTask[]>([
		{ subTask: "" },
		{ subTask: "" },
	]);

	const [data, setData] = useState<CreateTaskReq>({
		todoName: "",
		description: "",
		kanbanBoard: "",
	});
	const [error, setError] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const createTask = {} as CreateTaskReq;
		if (board) {
			createTask.kanbanBoard = board;
		}

		createTask.todoName = data.todoName.trim();

		const enteredSubTasks = subTasks.filter(
			(item) => item.subTask.trim().length > 0
		);

		if (enteredSubTasks.length === 0) {
			setError("please enter atleast one subtask to create a task");
			showNotify();
			return;
		}

		createTask.subTasks = enteredSubTasks;
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
					<XMarkIcon
						className="h-7 w-7 cursor-pointer"
						onClick={() => navigate(-1)}
					/>
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
					className="w-full rounded-md bg-transparent"
					value={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
				></textarea>

				<Label name="subtasks" />
				<SubTaskInput subTasks={subTasks} setsubTasks={setsubTasks} />

				<Button
					className="!my-0 mb-2 w-fit !bg-transparent px-4 text-sm text-slate-300"
					onClick={() => setsubTasks([...subTasks, { subTask: "" }])}
				>
					Add more tasks
				</Button>

				<Label name="status" />
				<Select values={status} disabled={true} styles="cursor-not-allowed" />
				{notify && <p className="text-bold mt-4 text-red-600">{error}</p>}

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
