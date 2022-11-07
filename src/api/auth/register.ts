import request from "@/helpers/axios-instance";

interface data {
	name: string;
	email: string;
	password: string;
}

export default async function register(data: data) {
	return await request.post<{ username: string }>("/auth/register", data);
}
