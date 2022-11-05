import KanbanLogo from "../../assets/KanbanLogo";
import useAppContext from "../hooks/useAppContext";

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function Sidebar(props: Props) {
	const { showBoard, setShowBoard } = useAppContext();

	const className = props.className ? props.className : "";
	return (
		<>
			<div
				onClick={() => setShowBoard(false)}
				className={`fixed   h-full w-full ${
					showBoard ? "z-40 bg-black/30" : "-z-10"
				} md:hidden`}
			></div>
			<aside
				className={`fixed top-0 left-0  z-50  h-screen w-[270px] overflow-hidden border border-zinc-800 border-r-gray-500 bg-zinc-800 pr-2	transition-transform duration-300 ease-out md:sticky md:translate-x-0  ${
					showBoard ? "translate-x-0" : "-translate-x-full"
				}   ${className}`}
			>
				<div className="flex h-14 items-center gap-2 pl-6">
					<KanbanLogo />
					<h1 className="text-2xl font-bold text-slate-200">Kanban</h1>
				</div>

				{props.children}
			</aside>
		</>
	);
}
