import request from "../../helpers/axios-instance";

export default async function forgotPassword(data: { email: string }) {
	return await request.post("/auth/forgot-password", data);
}
