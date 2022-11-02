import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import guestLogin from "../../api/auth/guestLogin";

export default function GuestLogin() {
	const navigate = useNavigate();
	console.log(navigate);
	const { mutate, isLoading } = useMutation(guestLogin, {
		onSuccess: () => {
			navigate("/");
		},
	});

	return (
		<button
			className="w-full text-primary-600 font-semibold underline"
			onClick={() => mutate()}
		>
			{isLoading ? "Creating guest credentials..." : "Login as a guest"}
		</button>
	);
}
