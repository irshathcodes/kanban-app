export type BoardList = string[];

export interface GetBoards {
	boards: Board[];
}

export interface Board {
	_id: string;
	board: string;
	userId: string;
	__v: number;
}
