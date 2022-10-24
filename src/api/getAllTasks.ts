import request from "../helpers/axios-instance";
import Todos, { GetAllTodoResponse } from "../models/Todos";

export default async function getAllTasks(board: string | undefined) {
	const { data } = await request.get<GetAllTodoResponse>(
		`/todo?board=${board}`
	);

	const tasks: Todos[] = data.todo;

	return tasks;
}
