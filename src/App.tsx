import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import TaskList from "./components/kanban-board/TaskList";
import CreateTask from "./components/kanban-board/CreateTask";
import UpdateTask from "./components/kanban-board/UpdateTask";
import Home from "./components/kanban-board/Home";
import VerifyUser from "./components/auth/VerifyUser";
import ChangePassword from "./components/auth/ChangePassword";
import ResetPassword from "./components/auth/ResetPassword";
import useAppContext from "./components/hooks/useAppContext";

function App() {
	const { theme } = useAppContext();

	return (
		<>
			<div className={`${theme}`}>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/:board" element={<TaskList />}>
							<Route path="create-task" element={<CreateTask />} />
							<Route path="update-task" element={<UpdateTask />} />
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/verify-user" element={<VerifyUser />} />
					<Route path="/change-password" element={<ChangePassword />} />

					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
