import request from "../helpers/axios-instance";
import Todos, { GetAllTodoResponse } from "../models/Todos";

export default async function getTodos(url?: string) {
	const { data } = await request.get<GetAllTodoResponse>(
		url ? `/todo/?board=${url}` : "/todo"
	);

	const allTodos: Todos[] = data.todo;

	return allTodos;
}
