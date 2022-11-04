import request from "../../helpers/axios-instance";

export default async function getUser() {
	const res = await request.get<{ name: string; userType: "guest" | "user" }>(
		"/user"
	);
	return await res.data;
}
