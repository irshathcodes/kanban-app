import request from "../helpers/axios-instance";
import Todos, { GetAllTodoResponse } from "../models/Todos";

export default async function getAllTasks() {
	const { data } = await request.get<GetAllTodoResponse>("/todo");

	const allTodos: Todos[] = data.todo;

	return allTodos;
}
