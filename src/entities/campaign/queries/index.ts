import { getCampaign, getCampaigns } from "../api";

export enum CampaignQueryKey {
	campaigns = "campaigns",
	campaign = "campaign",
}

const campaignsQueryOptions = () => ({
	queryKey: [CampaignQueryKey.campaigns],
	queryFn: getCampaigns,
});

const campaignQueryOptions = (id: string) => ({
	queryKey: [CampaignQueryKey.campaign, id],
	queryFn: () => getCampaign(id),
});

export { campaignsQueryOptions, campaignQueryOptions };
