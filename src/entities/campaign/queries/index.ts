import { getCampaigns } from "../api";

enum CampaignQueryKey {
	campaigns = "campaigns",
	campaign = "campaign",
}

const campaignsQueryOptions = () => ({
	queryKey: [CampaignQueryKey.campaigns],
	queryFn: getCampaigns,
});

export { campaignsQueryOptions };
