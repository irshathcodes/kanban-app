import request from "../helpers/axios-instance";

import { GetBoards } from "../models/Todos";

export default async function getBoards() {
	const { data } = await request.get<GetBoards>("/board");
	const board = data?.boards.map(({ board }) => board);
	return board;
}
