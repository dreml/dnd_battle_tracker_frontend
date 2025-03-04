import { getCampaigns } from "../api";

const campaignsQueryOptions = {
	queryKey: ["campaigns"],
	queryFn: getCampaigns,
};

export { campaignsQueryOptions };
