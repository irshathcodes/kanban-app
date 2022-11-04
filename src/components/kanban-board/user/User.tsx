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
			className="capitalize relative flex items-center justify-between bg-neutral-900 text-slate-300 font-semibold w-full p-3 text-left rounded-md"
		>
			<button
				onClick={() => setShowOptions(!showOptions)}
				className="flex items-center "
			>
				<UserCircleIcon className="w-6 h-6 mr-1 text-primary-400" />
				<span className="capitalize">
					{isLoading ? "logging out..." : data ? data.name : "welcome"}
				</span>
				<ChevronRightIcon
					className={`w-4 h-4 transition-transform ${
						showOptions ? "rotate-[270deg]" : "rotate-0"
					}`}
				/>
			</button>
			<button onClick={() => mutate()}>
				<ArrowRightOnRectangleIcon className="w-5 h-5 text-slate-300" />
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
				className={`absolute w-full transition-transform right-0 ease-linear bg-neutral-900 p-2  rounded ${
					showOptions ? "-translate-y-[85%] " : "translate-y-16 "
				} `}
			>
				{userType === "user" && (
					<button
						onClick={() => navigate("/change-password")}
						className="block py-2 border rounded w-full border-neutral-900 hover:bg-primary-600  px-2 border-b-slate-700 capitalize transition-all"
					>
						change password
					</button>
				)}

				<button
					onClick={() => mutateDelete()}
					className="block py-2 hover:bg-red-600 rounded w-full px-2 capitalize transition-all"
				>
					{isLoading ? "deleting..." : "delete account"}
				</button>
			</div>
		);
	}
);
