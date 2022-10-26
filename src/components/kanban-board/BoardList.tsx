import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

interface Props {
	board: string;
}

export default function BoardList({ board }: Props) {
	const [hover, setHover] = useState(false);

	const { board: boardFromParams } = useParams();

	return (
		<Link to={`/${board}`}>
			<li
				className={`cursor-pointer mb-3 px-4 py-2 rounded-r-full  text-slate-400 text-base ${
					boardFromParams === board && " bg-primary-500 "
				}`}
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
						className={`transition-all duration-200 opacity-0 hover:text-slate-100 ${
							hover ? "translate-x-0 opacity-100" : "translate-x-[100%]"
						}`}
					>
						<TrashIcon className="w-5 h-5" />
					</button>
				</div>
			</li>
		</Link>
	);
}
