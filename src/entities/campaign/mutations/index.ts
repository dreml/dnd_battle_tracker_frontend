import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CampaignEditT, CampaignNewT } from "../model";
import { createCampaign, deleteCampaign, updateCampaign } from "../api";
import { CampaignQueryKey } from "../queries";

const useCampaignCreateMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newCampaign: CampaignNewT) => createCampaign(newCampaign),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CampaignQueryKey.campaigns, CampaignQueryKey.campaign],
			});
		},
	});
};

const useCampaignUpdateMutation = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (editedCampaign: CampaignEditT) =>
			updateCampaign(id, editedCampaign),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CampaignQueryKey.campaigns, CampaignQueryKey.campaign],
			});
		},
	});
};

const useCampaignDeleteMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteCampaign(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [CampaignQueryKey.campaigns],
			});
		},
	});
};

export {
	useCampaignCreateMutation,
	useCampaignUpdateMutation,
	useCampaignDeleteMutation,
};
