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

	const { data } = useQuery(["get-user"], getUser, {
		staleTime: Infinity,
		cacheTime: Infinity,
	});
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
			<UserOptions showOptions={showOptions} ref={optionsRef} />
		</div>
	);
}

const UserOptions = forwardRef(
	(
		{
			showOptions,
		}: {
			showOptions: boolean;
		},
		ref: React.LegacyRef<HTMLDivElement>
	) => {
		const navigate = useNavigate();

		const { mutate, isLoading } = useMutation(deleteAccount, {
			onSuccess: () => {
				navigate("/register");
			},
		});

		return (
			<div
				ref={ref}
				className={`absolute  transition-transform right-0 bg-neutral-900 p-2  rounded ${
					showOptions ? "-translate-y-[85%] z-10" : "translate-y-6 -z-10"
				} `}
			>
				<button className="block py-2 border rounded w-full border-neutral-900 hover:bg-primary-600  px-2 border-b-slate-700">
					reset password
				</button>
				<button
					onClick={() => mutate()}
					className="block py-2 hover:bg-red-600 rounded w-full px-2 "
				>
					{isLoading ? "deleting..." : "delete account"}
				</button>
			</div>
		);
	}
);
