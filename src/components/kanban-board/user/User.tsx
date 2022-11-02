import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import getUser from "../../../api/user/getUser";
import logout from "../../../api/auth/logout";
import { useNavigate } from "react-router-dom";

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

	return (
		<div className="capitalize flex items-center justify-between bg-neutral-900 text-slate-300 font-semibold w-full p-3 text-left rounded-md">
			<button className="flex items-center gap-2 ">
				<UserCircleIcon className="w-6 h-6 text-primary-400" />
				<span className="capitalize">
					{isLoading ? "logging out..." : data ? data.name : "welcome"}
				</span>
			</button>
			<button onClick={() => mutate()}>
				<ArrowRightOnRectangleIcon className="w-5 h-5 text-slate-300" />
			</button>
		</div>
	);
}
