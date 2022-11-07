import request from "@/helpers/axios-instance";
import { DeleteBoardRequest } from "@/models/Boards";

export default async function deleteBoard(board: DeleteBoardRequest) {
	return await request.delete(`/board/${board}`);
}
