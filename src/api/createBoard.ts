import request from "../helpers/axios-instance";
import { CreateBoard, Board } from "../models/Todos";

export default async function createBoard(data: CreateBoard) {
	return await request.post<{ kanbanBoard: Board }>("/board", data);
}
