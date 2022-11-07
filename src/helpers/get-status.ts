import Task from "@/models/Tasks";

export const getAllStatus = (tasks: Task[] | undefined) => {
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
