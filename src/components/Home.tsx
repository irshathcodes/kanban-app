import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "@/components/ui/Index";
import Boards from "@/components/board/Boards";
import User from "@/components/user/User";

export default function Home() {
	return (
		<>
			<div className="bg-slate-200 text-slate-900 transition-colors   dark:bg-neutral-900 md:grid md:grid-cols-[270px_calc(100%-270px)]">
				<Sidebar className="grid grid-rows-[56px_1fr_54px]">
					<Boards />
					<User />
				</Sidebar>
				<div>
					<Navbar />
					<Outlet />
				</div>
			</div>
		</>
	);
}
