import {
	MutationFunction,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useMutateTask<T>(
	mutateFunc: MutationFunction<unknown, T>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(mutateFunc, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetch-tasks"]);
			navigate(-1);
		},
	});
}
