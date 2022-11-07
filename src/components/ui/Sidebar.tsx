import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import KanbanLogo from "@/assets/KanbanLogo";
import useAppContext from "@/hooks/useAppContext";

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function Sidebar(props: Props) {
	const { showSidebar, setShowSidebar, theme, setTheme } = useAppContext();

	const handleThemeClick = () => {
		const savedTheme = localStorage.getItem("theme");

		if (savedTheme === "dark") {
			localStorage.setItem("theme", "light");
			setTheme("light");
		} else {
			localStorage.setItem("theme", "dark");
			setTheme("dark");
		}
	};
	const className = props.className ? props.className : "";
	return (
		<>
			<div
				onClick={() => setShowSidebar(false)}
				className={`fixed   h-full w-full ${
					showSidebar ? "z-40 bg-black/30" : "-z-10"
				} md:hidden`}
			></div>
			<aside
				className={`fixed top-0 left-0 z-50 h-full w-[270px] overflow-hidden  border border-slate-100 border-r-slate-200 bg-slate-100 pr-2  transition-all duration-300 ease-out	dark:border-zinc-800 dark:border-r-gray-500 dark:bg-zinc-800  sm:h-screen md:sticky md:translate-x-0  ${
					showSidebar ? "translate-x-0" : "-translate-x-full"
				}   ${className}`}
			>
				<div className="flex h-14 items-center gap-2 pl-6">
					<KanbanLogo />
					<div className="flex w-full items-center justify-between">
						<h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
							Kanban
						</h1>
						<button type="button" className="mr-1" onClick={handleThemeClick}>
							{theme === "dark" ? (
								<SunIcon className="h-7 w-7 text-slate-300" />
							) : (
								<MoonIcon className="h-7 w-7 text-slate-700" />
							)}
						</button>
					</div>
				</div>

				{props.children}
			</aside>
		</>
	);
}
