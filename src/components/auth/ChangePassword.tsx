import { useState, useRef, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useNotify, useFocus } from "@/hooks/Index";
import { Button, Notification } from "@/components/ui/Index";
import changePassword from "@/api/auth/changePassword";

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

	useFocus(inputRef);

	return (
		<div className="flex h-screen w-full justify-center bg-slate-50 pt-20 dark:bg-neutral-900 ">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="m-2 h-fit w-96 rounded-md border border-slate-200 bg-slate-100 p-8 shadow-lg dark:border-slate-700 dark:bg-zinc-800 "
			>
				<h1 className="text-center  text-2xl font-semibold tracking-tighter text-slate-900 dark:text-slate-200">
					Change Password
				</h1>
				<label
					htmlFor="email"
					className="my-6  block text-left text-slate-600 dark:text-slate-400"
				>
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
						className={`mt-2  block w-full   rounded-md bg-transparent font-medium text-slate-700 focus:ring-0 dark:text-slate-300 ${
							error ? "focus:border-red-500" : ""
						}`}
					/>
				</label>
				{error || notify ? (
					<p className="font-semibold text-red-600">{error}</p>
				) : (
					""
				)}
				<Button type="submit" loader={isLoading} disabled={isLoading}>
					{isLoading ? "sending verification link..." : "submit"}
				</Button>
				<Link
					to="/"
					className="mt-5 block text-left capitalize text-primary-600 dark:text-primary-400"
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
