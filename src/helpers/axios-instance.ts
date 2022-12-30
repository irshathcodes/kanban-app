import axios from "axios";

const instance = axios.create({
	baseURL: "https://kanban-api.cyclic.app/api",
	withCredentials: true,
});

instance.interceptors.response.use(
	(res) => res,
	(err) => {
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 401 || err.message === "Network Error") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(err);
	}
);

export default instance;
