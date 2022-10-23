import request from "../helpers/axios-instance";

import { GetAllBoards } from "../models/Todos";

export default async function getAllBoards() {
	return await request.get<GetAllBoards>("/board");
}
