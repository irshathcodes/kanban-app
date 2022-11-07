import request from "@/helpers/axios-instance";

export default async function guestLogin() {
	return await request.post("/auth/login/guest");
}
