import { useState, useEffect } from "react";
import request from "../../helpers/axios-instance";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../ui/Button";
import axios, { AxiosError } from "axios";
import getBoards from "../../api/getBoards";
import login from "../../api/auth/login";
import useMutateBoard from "../hooks/useMutateBoard";
import createBoard from "../../api/createBoard";

export default function Login() {
	const { mutate: mutateLogin, data: res, isLoading } = useMutation(login);

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
					navigate("/", { state: res?.data.username, replace: true });
				},
				onError: (err) => {
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

	useEffect(() => {
		const timeout = setTimeout(() => {
			setError("");
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [error]);
	return (
		<>
			<div className="flex h-screen flex-col items-center bg-gray-50 pt-20 ">
				<div className="w-96 rounded-md border border-gray-200 px-6 py-6 ">
					<h1 className="py-2 text-center text-2xl font-bold ">
						Sign in to your account
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="my-6 flex flex-col gap-1">
							<label
								htmlFor="email"
								className="text-[15px] font-semibold text-slate-600"
							>
								email
							</label>
							<input
								type="email"
								name="email"
								required
								className="rounded border-2 border-slate-300 px-2 py-[3px] focus:outline-primary-500"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								placeholder="example@gmail.com"
							/>
						</div>
						<div className="my-4 flex flex-col gap-1">
							<label
								htmlFor="password"
								className="text-[15px] font-semibold text-slate-600"
							>
								password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="rounded border-2 border-slate-300  px-2 py-[3px] focus:outline-primary-500"
							/>
						</div>

						<Button type="submit" loader={isLoading}>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>

					{error && <p className="text-center text-red-600">{error}</p>}
				</div>
			</div>
		</>
	);
}
