import request from "@/helpers/axios-instance";
import { CreateTaskRequest } from "@/models/Tasks";

export default async function createTask(data: CreateTaskRequest) {
	return await request.post("/todo", data);
}
