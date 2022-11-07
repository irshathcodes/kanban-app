export default interface Task {
	_id: string;
	completed: boolean;
	createdAt: string;
	description: string;
	kanbanBoard: string;
	status: string;
	subTasks: SubTask[];
	todoName: string;
	updatedAt: string;
	userId: string;
	__v: 0;
}

export interface SubTask {
	completed: boolean;
	subTask: string;
	_id: string;
}

export type GetAllTasksRequest = string | undefined;
export interface GetAllTasksResponse {
	count: number;
	todo: Task[];
}

export interface CreateTaskRequest {
	todoName: string;
	kanbanBoard: string;
	description?: string;
	subTasks?: CreateSubTaskRequest[];
}

export interface UpdateTaskRequest {
	status: string;
	subTasks: SubTask[];
}
export type DeleteTaskRequest = string;

export interface CreateSubTaskRequest {
	[subTask: string]: string;
}
