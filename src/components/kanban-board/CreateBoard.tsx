import { useState, useRef, useEffect, FormEvent } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import Loader from "../ui/Loader";
import createTask from "../../api/createTask";
import { CreateTask } from "../../models/Todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateBoard() {
	const [showInput, setShowInput] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { mutate, isLoading } = useMutation(createTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetch-all-todos"]);
			setShowInput(false);
		},
	});
	const queryClient = useQueryClient();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const task = {} as CreateTask;

		if (inputRef.current) {
			task.kanbanBoard = inputRef.current.value;
		}

		mutate(task);
	};

	useEffect(() => {
		if (showInput) {
			inputRef.current?.focus();
		}
	}, [showInput]);
	return (
		<>
			{showInput && (
				<form
					onSubmit={handleSubmit}
					className="flex items-center text-slate-400 gap-2 mx-2"
				>
					<input
						type="text"
						className="bg-transparent py-1 rounded-md capitalize  focus:outline-none  w-full text-slate-200"
						style={{ cursor: isLoading ? "not-allowed" : "text" }}
						ref={inputRef}
						required={true}
						disabled={isLoading}
					/>
					<button
						type="submit"
						className=" active:border-primary-500 border-2 p-1 border-zinc-600 rounded-md"
					>
						<CheckIcon className="w-5 h-5" />
					</button>
				</form>
			)}

			<button
				type="button"
				onClick={() => setShowInput(!showInput)}
				className="pl-6 my-3 text-primary-500/80"
			>
				<div className="flex items-center  font-medium">
					{!showInput && <PlusIcon className="w-4 h-4" />}
					{showInput ? "Cancel" : "Create new board"}
				</div>
			</button>
		</>
	);
}
