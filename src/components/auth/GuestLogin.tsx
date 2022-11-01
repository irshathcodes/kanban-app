import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import guestLogin from "../../api/auth/guestLogin";

export default function GuestLogin() {
	const navigate = useNavigate();

	const { mutate } = useMutation(guestLogin, {
		onSuccess: () => {
			navigate("/");
		},
	});

	return (
		<Link
			to="/"
			className="block text-center text-primary-600 font-semibold underline"
			onClick={() => mutate}
		>
			Login as a guest
		</Link>
	);
}
