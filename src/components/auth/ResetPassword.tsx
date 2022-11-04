import { useState, useRef, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFocus, useNotify } from "../hooks/Index";
import Button from "../ui/Button";
import Notification from "../ui/Notification";
import changePassword from "../../api/auth/changePassword";
import resetPassword from "../../api/auth/resetPassword";
import axios from "axios";

export default function ResetPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const { notify, showNotify } = useNotify();
	const [queryParams] = useSearchParams();
	const navigate = useNavigate();

	const email = queryParams.get("email");
	const verificationToken = queryParams.get("token");

	const { mutate, isLoading } = useMutation(resetPassword, {
		onSuccess: () => {
			showNotify();
			navigate("/login");
		},
		onError: (err) => {
			if (axios.isAxiosError(err)) {
				if (err.response?.data) {
					setError(err.response.data.msg);
				}
			}
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("passwords do not match");
			inputRef.current?.focus();
			return;
		} else {
			setError("");
		}
		if (!email || !verificationToken) {
			setError("Something went wrong, please try again");
			return;
		}

		mutate({ verificationToken, email, password });
	};

	useFocus(inputRef);

	return (
		<div className="w-full flex pt-20 justify-center h-screen ">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="w-96 shadow-lg p-8 m-2 rounded-md h-fit border border-slate-700 "
			>
				<h1 className="text-slate-200  text-2xl font-semibold tracking-tighter text-center">
					Enter your new password
				</h1>
				<label
					htmlFor="password"
					className="text-slate-400  text-left block my-6"
				>
					new password
					<input
						type="password"
						name="password"
						ref={inputRef}
						id="password"
						required
						minLength={8}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={`bg-transparent  mt-2 focus:ring-0   block rounded-md text-slate-300 w-full font-medium ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				<label
					htmlFor="confirmPassword"
					className="text-slate-400  text-left block my-6"
				>
					confirm password
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						required
						minLength={8}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className={`bg-transparent  mt-2 focus:ring-0   block rounded-md text-slate-300 w-full font-medium ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				{error || notify ? (
					<p className="text-red-500 font-semibold">{error}</p>
				) : (
					""
				)}
				<Button type="submit" loader={isLoading} disabled={isLoading}>
					{isLoading ? "submitting..." : "submit"}
				</Button>
			</form>
			<Notification notify={notify} color="success">
				Password changed successfully, please login with your new password
			</Notification>
		</div>
	);
}
