import {
	MutationFunction,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Props<T> {
	mutateFunc: MutationFunction<unknown, T>;
	options: { invalidateQueries: string[] };
}

export default function useMutateTask<T>(
	mutateFunc: MutationFunction<unknown, T>,
	{ invalidateQueries }: { invalidateQueries: string[] }
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(mutateFunc, {
		onSuccess: () => {
			queryClient.invalidateQueries(invalidateQueries);
			navigate(-1);
		},
	});
}
