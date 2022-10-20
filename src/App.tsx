import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import Home from "./components/kanban-board/Home";
import CreateTodo from "./components/kanban-board/CreateTodo";

function App() {
	const location = useLocation();

	const background = location.state?.background;
	return (
		<>
			<div>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/create" element={<CreateTodo />} />
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
