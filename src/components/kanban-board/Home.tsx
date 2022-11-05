import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../ui/Index";
import Boards from "./Boards";
import User from "./user/User";

export default function Home() {
	return (
		<>
			<div className="bg-neutral-900 sm:grid sm:grid-cols-[270px_1fr]">
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
