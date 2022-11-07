import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/Index";
import axios from "axios";
import useNotify from "@/hooks/useNotify";
import register from "@/api/auth/register";
import GuestLogin from "@/components/auth/GuestLogin";

export default function Register() {
	const { mutate: mutateLogin, data: res, isLoading } = useMutation(register);
	const { notify, showNotify } = useNotify();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		mutateLogin(
			{ name, email, password },
			{
				onSuccess: () => {
					queryClient.invalidateQueries();
					navigate("/verify-user");
				},
				onError: (err) => {
					if (axios.isAxiosError(err)) {
						showNotify();
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
		<>
			<div className="flex h-screen justify-center bg-gray-50 dark:bg-neutral-900 sm:items-center ">
				<div className="m-2 mt-12 h-fit w-96 rounded-md border border-gray-200 p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:mt-0   ">
					<h1 className="py-2 text-center text-2xl font-bold capitalize dark:text-slate-200">
						Sign up
					</h1>
					<p className="w-full text-center font-medium dark:text-slate-400">
						already have an account?{" "}
						<Link
							to="/login"
							className="text-primary-600 underline dark:text-primary-400"
						>
							Login
						</Link>
					</p>

					<form onSubmit={handleSubmit}>
						<label htmlFor="name" className="label-styles">
							name
							<input
								type="text"
								name="name"
								required
								value={name}
								className="input-styles capitalize"
								onChange={(e) => setName(e.target.value)}
								id="name"
							/>
						</label>

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
								placeholder="jonsnow@gmail.com"
							/>
						</label>

						<label htmlFor="password" className="label-styles">
							password
							<input
								type="password"
								name="password"
								id="password"
								className="input-styles"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>

						<Button type="submit" loader={isLoading}>
							{isLoading ? "Registering..." : "Sign up"}
						</Button>
					</form>
					{notify && <p className="text-center text-red-600">{error}</p>}
					<GuestLogin />
				</div>
			</div>
		</>
	);
}
