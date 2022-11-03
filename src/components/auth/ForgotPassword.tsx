import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useNotify from "../hooks/useNotify";
import Button from "../ui/Button";
import verifyUser from "../../api/auth/verifyUser";
import Notification from "../ui/Notification";

export default function ForgotPassword() {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const { notify, showNotify } = useNotify();

	const { mutate, isLoading } = useMutation(verifyUser);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (otp.length < 6) {
			setError("please enter 6 digit OTP");
			return;
		}

		mutate(
			{ verificationOtp: +otp },
			{
				onSuccess: () => {
					queryClient.invalidateQueries(["fetch-boards"]);
					navigate("/");
				},
			}
		);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 6) {
			return;
		} else {
			setError("");
		}

		setOtp(e.target.value);
	};

	useEffect(() => {
		showNotify();
		inputRef.current?.focus();
	}, []);

	return (
		<div className="w-full flex pt-20 justify-center h-screen text-center">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="w-96 shadow-lg p-8 m-2 rounded-md h-fit border border-slate-700 "
			>
				<h1 className="text-slate-200  text-2xl font-semibold tracking-tighter">
					Verify your account
				</h1>
				<label htmlFor="otp" className="text-slate-400 block my-6">
					Enter your six digit one time password
					<input
						type="number"
						name="otp"
						maxLength={6}
						ref={inputRef}
						id="otp"
						required
						value={otp}
						onChange={handleChange}
						className={`bg-transparent w-28 mt-4 focus:ring-0  mx-auto block rounded-md text-slate-300 text-xl font-semibold ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				{error || notify ? (
					<p className="text-red-600 font-semibold">{error}</p>
				) : (
					""
				)}
				<Button type="submit" loader={isLoading}>
					{isLoading ? "verifying..." : "verify"}
				</Button>
			</form>
			<Notification notify={notify}>
				check your email for one time password.
			</Notification>
		</div>
	);
}
