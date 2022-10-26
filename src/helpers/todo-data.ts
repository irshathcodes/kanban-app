import Todos from "../models/Todos";

export const getAllStatus = (tasks: Todos[] | undefined) => {
	const allStatus = tasks?.map((todo) => todo.status);
	const uniqueStatus = [...new Set(allStatus)];
	const status = ["todo", "doing", "done"];

	uniqueStatus.forEach((s) => {
		if (!status.includes(s)) {
			status.push(s);
		}
	});

	return status;
};
