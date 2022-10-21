import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import TaskList from "./components/kanban-board/TaskList";
import CreateTodo from "./components/kanban-board/CreateTodo";
import UpdateTask from "./components/kanban-board/UpdateTask";

function App() {
	return (
		<>
			<div>
				<Routes>
					<Route path="/" element={<TaskList />}>
						<Route path="/create-task" element={<CreateTodo />} />
						<Route path="/update-task" element={<UpdateTask />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
