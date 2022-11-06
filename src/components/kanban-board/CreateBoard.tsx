import { useState, useRef, useEffect, FormEvent } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import createBoard from "../../api/createBoard";
import useMutateBoard from "../hooks/useMutateBoard";
import useNotify from "../hooks/useNotify";
import { Notification } from "../ui/Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateBoard() {
	const [showInput, setShowInput] = useState(false);
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate, isLoading } = useMutateBoard(createBoard);
	const { notify, showNotify } = useNotify();

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (inputRef.current) {
			mutate(
				{ board: inputRef.current.value },
				{
					onSuccess: (res) => {
						setShowInput(false);
						setError("");
						showNotify();
						navigate(`/${res.data.kanbanBoard.board}`);
					},
					onError: (err) => {
						if (axios.isAxiosError(err)) {
							if (err.response?.data) {
								setError(err.response.data.msg);
								showNotify();
							}
						}
					},
				}
			);
		}
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
					className="mx-2 flex items-center gap-2 text-slate-400"
				>
					<input
						type="text"
						className="w-full rounded-md border-slate-400 bg-transparent py-1  capitalize  text-slate-800 focus:outline-none dark:text-slate-200"
						style={{ cursor: isLoading ? "not-allowed" : "text" }}
						ref={inputRef}
						required={true}
						disabled={isLoading}
					/>
					<button
						type="submit"
						className=" rounded-md border-2 border-slate-400 p-1 focus:border-primary-500 dark:border-zinc-600 dark:focus:border-primary-500"
					>
						<CheckIcon className="h-5 w-5" />
					</button>
				</form>
			)}

			<Notification
				notify={notify}
				showIcon={error ? false : true}
				color={error ? "danger" : "success"}
			>
				{error ? error : "board created successfully"}
			</Notification>

			<button
				type="button"
				onClick={() => setShowInput(!showInput)}
				className="my-3 pl-6 text-primary-600 dark:text-primary-500/80"
			>
				<div className="flex items-center  font-medium">
					{!showInput && <PlusIcon className="h-4 w-4" />}
					{showInput ? "Cancel" : "Create new board"}
				</div>
			</button>
		</>
	);
}
