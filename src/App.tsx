import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import TaskList from "./components/kanban-board/TaskList";
import CreateTask from "./components/kanban-board/CreateTask";
import UpdateTask from "./components/kanban-board/UpdateTask";
import Home from "./components/kanban-board/Home";
import VerifyUser from "./components/auth/VerifyUser";
import ForgotPassword from "./components/auth/ForgotPassword";

function App() {
	return (
		<>
			<div>
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
					<Route path="/forgot-password" element={<ForgotPassword />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
