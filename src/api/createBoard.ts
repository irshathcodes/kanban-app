import request from "../helpers/axios-instance";
import { CreateBoard } from "../models/Todos";

export default async function createBoard(data: CreateBoard) {
	return await request.post("/board", data);
}
