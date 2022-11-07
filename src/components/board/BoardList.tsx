import React, { useEffect, useState } from "react";
import { RectangleGroupIcon, TrashIcon } from "@heroicons/react/20/solid";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/ui/Index";
import { useDeleteBoard, useAppContext } from "@/hooks/Index";

interface Props {
	board: string;
	boards: string[];
}

export default function BoardList({ board, boards }: Props) {
	const { setShowSidebar } = useAppContext();
	const [hover, setHover] = useState(false);
	const { mutate, isLoading } = useDeleteBoard();
	const navigate = useNavigate();
	const { board: boardFromParams } = useParams();

	const handleDelete = (e: React.MouseEvent, board: string) => {
		e.preventDefault();
		mutate(board);
		e.stopPropagation();
	};

	useEffect(() => {
		if (!boardFromParams && boards.length > 0) {
			navigate(`/${boards[0]}`);
		}
	}, []);
	return (
		<NavLink to={`/${board}`}>
			{({ isActive }) => (
				<li
					className={`mb-3 cursor-pointer rounded-r-full px-4 py-2  text-base transition-all ${
						(isActive || boardFromParams === board) && " bg-primary-500"
					}`}
					onClick={() => setShowSidebar(false)}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<div
						className={`flex items-center justify-between ${
							isActive || boardFromParams === board
								? "text-slate-100"
								: "text-slate-600 dark:text-slate-400"
						}`}
					>
						<div className="flex items-center gap-2">
							<RectangleGroupIcon className="h-5 w-5 " />
							<span>{board}</span>
						</div>

						<button
							className={`translate-x-0 text-slate-100  opacity-100 transition-all  duration-200 dark:text-slate-700  ${
								hover
									? "sm:translate-x-0  sm:opacity-100"
									: "sm:translate-x-full sm:opacity-0"
							}`}
							disabled={isLoading}
							style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
							onClick={(e) => handleDelete(e, board)}
						>
							{isLoading ? (
								<Loader />
							) : (
								<TrashIcon
									className={`h-5 w-5 ${
										isActive ? "text-slate-100" : "text-slate-500"
									}`}
								/>
							)}
						</button>
					</div>
				</li>
			)}
		</NavLink>
	);
}
