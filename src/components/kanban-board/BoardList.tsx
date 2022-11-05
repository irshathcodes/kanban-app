import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import deleteBoard from "../../api/deleteBoard";
import useAppContext from "../hooks/useAppContext";
import useMutateBoard from "../hooks/useMutateBoard";
import { Loader } from "../ui/Index";

interface Props {
	board: string;
	boards: string[];
}

export default function BoardList({ board, boards }: Props) {
	const { setShowBoard } = useAppContext();
	const [hover, setHover] = useState(false);
	const { mutate, isLoading } = useMutateBoard(deleteBoard);
	const navigate = useNavigate();
	const { board: boardFromParams } = useParams();

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
		<NavLink to={`/${board}`} onClick={() => setShowBoard(false)}>
			{({ isActive }) => (
				<li
					className={`mb-3 cursor-pointer rounded-r-full px-4 py-2  text-base transition-all ${
						(isActive || boardFromParams === board) && " bg-primary-500"
					}`}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<div
						className={`flex items-center justify-between ${
							isActive || boardFromParams === board
								? "text-slate-100"
								: "text-slate-400"
						}`}
					>
						<div className="flex items-center gap-2">
							<RectangleGroupIcon className="h-5 w-5 " />
							<span>{board}</span>
						</div>

						<button
							className={`opacity-0 transition-all duration-200  ${
								hover
									? "translate-x-0 text-slate-100 opacity-100"
									: "translate-x-[100%]"
							}`}
							disabled={isLoading}
							style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
							onClick={() => handleDelete(board)}
						>
							{isLoading ? <Loader /> : <TrashIcon className="h-5 w-5" />}
						</button>
					</div>
				</li>
			)}
		</NavLink>
	);
}
