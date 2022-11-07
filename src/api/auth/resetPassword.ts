import request from "@/helpers/axios-instance";

interface Data {
	verificationToken: string;
	email: string;
	password: string;
}

export default async function resetPassword(data: Data) {
	return await request.post("/auth/reset-password", data);
}
