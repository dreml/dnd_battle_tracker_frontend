import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewMonster, deleteMonster, updateMonster } from "../api";
import { MonsterQueryKey } from "../queries";
import { MonsterNewT } from "../model";

const useMonsterDeleteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteMonster(id),
		onSuccess: () =>
			void queryClient.invalidateQueries({
				queryKey: [MonsterQueryKey.monsters],
			}),
	});
};

const useMonsterUpdateMutation = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: MonsterNewT) => updateMonster(id, data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [MonsterQueryKey.monsters],
			});
			void queryClient.invalidateQueries({
				queryKey: [MonsterQueryKey.monster],
			});
		},
	});
};

const useMonsterCreateMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newMonster: MonsterNewT) => addNewMonster(newMonster),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [MonsterQueryKey.monsters],
			});
		},
	});
};

export {
	useMonsterDeleteMutation,
	useMonsterUpdateMutation,
	useMonsterCreateMutation,
};
