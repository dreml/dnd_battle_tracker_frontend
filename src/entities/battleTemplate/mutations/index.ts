import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BattleTemplateI, BattleTemplateNewT } from "../model";
import {
	createBattleTemplate,
	deleteBattleTemplate,
	updateBattleTemplate,
} from "../api";
import { BattleTemplateQueryKey } from "../queries";

const useBattleTemplateCreateMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newBattleTemplate: BattleTemplateNewT) =>
			createBattleTemplate(newBattleTemplate),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [BattleTemplateQueryKey.battleTemplates],
			});
		},
	});
};

const useBattleTemplateUpdateMutation = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (battleTemplate: BattleTemplateI) =>
			updateBattleTemplate(id, battleTemplate),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [
					BattleTemplateQueryKey.battleTemplates,
					BattleTemplateQueryKey.battleTemplate,
				],
			});
		},
	});
};

const useBattleTemplateDeleteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteBattleTemplate(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [BattleTemplateQueryKey.battleTemplates],
			});
		},
	});
};

export {
	useBattleTemplateCreateMutation,
	useBattleTemplateUpdateMutation,
	useBattleTemplateDeleteMutation,
};
