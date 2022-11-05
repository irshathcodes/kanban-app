import { useState, useRef, forwardRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
	ArrowRightOnRectangleIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import getUser from "../../../api/user/getUser";
import logout from "../../../api/auth/logout";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import deleteAccount from "../../../api/user/deleteAccount";

export default function User() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data } = useQuery(["get-user"], getUser);
	const { mutate, isLoading } = useMutation(logout, {
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login");
		},
	});

	const [showOptions, setShowOptions] = useState(false);
	const optionsRef = useRef<HTMLDivElement>(null);
	const userRef = useRef<HTMLDivElement>(null);
	useOutsideClick(optionsRef, (e) => {
		if (!userRef.current?.contains(e.target as Node)) {
			setShowOptions(false);
		}
	});

	return (
		<div
			ref={userRef}
			className="relative flex w-full items-center justify-between rounded-md bg-neutral-900 p-3 text-left font-semibold capitalize text-slate-300"
		>
			<button
				onClick={() => setShowOptions(!showOptions)}
				className="flex items-center "
			>
				<UserCircleIcon className="mr-1 h-6 w-6 text-primary-400" />
				<span className="capitalize">
					{isLoading ? "logging out..." : data ? data.name : "welcome"}
				</span>
				<ChevronRightIcon
					className={`h-4 w-4 transition-transform ${
						showOptions ? "rotate-[270deg]" : "rotate-0"
					}`}
				/>
			</button>
			<button onClick={() => mutate()}>
				<ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-300" />
			</button>
			<UserOptions
				showOptions={showOptions}
				ref={optionsRef}
				userType={data?.userType}
			/>
		</div>
	);
}

interface UserOptionsProps {
	showOptions: boolean;
	userType: "guest" | "user" | undefined;
}

const UserOptions = forwardRef(
	(
		{ showOptions, userType }: UserOptionsProps,
		ref: React.LegacyRef<HTMLDivElement>
	) => {
		const navigate = useNavigate();

		const { mutate: mutateDelete, isLoading } = useMutation(deleteAccount, {
			onSuccess: () => {
				navigate("/register");
			},
		});

		return (
			<div
				ref={ref}
				className={`absolute right-0 w-full rounded bg-neutral-900 p-2 transition-transform  ease-linear ${
					showOptions ? "-translate-y-[85%] " : "translate-y-16 "
				} `}
			>
				{userType === "user" && (
					<button
						onClick={() => navigate("/change-password")}
						className="block w-full rounded border border-neutral-900 border-b-slate-700 py-2  px-2 capitalize transition-all hover:bg-primary-600"
					>
						change password
					</button>
				)}

				<button
					onClick={() => mutateDelete()}
					className="block w-full rounded py-2 px-2 capitalize transition-all hover:bg-red-600"
				>
					{isLoading ? "deleting..." : "delete account"}
				</button>
			</div>
		);
	}
);
