import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
	ArrowRightOnRectangleIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import getUser from "@/api/user/getUser";
import logout from "@/api/auth/logout";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "@/hooks/useOutsideClick";
import UserOptions from "@/components/user/UserOptions";

export default function User() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data } = useQuery(["get-user"], getUser, {
		refetchOnWindowFocus: false,
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
			className="relative flex w-full items-center justify-between rounded-md bg-slate-300 p-3  text-left font-semibold capitalize text-slate-300  dark:bg-neutral-900"
		>
			<button
				onClick={() => setShowOptions(!showOptions)}
				className="flex items-center "
			>
				<UserCircleIcon className="mr-1 h-6 w-6 text-primary-600 dark:text-primary-400" />
				<span className="capitalize text-slate-800 dark:text-slate-200">
					{isLoading ? "logging out..." : data ? data.name : "welcome"}
				</span>
				<ChevronRightIcon
					className={`h-4 w-4 text-slate-800 transition-transform dark:text-slate-200 ${
						showOptions ? "rotate-[270deg]" : "rotate-0"
					}`}
				/>
			</button>
			<button onClick={() => mutate()}>
				<ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-800 dark:text-slate-200 " />
			</button>
			<UserOptions
				showOptions={showOptions}
				ref={optionsRef}
				userType={data?.userType}
			/>
		</div>
	);
}
