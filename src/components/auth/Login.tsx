import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import axios from "axios";
import login from "../../api/auth/login";
import useNotify from "../hooks/useNotify";
import GuestLogin from "./GuestLogin";

export default function Login() {
	const queryClient = useQueryClient();
	const { mutate: mutateLogin, isLoading } = useMutation(login);

	const { notify, showNotify } = useNotify();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		mutateLogin(
			{ email, password },
			{
				onSuccess: () => {
					queryClient.invalidateQueries(["fetch-boards"]);

					navigate("/");
				},
				onError: (err) => {
					showNotify();
					if (axios.isAxiosError(err)) {
						if (err.response?.data) {
							setError(err.response.data.msg);
						}
					} else {
						setError("Something went wrong, please try again later");
					}
				},
			}
		);
	};
	return (
		<div className="flex h-screen flex-col items-center bg-gray-50 pt-20 ">
			<div className="w-96 rounded-md border border-gray-200 p-6 ">
				<h1 className="py-2 text-center text-2xl font-bold ">
					Sign in to your account
				</h1>

				<p className="text-center  text-sm w-full font-medium">
					or don't have an account?{" "}
					<Link to="/register" className="text-primary-600 underline">
						sign up for free
					</Link>
				</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email" className="label-styles">
						email
						<input
							type="email"
							name="email"
							required
							value={email}
							className="input-styles"
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							placeholder="example@gmail.com"
						/>
					</label>

					<label htmlFor="password" className="label-styles">
						password
						<input
							type="password"
							name="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="input-styles"
						/>
					</label>

					<button className="text-sm text-primary-600 font-medium">
						Forgot your password?
					</button>

					<Button type="submit" className="mt-5" loader={isLoading}>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>

				{notify && <p className="text-center text-red-600">{error}</p>}

				<GuestLogin />
			</div>
		</div>
	);
}
