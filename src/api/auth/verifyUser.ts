import request from "@/helpers/axios-instance";

export default async function verifyUser(data: { verificationOtp: number }) {
	return await request.post<{ username: string }>("/auth/verify-user", data);
}
