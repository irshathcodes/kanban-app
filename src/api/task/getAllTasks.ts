import request from "@/helpers/axios-instance";
import { GetAllTasksResponse, GetAllTasksRequest } from "@/models/Tasks";

export default async function getAllTasks(board: GetAllTasksRequest) {
	const { data } = await request.get<GetAllTasksResponse>(
		`/todo?board=${board}`
	);

	return data.todo;
}
