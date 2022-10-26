import request from "../helpers/axios-instance";

export default async function deleteBoard(board: string) {
	return await request.delete(`/board/${board}`);
}
