import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import axios from "axios";
import login from "@/api/auth/login";
import useNotify from "@/hooks/useNotify";
import GuestLogin from "@/components/auth/GuestLogin";

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
					queryClient.invalidateQueries();

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
		<div className=" flex h-screen justify-center bg-gray-50 dark:bg-neutral-900 sm:items-center ">
			<div className="m-2 mt-12 h-fit w-96 rounded-md border p-6 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-400 sm:mt-0 ">
				<h1 className="py-2 text-center text-2xl font-bold dark:text-slate-200 ">
					Sign in to your account
				</h1>

				<p className="w-full  text-center text-sm font-medium">
					or don't have an account?{" "}
					<Link
						to="/register"
						className="text-primary-600 underline dark:text-primary-400"
					>
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

					<button
						type="button"
						onClick={() => navigate("/change-password")}
						className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
					>
						Forgot your password?
					</button>

					<Button type="submit" className="mt-5" loader={isLoading}>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>

				{notify && <p className="my-4 text-center text-red-500">{error}</p>}

				<GuestLogin />
			</div>
		</div>
	);
}
