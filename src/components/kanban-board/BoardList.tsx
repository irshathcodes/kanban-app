import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import deleteBoard from "../../api/deleteBoard";
import useMutateBoard from "../hooks/useMutateBoard";
import useNotify from "../hooks/useNotify";
import { Notification, Loader } from "../ui/Index";

interface Props {
	board: string;
	boards: string[];
}

export default function BoardList({ board, boards }: Props) {
	const [hover, setHover] = useState(false);
	const { board: boardFromParams } = useParams();
	const { mutate, isLoading } = useMutateBoard(deleteBoard);
	const { notify, showNotify } = useNotify();

	const navigate = useNavigate();

	const handleDelete = (board: string) => {
		mutate(board, {
			onSuccess: () => {
				showNotify();
				if (boards.length === 1) {
					navigate("/");
				}
			},
		});
	};

	return (
		<NavLink to={`/${board}`} style={{ background: "red" }}>
			<li
				className={`cursor-pointer mb-3 px-4 py-2 rounded-r-full  text-slate-400 text-base`}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div
					className={`flex justify-between items-center ${
						boardFromParams === board && "text-slate-100"
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
			<Notification notify={notify} color="danger">
				{board} board deleted successfully
			</Notification>
		</NavLink>
	);
}
