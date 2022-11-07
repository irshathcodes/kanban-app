import request from "@/helpers/axios-instance";

export default async function logout() {
	return await request.delete("/auth/logout");
}
