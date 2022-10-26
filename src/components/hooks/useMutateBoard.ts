import {
	MutationFunction,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export default function useMutateBoard<T>(
	mutateFunc: MutationFunction<unknown, T>
) {
	const queryClient = useQueryClient();

	return useMutation(mutateFunc, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetch-boards"]);
		},
	});
}
