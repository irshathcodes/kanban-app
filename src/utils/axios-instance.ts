import axios from "axios";

const instance = axios.create({
	baseURL: "https://kanban-board-api.up.railway.app/api",
	withCredentials: true,
});

export default instance;
