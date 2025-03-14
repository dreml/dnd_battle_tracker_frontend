import PageWrapper from "../../shared/ui/pageWrapper";
import CharacterForm from "../../features/characterForm";
import { useQuery } from "@tanstack/react-query";
import { CampaignI } from "../../entities/campaign/model";
import { useNavigate } from "react-router";
import { CharacterNewT } from "../../entities/character/model";
import { ROUTE_CHARACTER_LIST } from "../../shared/router";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { useCharacterCreateMutation } from "../../entities/character/mutations";

function CharacterNew() {
	const navigate = useNavigate();

	const campaignsQuery = useQuery(campaignsQueryOptions());

	const characterCreateMutation = useCharacterCreateMutation();
	const onSubmit = (data: CharacterNewT) => {
		characterCreateMutation.mutateAsync(data).then(() => {
			navigate(ROUTE_CHARACTER_LIST);
		});
	};

	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	return (
		<PageWrapper
			header="Новый персонаж"
			isError={campaignsQuery.isError || characterCreateMutation.isError}
			errorMessage={
				campaignsQuery.error?.message || characterCreateMutation.error?.message
			}
		>
			<CharacterForm campaigns={campaigns} onSubmit={onSubmit} />
		</PageWrapper>
	);
}

export default CharacterNew;
