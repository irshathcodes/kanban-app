import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useNotify from "../hooks/useNotify";
import Button from "../ui/Button";
import verifyUser from "../../api/auth/verifyUser";
import Notification from "../ui/Notification";

export default function VerifyUser() {
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
				onSuccess: (res) => {
					queryClient.invalidateQueries(["fetch-boards"]);
					navigate("/", {
						state: res.data.username,
					});
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
		<div className="flex h-screen w-full justify-center pt-20 text-center">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="m-2 h-fit w-96 rounded-md border border-slate-700 p-8 shadow-lg "
			>
				<h1 className="text-2xl  font-semibold tracking-tighter text-slate-200">
					Verify your account
				</h1>
				<label htmlFor="otp" className="my-6 block text-slate-400">
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
						className={`mx-auto mt-4 block w-28  rounded-md bg-transparent text-xl font-semibold text-slate-300 focus:ring-0 ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				{error || notify ? (
					<p className="font-semibold text-red-600">{error}</p>
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
