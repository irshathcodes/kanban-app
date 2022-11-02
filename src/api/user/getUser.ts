import request from "../../helpers/axios-instance";

export default async function getUser() {
	const res = await request.get<{ name: string }>("/user");
	return await res.data;
}
