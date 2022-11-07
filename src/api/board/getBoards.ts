import request from "@/helpers/axios-instance";

import { FetchBoardsResponse } from "@/models/Boards";

export default async function getBoards() {
	const { data } = await request.get<FetchBoardsResponse>("/board");
	const board = data?.boards.map(({ board }) => board);
	return board;
}
