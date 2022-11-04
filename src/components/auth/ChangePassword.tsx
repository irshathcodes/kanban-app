import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useNotify from "../hooks/useNotify";
import Button from "../ui/Button";
import verifyUser from "../../api/auth/verifyUser";
import Notification from "../ui/Notification";
import changePassword from "../../api/auth/changePassword";

export default function ChangePassword() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const { notify, showNotify } = useNotify();

	const { mutate, isLoading } = useMutation(changePassword);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		mutate(
			{ email },
			{
				onSuccess: () => {
					showNotify();
				},
			}
		);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className="w-full flex pt-20 justify-center h-screen ">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="w-96 shadow-lg p-8 m-2 rounded-md h-fit border border-slate-700 "
			>
				<h1 className="text-slate-200  text-2xl font-semibold tracking-tighter text-center">
					Change Password
				</h1>
				<label htmlFor="email" className="text-slate-400  text-left block my-6">
					Enter your signed in email address
					<input
						type="email"
						name="email"
						ref={inputRef}
						id="email"
						placeholder="hello@gmail.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={`bg-transparent  mt-2 focus:ring-0   block rounded-md text-slate-300 w-full font-medium ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				{error || notify ? (
					<p className="text-red-600 font-semibold">{error}</p>
				) : (
					""
				)}
				<Button type="submit" loader={isLoading} disabled={isLoading}>
					{isLoading ? "sending verification link..." : "submit"}
				</Button>
				<Link
					to="/"
					className="text-primary-600 capitalize text-left mt-5 block"
				>
					go back
				</Link>
			</form>
			<Notification notify={notify}>
				check your email for the verification link
			</Notification>
		</div>
	);
}
