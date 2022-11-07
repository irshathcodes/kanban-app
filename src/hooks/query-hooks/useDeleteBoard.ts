import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import deleteBoard from "@/api/board/deleteBoard";
import { BoardList } from "@/models/Boards";

export default function useDeleteBoard() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(deleteBoard, {
		onMutate: async (deleteBoard) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(["fetch-boards"]);

			// Snapshot the previous value
			const previousData = queryClient.getQueryData<BoardList>([
				"fetch-boards",
			]);

			// Optimistically update to the new value
			queryClient.setQueryData<BoardList>(["fetch-boards"], (oldData) => {
				const deletedList = oldData?.filter((board) => board !== deleteBoard);
				return deletedList;
			});
			if (previousData && previousData?.length > 0) {
				navigate(`/${previousData?.[0]}`);
			} else {
				navigate("/");
			}
			return { previousData };
		},

		onError: (_err, _var, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(["fetch-boards"], context?.previousData);
			navigate(`/${context?.previousData?.[0]}`);
		},
		onSettled: () => {
			// Always refetch after error or success:
			queryClient.invalidateQueries(["fetch-boards"]);
		},
	});
}
