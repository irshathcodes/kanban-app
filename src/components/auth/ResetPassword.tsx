import { useState, useRef, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFocus, useNotify } from "@/hooks/Index";
import { Button, Notification } from "@/components/ui/Index";
import resetPassword from "@/api/auth/resetPassword";
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

	const labelStyles =
		"my-6  block text-left text-slate-700 dark:text-slate-400";
	const inputStyles = `mt-2  block w-full   rounded-md bg-transparent font-medium text-slate-800  dark:text-slate-300 ${
		error ? "focus:border-red-500" : ""
	}`;

	return (
		<div className="flex h-screen w-full justify-center pt-20 ">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="m-2 h-fit w-96 rounded-md border p-8 shadow-lg dark:border-slate-700 "
			>
				<h1 className="text-center  text-2xl font-semibold tracking-tighter text-slate-800 dark:text-slate-200">
					Enter your new password
				</h1>
				<label htmlFor="password" className={labelStyles}>
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
						className={inputStyles}
					/>
				</label>
				<label htmlFor="confirmPassword" className={labelStyles}>
					confirm password
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						required
						minLength={8}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className={inputStyles}
					/>
				</label>
				{error || notify ? (
					<p className="font-semibold text-red-500">{error}</p>
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
