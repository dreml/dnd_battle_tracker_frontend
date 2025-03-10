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
	const isError = campaignsQuery.isError || characterCreateMutation.isError;

	const errorMessage =
		campaignsQuery.error?.message || characterCreateMutation.error?.message;
	const isPending =
		campaignsQuery.isPending || characterCreateMutation.isPending;
	return (
		<PageWrapper
			header="Новый персонаж"
			isError={isError}
			errorMessage={errorMessage}
		>
			<CharacterForm
				campaigns={campaigns}
				onSubmit={onSubmit}
				isPending={isPending}
			/>
		</PageWrapper>
	);
}

export default CharacterNew;
