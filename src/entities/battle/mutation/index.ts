import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startBattle } from "../api";
import { BattleI } from "../model";
import { BattleQueryKey } from "../queries";

const useBattleStartMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: BattleI) => startBattle(data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [BattleQueryKey.battle],
			});
		},
	});
};

export { useBattleStartMutation };
