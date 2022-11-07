import request from "@/helpers/axios-instance";

export default async function deleteAccount() {
	return await request.delete("/user/delete-account");
}
