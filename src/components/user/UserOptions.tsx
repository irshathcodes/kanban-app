import { forwardRef } from "react";
import deleteAccount from "@/api/user/deleteAccount";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface Props {
	showOptions: boolean;
	userType: "guest" | "user" | undefined;
}

const UserOptions = forwardRef(
	({ showOptions, userType }: Props, ref: React.LegacyRef<HTMLDivElement>) => {
		const navigate = useNavigate();

		const { mutate: mutateDelete, isLoading } = useMutation(deleteAccount, {
			onSuccess: () => {
				navigate("/register");
			},
		});

		return (
			<div
				ref={ref}
				className={`absolute right-0 w-full rounded bg-slate-300 p-2  transition-transform ease-linear  dark:bg-neutral-900 ${
					showOptions ? "-translate-y-[85%] " : "translate-y-16 "
				} `}
			>
				{userType === "user" && (
					<button
						onClick={() => navigate("/change-password")}
						className="block w-full rounded border   border-slate-300 border-b-slate-500 py-2 px-2  capitalize text-slate-800 transition-all hover:bg-primary-500 hover:text-slate-200  dark:border-neutral-900 dark:border-b-slate-600 dark:text-slate-200"
					>
						change password
					</button>
				)}

				<button
					onClick={() => mutateDelete()}
					className=" block w-full rounded py-2 px-2 capitalize text-slate-800 transition-all hover:bg-red-600 hover:text-slate-200 dark:text-slate-200"
				>
					{isLoading ? "deleting..." : "delete account"}
				</button>
			</div>
		);
	}
);

export default UserOptions;
