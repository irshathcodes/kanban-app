import request from "../helpers/axios-instance";
import { UpdateTaskRequest } from "../models/Todos";

export default async function updateTask({
	id,
	data,
}: {
	id: string;
	data: UpdateTaskRequest;
}) {
	return await request.patch(`/todo/${id}`, data);
}
