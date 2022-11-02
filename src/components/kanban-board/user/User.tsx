import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
	ArrowRightOnRectangleIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import getUser from "../../../api/user/getUser";
import logout from "../../../api/auth/logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

	return (
		<div className="capitalize relative flex items-center justify-between bg-neutral-900 text-slate-300 font-semibold w-full p-3 text-left rounded-md">
			<button
				onClick={() => setShowOptions(!showOptions)}
				className="flex items-center "
			>
				<UserCircleIcon className="w-6 h-6 mr-1 text-primary-400" />
				<span className="capitalize">
					{isLoading ? "logging out..." : data ? data.name : "welcome"}
				</span>
				<ChevronRightIcon className="w-4 h-4 " />
			</button>
			<button onClick={() => mutate()}>
				<ArrowRightOnRectangleIcon className="w-5 h-5 text-slate-300" />
			</button>
			<UserOptions showOptions={showOptions} />
		</div>
	);
}

function UserOptions({ showOptions }: { showOptions: boolean }) {
	return (
		<div
			className={`absolute  transition-transform right-0 bg-neutral-900 p-2  rounded ${
				showOptions ? "-translate-y-[85%] z-10" : "translate-y-6 -z-10"
			} `}
		>
			<button className="block py-2 border rounded border-neutral-900 hover:bg-primary-600  px-2 border-b-slate-700">
				reset password
			</button>
			<button className="block py-2 hover:bg-primary-600  px-2 ">
				delete account
			</button>
		</div>
	);
}
