import request from "@/helpers/axios-instance";

export default async function changePassword(data: { email: string }) {
	return await request.post("/auth/forgot-password", data);
}
