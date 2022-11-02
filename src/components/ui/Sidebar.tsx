import kanbanLogo from "../../assets/kanban-logo.png";

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function Sidebar(props: Props) {
	return (
		<aside
			className={`pr-2 sticky  h-screen overflow-y-hidden top-0 overflow-x-hidden	bg-zinc-800 border border-zinc-800 border-r-gray-500 ${
				props.className ? props.className : ""
			}`}
		>
			<div className="h-14 pl-6 flex gap-2 items-center">
				<img src={kanbanLogo} alt="kanban logo" width={24} height={24} />
				<h1 className="text-slate-200 font-bold text-2xl">Kanban</h1>
			</div>

			{props.children}
		</aside>
	);
}
