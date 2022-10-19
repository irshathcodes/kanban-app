import request from "../utils/axios-instance";
import Todos, { GetAllTodoResponse } from "../models/todos";

export default async function getTodos(url?: string) {
	const res = await request.get(url ? `/todo/?board=${url}` : "/todo");
	const data: GetAllTodoResponse = res.data;

	const allTodos: Todos[] = data.todo;

	return allTodos;
}
