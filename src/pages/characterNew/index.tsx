import PageWrapper from "../../shared/ui/pageWrapper";
import CharacterForm from "../../features/characterForm";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../../entities/campaign/api";
import { CampaignI } from "../../entities/campaign/model";

function CharacterNew() {
	const campaignsQuery = useQuery({
		queryKey: ["campaigns"],
		queryFn: getCampaigns,
	});

	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	return (
		<PageWrapper
			header="Новый персонаж"
			isError={campaignsQuery.isError}
			errorMessage={campaignsQuery.error?.message}
		>
			<CharacterForm campaigns={campaigns} />
		</PageWrapper>
	);
}

export default CharacterNew;
