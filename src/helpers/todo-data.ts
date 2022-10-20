import Todos from "../models/Todos";

export const getAllStatus = (allTodos: Todos[] | undefined) => {
	const allStatus = allTodos?.map((todo) => todo.status);
	const uniqueStatus = [...new Set(allStatus)];
	const status = ["todo", "doing", "done"];

	uniqueStatus.forEach((s) => {
		if (!status.includes(s)) {
			status.push(s);
		}
	});

	return status;
};

export const getAllBoards = (allTodos: Todos[] | undefined) => {
	return allTodos?.map((item) => item.kanbanBoard);
};
