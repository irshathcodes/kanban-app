export default interface Todos {
	_id: string;
	completed: boolean;
	createdAt: string;
	description: string;
	kanbanBoard: string;
	status: string;
	subTasks: SubTasks[];
	todoName: string;
	updatedAt: string;
	userId: string;
	__v: 0;
}
export type CreateTask = {
	todoName: string;
	kanbanBoard: string;
	description?: string;
	subTasks?: CreateSubTask[];
};

export interface CreateSubTask {
	[subTask: string]: string;
}

export interface GetAllTodoResponse {
	count: number;
	todo: Todos[];
}

export interface SubTasks {
	completed: boolean;
	subTask: string;
	_id: string;
}

export interface UpdateTaskRequest {
	status: string;
	subTasks: SubTasks[];
}

export interface CreateBoard {
	board: string;
}

export interface GetBoards {
	boards: Board[];
}

export interface Board {
	_id: string;
	board: string;
	userId: string;
	__v: number;
}
