import {
	MutationFunction,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export default function useMutateBoard<R, T>(
	mutateFunc: MutationFunction<R, T>
) {
	const queryClient = useQueryClient();

	return useMutation(mutateFunc, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetch-boards"]);
		},
	});
}
