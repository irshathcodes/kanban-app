import axios from "axios";

const instance = axios.create({
	baseURL: "https://kanban-board-api.up.railway.app/api",
	withCredentials: true,
});

instance.interceptors.response.use(
	(res) => res,
	(err) => {
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 401) {
				window.location.href = "/login";
			}
		}
		return Promise.reject(err);
	}
);

export default instance;
