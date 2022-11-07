export type BoardList = string[];

export interface Board {
	_id: string;
	board: string;
	userId: string;
	__v: number;
}

export interface FetchBoardsResponse {
	boards: Board[];
}

export interface AddBoardRequest {
	board: string;
}

export type DeleteBoardRequest = string;
