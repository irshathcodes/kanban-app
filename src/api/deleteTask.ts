import request from "../helpers/axios-instance";

export default async function deleteTask(id: string) {
	return await request.delete(`/todo/${id}`);
}
