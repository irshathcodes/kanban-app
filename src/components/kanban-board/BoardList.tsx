import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
	board: string;
	i: number;
	boardIndex: number;
	changeBoard: (index: number) => void;
	boards: string[] | undefined;
}

export default function BoardList({
	board,
	i,
	boardIndex,
	changeBoard,
	boards,
}: Props) {
	const [hover, setHover] = useState(false);

	return (
		<li
			className={`cursor-pointer mb-3 pl-6 py-2 rounded-r-full  text-slate-400 text-base ${
				boards?.[boardIndex] === board && " bg-primary-500 "
			}`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => {
				changeBoard(i);
			}}
		>
			<a
				className={`flex justify-between items-center ${
					boards?.[boardIndex] === board && "text-slate-100"
				}`}
			>
				<div className="flex items-center gap-2">
					<RectangleGroupIcon className="w-5 h-5 " />
					<span>{board}</span>
				</div>

				<button
					className={`transition-transform duration-200  ${
						hover ? "-translate-x-4" : "translate-x-[140%]"
					}`}
				>
					<TrashIcon className="w-5 h-5" />
				</button>
			</a>
		</li>
	);
}
