import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Todos from "../../models/Todos";
import { getAllStatus } from "../../helpers/todo-data";
import { v4 as getId } from "uuid";
import request from "../../helpers/axios-instance";

const subTaskPlaceholders = ["eg: make coffee", "eg: drink coffee and smile"];

interface Subtasks {
	subTask: string;
}

export default function CreateTodo() {
	const navigate = useNavigate();
	const allTodos: Todos[] | undefined = useQueryClient().getQueryData([
		"fetch-all-todos",
	]);
	const status = getAllStatus(allTodos);

	const [inputs, setInputs] = useState<undefined[]>([...Array(2)]);

	const back = () => {
		navigate(-1);
	};

	const removeInput = (index: number) => {
		setInputs(inputs.filter((_, i) => i !== index));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// var data = new FormData(e.target);

		const result = Object.fromEntries(data);

		let formObject = Object.fromEntries(data.entries());

		const dataObj = {
			todoName: "Rap better",
			kanbanBoard: "crypto",
			description: "have to improve rapping",
			subTasks: [{ subTask: "go to studio" }, { subTask: "play guitar" }],
		};

		const subtasks: Subtasks[] = [];
		for (let value in formObject) {
			if (value.startsWith("subtask-")) {
				subtasks.push({ value });
			}
		}

		console.log(subtasks);
		// 	request
		// 		.post("/todo", dataObj)
		// 		.then((data) => console.log(data))
		// 		.catch((err) => console.log({ err, from: "me" }));
	};

	useEffect(() => {
		const handleEscapeEvent = (e: KeyboardEvent) => {
			if (e.code === "Escape") {
				back();
			}
		};
		window.addEventListener("keydown", handleEscapeEvent);

		return () => window.removeEventListener("keydown", handleEscapeEvent);
	}, []);

	return (
		<>
			<div
				className="top-0 left-0 right-0 bottom-0 absolute bg-black/30 z-10"
				onClick={back}
			></div>

			<form
				onSubmit={handleSubmit}
				className="w-[32rem] max-h-[90%] z-20 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 bg-zinc-800/60 backdrop-blur-md rounded-lg text-slate-200 px-8 py-4 overflow-auto"
			>
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold capitalize">add new task</h2>
					<button onClick={back}>
						<XMarkIcon className="w-7 h-7" />
					</button>
				</div>
				<Label name="title" />
				<Input placeholder="eg: take coffee break" name="todoName" />

				<Label name="description" />
				<textarea className="bg-transparent rounded-md w-full"></textarea>
				<Label name="subtasks" />
				{inputs.map((_, i) => {
					return (
						<div key={getId()} className="flex  gap-2 items-center mb-4">
							<Input
								placeholder={subTaskPlaceholders[i]}
								className="mb-0"
								name={`subtask-${i}`}
							/>
							<button onClick={() => removeInput(i)}>
								<XMarkIcon className="w-5 h-5 text-slate-400" />
							</button>
						</div>
					);
				})}

				<Button
					className="my-0 mb-2 bg-transparent w-fit text-sm text-slate-300 px-4"
					onClick={() => setInputs([...Array(inputs.length + 1)])}
				>
					Add more tasks
				</Button>

				<Label name="status" />
				<Select values={status} disabled={true} styles="cursor-not-allowed" />
				<Button type="submit" className="rounded-full py-2">
					Create Task
				</Button>
			</form>
		</>
	);
}
