import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Boards from "./Boards";

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-[270px_1fr] bg-neutral-900">
				<Boards />
				<div>
					<Navbar />
					<Outlet />
				</div>
			</div>
		</>
	);
}
