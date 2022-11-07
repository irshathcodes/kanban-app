import request from "@/helpers/axios-instance";
import { DeleteTaskRequest } from "@/models/Tasks";

export default async function deleteTask(id: DeleteTaskRequest) {
	return await request.delete(`/todo/${id}`);
}
