import kanbanLogo from "../../assets/kanban-logo.png";

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function Sidebar(props: Props) {
	return (
		<aside
			className={`sticky top-0  h-screen overflow-x-hidden overflow-y-hidden border	border-zinc-800 border-r-gray-500 bg-zinc-800 pr-2 ${
				props.className ? props.className : ""
			}`}
		>
			<div className="flex h-14 items-center gap-2 pl-6">
				<img src={kanbanLogo} alt="kanban logo" width={24} height={24} />
				<h1 className="text-2xl font-bold text-slate-200">Kanban</h1>
			</div>

			{props.children}
		</aside>
	);
}
