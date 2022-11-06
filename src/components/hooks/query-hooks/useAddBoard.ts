import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import createBoard from "../../../api/createBoard";
import { CreateBoard, BoardList } from "../../../models/Todos";

export default function useAddBoard() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(createBoard, {
		onMutate: async (newBoard) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(["fetch-boards"]);

			// Snapshot the previous value
			const previousData = queryClient.getQueryData<BoardList>([
				"fetch-boards",
			]);

			// Optimistically update to the new value
			queryClient.setQueryData<BoardList>(["fetch-boards"], (oldData) => {
				const data = oldData ? oldData : [];

				return [...data, newBoard.board];
			});
			navigate(`/${newBoard.board}`);
			return { previousData };
		},

		onError: (_err, _var, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(["fetch-boards"], context?.previousData);
			if (context?.previousData && context?.previousData?.length > 0) {
				navigate(`/${context?.previousData?.[0]}`);
			} else {
				navigate("/");
			}
		},
		onSettled: () => {
			// Always refetch after error or success:
			queryClient.invalidateQueries(["fetch-boards"]);
		},
	});
}
