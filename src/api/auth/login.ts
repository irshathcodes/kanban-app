import request from "@/helpers/axios-instance";

export default function loginReq(data: { email: string; password: string }) {
	return request.post("/auth/login", data);
}
