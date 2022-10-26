import request from "../../helpers/axios-instance";

export default function loginReq(data: { email: string; password: string }) {
	return request.post<{ username: string }>("/auth/login", data);
}
