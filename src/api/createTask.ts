import request from "../helpers/axios-instance";
import { CreateTask } from "../models/Todos";

export default async function createTask(data: CreateTask) {
	return await request.post("/todo", data);
}
