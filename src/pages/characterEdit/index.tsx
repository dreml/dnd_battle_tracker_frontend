import PageWrapper from "../../shared/ui/pageWrapper";
import { useQuery } from "@tanstack/react-query";
import { CampaignI } from "../../entities/campaign/model";
import CharacterForm from "../../features/characterForm";
import { RouteProps, useParams } from "react-router";
import { CharacterEditT } from "../../entities/character/model";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { characterQueryOptions } from "../../entities/character/queries";
import { useCharacterUpdateMutation } from "../../entities/character/mutations";

function characterEdit() {
	const params: RouteProps = useParams();
	const characterId = params.id ?? "";

	const campaignsQuery = useQuery(campaignsQueryOptions());
	const characterQuery = useQuery(characterQueryOptions(characterId));
	const characterUpdateMutation = useCharacterUpdateMutation(characterId);
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	const character = characterQuery?.data;
	const onSubmit = (data: CharacterEditT) =>
		characterUpdateMutation.mutate(data);

	const isPending =
		characterUpdateMutation.isPending ||
		characterQuery.isPending ||
		campaignsQuery.isPending;

	const isError =
		characterUpdateMutation.isError ||
		characterQuery.isError ||
		campaignsQuery.isError;

	const errorMessage =
		characterUpdateMutation.error?.message ||
		characterQuery.error?.message ||
		campaignsQuery.error?.message;
	return (
		<PageWrapper
			header={character?.name || "Загружаем..."}
			isError={isError}
			errorMessage={errorMessage}
		>
			<CharacterForm
				campaigns={campaigns}
				initialValues={character}
				onSubmit={onSubmit}
				isDisabled={isPending}
				isPending={isPending}
			/>
		</PageWrapper>
	);
}

export default characterEdit;
