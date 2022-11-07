import request from "@/helpers/axios-instance";
import { AddBoardRequest } from "@/models/Boards";

export default async function createBoard(data: AddBoardRequest) {
	return await request.post("/board", data);
}
