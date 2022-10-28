import { useState, useRef, useEffect, FormEvent } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import createBoard from "../../api/createBoard";
import useMutateBoard from "../hooks/useMutateBoard";
import useNotify from "../hooks/useNotify";
import { Notification } from "../ui/Index";

export default function CreateBoard() {
	const [showInput, setShowInput] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate, isLoading } = useMutateBoard(createBoard);
	const { notify, showNotify } = useNotify();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (inputRef.current) {
			mutate(
				{ board: inputRef.current.value },
				{
					onSuccess: () => {
						setShowInput(false);
						showNotify();
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

			<Notification notify={notify} color="success">
				board created successfully
			</Notification>

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
