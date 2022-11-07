import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import guestLogin from "@/api/auth/guestLogin";

export default function GuestLogin() {
	const navigate = useNavigate();
	const { mutate, isLoading } = useMutation(guestLogin, {
		onSuccess: () => {
			navigate("/");
		},
	});

	return (
		<button
			className="w-full font-semibold text-primary-600 underline dark:text-primary-400"
			onClick={() => mutate()}
		>
			{isLoading ? "Creating guest credentials..." : "Login as a guest"}
		</button>
	);
}
