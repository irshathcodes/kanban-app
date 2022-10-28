import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import deleteBoard from "../../api/deleteBoard";
import useMutateBoard from "../hooks/useMutateBoard";
import { Loader } from "../ui/Index";

interface Props {
	board: string;
	boards: string[];
}

export default function BoardList({ board, boards }: Props) {
	const [hover, setHover] = useState(false);
	const { mutate, isLoading } = useMutateBoard(deleteBoard);
	const navigate = useNavigate();

	const handleDelete = (board: string) => {
		mutate(board, {
			onSuccess: () => {
				if (boards.length === 1) {
					navigate("/");
					return;
				} else {
					navigate(`/${boards[0]}`);
				}
			},
		});
	};

	return (
		<NavLink to={`/${board}`}>
			{({ isActive }) => (
				<li
					className={`cursor-pointer mb-3 px-4 py-2 transition-all  rounded-r-full text-base ${
						isActive && " bg-primary-500"
					}`}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<div
						className={`flex justify-between items-center ${
							isActive ? "text-slate-100" : "text-slate-400"
						}`}
					>
						<div className="flex items-center gap-2">
							<RectangleGroupIcon className="w-5 h-5 " />
							<span>{board}</span>
						</div>

						<button
							className={`transition-all duration-200 opacity-0  ${
								hover
									? "translate-x-0 opacity-100 text-slate-100"
									: "translate-x-[100%]"
							}`}
							disabled={isLoading}
							style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
							onClick={() => handleDelete(board)}
						>
							{isLoading ? <Loader /> : <TrashIcon className="w-5 h-5" />}
						</button>
					</div>
				</li>
			)}
		</NavLink>
	);
}
