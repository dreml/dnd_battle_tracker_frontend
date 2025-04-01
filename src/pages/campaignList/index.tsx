import PageWrapper from "../../shared/ui/pageWrapper";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { useQuery } from "@tanstack/react-query";
import { CampaignI } from "../../entities/campaign/model";

function CampaignList() {
	const campaignsQuery = useQuery(campaignsQueryOptions());
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];

	return <PageWrapper header="Campaigns">Campaign List!</PageWrapper>;
}

export default CampaignList;
