import request from "../helpers/axios-instance";
import Todos, { GetAllTodoResponse } from "../models/Todos";

export default async function getTodos(url?: string) {
	const res = await request.get(url ? `/todo/?board=${url}` : "/todo");
	const data: GetAllTodoResponse = res.data;

	const allTodos: Todos[] = data.todo;

	return allTodos;
}
